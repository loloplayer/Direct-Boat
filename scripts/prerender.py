"""Bounded build-time browser rendering; no permanent application server."""
import asyncio, json, sys, threading, functools
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from playwright.async_api import async_playwright

MAX_PRERENDER_PAGES = 200
output = Path(sys.argv[1]).resolve()
routes = json.loads((output / "prerender-routes.json").read_text())
if len(routes) > MAX_PRERENDER_PAGES:
    raise RuntimeError("Prerender route cap exceeded")
base_html = (output / "index.html").read_bytes()
class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Always capture the original SPA, never a previously written snapshot.
        if self.path.split('?')[0] in routes or self.path == '/':
            self.send_response(200); self.send_header('Content-Type', 'text/html'); self.end_headers(); self.wfile.write(base_html)
        else: super().do_GET()
    def log_message(self, *args): pass
server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Handler, directory=str(output)))
threading.Thread(target=server.serve_forever, daemon=True).start()
origin = f'http://127.0.0.1:{server.server_port}'

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width':1280,'height':1800}, reduced_motion='reduce')
        await context.route('**/*', lambda route: route.abort() if route.request.resource_type in ['media', 'image'] or not route.request.url.startswith(origin) else route.continue_())
        queue = asyncio.Queue()
        for route in routes: queue.put_nowait(route)
        async def worker():
            page = await context.new_page()
            while not queue.empty():
                route = queue.get_nowait()
                await page.goto(origin+route, wait_until='domcontentloaded')
                await page.locator('main h1').wait_for()
                await page.wait_for_function("document.querySelector('link[rel=canonical]')?.href === 'https://banuscharters.com' + location.pathname")
                await page.wait_for_function("document.querySelectorAll('main section').length > 0")
                snapshot = await page.evaluate('''() => {
                    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
                    document.querySelectorAll('#lovable-badge').forEach(el => el.remove());
                    return '<!doctype html>\\n' + document.documentElement.outerHTML;
                }''')
                target = output / route.lstrip('/') / 'index.html'
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(snapshot)
                queue.task_done()
            await page.close()
        await asyncio.gather(*[worker() for _ in range(4)])
        await browser.close()
    server.shutdown()
    (output / 'prerender-routes.json').unlink()
    print(f'Prerendered {len(routes)} public routes with metadata and content.')
asyncio.run(main())
