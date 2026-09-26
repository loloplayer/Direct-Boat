import { useEffect, useMemo, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Anchor, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const getText = (message: UIMessage) => message.parts.filter((part) => part.type === "text").map((part) => part.text).join(" ");

export default function CharterChat() {
  const { lang, copy } = useLanguage();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const savedSignature = useRef("");
  const sessionId = useMemo(() => crypto.randomUUID(), []);
  const transport = useMemo(() => new DefaultChatTransport({ api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/charter-chat`, headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY }, body: { language: lang } }), [lang]);
  const { messages, sendMessage, status, stop, error } = useChat({ id: `charter-${sessionId}`, transport, onFinish: () => textarea.current?.focus() });
  useEffect(() => { textarea.current?.focus(); }, []);
  useEffect(() => {
    if (status !== "ready" || messages.length < 2) return;
    const transcript = messages.map(getText).join(" ").slice(0, 1000);
    const contact = transcript.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|(?:\+?\d[\d\s-]{7,}\d)/)?.[0];
    const name = transcript.match(/(?:my name is|me llamo|je m'appelle)\s+([A-Za-zÀ-ÿ '-]{2,40})/i)?.[1]?.trim();
    const boat = ["Catamarán Bali 4.0", "Azimut 39 Fly", "Rinker 296 Captiva", "Sea Ray Sundancer 540"].find((item) => transcript.toLowerCase().includes(item.toLowerCase()));
    const date = transcript.match(/\b(?:\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?|\d{4}-\d{2}-\d{2})\b/)?.[0];
    const signature = [contact, name, boat, date].filter(Boolean).join("|");
    if (!signature || signature === savedSignature.current) return;
    savedSignature.current = signature;
    void supabase.from("chat_leads").insert({ session_id: sessionId, language: lang, name: name ?? null, contact: contact ?? null, boat_interest: boat ?? null, requested_date: date ?? null, summary: transcript });
  }, [messages, status, sessionId, lang]);
  const summary = messages.map((message) => `${message.role === "user" ? "Guest" : "Banús Charters"}: ${getText(message)}`).join("\n").slice(0, 2200);
  return <div className="flex min-h-0 flex-1 flex-col bg-background"><header className="flex items-center gap-3 border-b border-border p-4"><span className="grid size-9 place-items-center rounded-sm bg-primary text-primary-foreground"><Anchor className="size-4" /></span><div><h2 className="font-display text-xl">{copy.chatbot}</h2><p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Banús Charters · Puerto Banús</p></div></header><Conversation className="min-h-0"><ConversationContent className="gap-5 p-5">{messages.length === 0 && <div className="py-10 text-center"><Anchor className="mx-auto size-7 text-accent" /><p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-muted-foreground">{copy.chatIntro}</p></div>}{messages.map((message) => <Message from={message.role} key={message.id}><MessageContent>{message.parts.map((part, index) => part.type === "text" ? <MessageResponse key={index}>{part.text}</MessageResponse> : null)}</MessageContent></Message>)}{status === "submitted" && <Shimmer className="text-sm text-muted-foreground">{copy.chatThinking}</Shimmer>}{error && <p role="alert" className="text-sm text-destructive">{error.message}</p>}</ConversationContent><ConversationScrollButton /></Conversation><div className="border-t border-border p-4">{messages.length > 1 && <Button asChild variant="outline" size="sm" className="mb-3 w-full"><a href={getWhatsAppUrl(lang, `${copy.handoff}\n\n${summary}`)} target="_blank" rel="noreferrer"><MessageCircle />{copy.handoff}</a></Button>}<PromptInput onSubmit={({ text }) => { if (!text.trim()) return; sendMessage({ text }); textarea.current?.focus(); }}><PromptInputTextarea ref={textarea} placeholder={copy.chatPlaceholder} /><PromptInputFooter className="justify-end"><PromptInputSubmit status={status} onStop={stop} /></PromptInputFooter></PromptInput></div></div>;
}