# Plan: Banús Charters — rebrand y reconstrucción completa

## Resultado
Reconstruir el sitio como una experiencia editorial de lujo para **Banús Charters**, conservando todos los recursos visuales y todos los datos actuales de la flota, pero sustituyendo por completo la estructura, los textos, la identidad, el modelo comercial y el flujo de reserva.

## Supuestos aplicados
- Inglés será el idioma inicial y las rutas públicas usarán `/en`, `/es` y `/fr`.
- El chat tendrá una conversación por sesión, sin historial visible ni persistencia del texto completo. Sí guardará como lead cualquier nombre, contacto, barco o fecha facilitados.
- No se publicará ningún email inventado. Como no se proporcionó un nuevo email corporativo, la página de contacto priorizará WhatsApp y dejará preparado el bloque de email para añadir la dirección real después.
- El enlace de Google Reviews será un marcador claramente identificable, como se solicitó, sin reseñas ficticias.
- La versión actual es una web estática: habrá metadatos por ruta para buscadores que ejecutan JavaScript, además de sitemap y datos estructurados. La generación HTML previa completa requeriría migrar a la plantilla con renderizado de servidor.

## Estructura y navegación
- Crear rutas localizadas para Home, Fleet, cada ficha de barco, Experiences, FAQ, About, Contact y las cuatro páginas legales.
- Redirigir `/` a `/en` y conservar el idioma al navegar o cambiarlo.
- Diseñar navegación móvil y de escritorio con marca tipográfica Banús Charters, selector EN/ES/FR y acceso directo a reservas.
- Crear pie de página completo con navegación, condiciones del intermediario, contacto y marca nueva.

## Dirección visual
- Aplicar la paleta exacta: navy `#0B1F33`, sand `#F4EFE6`, brass `#C8A15A` y blanco mediante tokens globales.
- Mantener Cormorant Garamond para titulares e Inter para texto, cargadas correctamente desde el documento.
- Composición editorial: fotografía grande, ritmo amplio, bordes discretos, sombras suaves y animaciones de entrada respetando reducción de movimiento.
- Conservar todos los archivos actuales; reutilizar fotos y vídeos en portada, flota, fichas, experiencias y galería con textos alternativos descriptivos por idioma.

## Datos y contenido
- Centralizar flota, imágenes, especificaciones, capacidades, precios e incluidos en una sola fuente para evitar diferencias entre tarjetas, fichas, reservas y chatbot.
- Mantener los precios finales actuales y mostrarlos como `from €X`, sin precios tachados ni mensajes permanentes de descuento.
- Mantener Catamarán Bali privado por duración y su opción de ticket actual; Jet Ski quedará en 30 min €108 y 1 h €170.
- Reescribir todo el contenido en EN/ES/FR para reflejar que Banús Charters es un broker curado que gestiona la reserva y que la operación corre a cargo de empresas náuticas licenciadas y aseguradas.
- Eliminar testimonios inventados y sustituirlos por un bloque neutral de Google Reviews.

## Páginas principales
- **Home:** vídeo de portada `gallery_video1.mp4` con imagen posterior, dos llamadas a la acción, barra de confianza, flota destacada, experiencias, proceso en tres pasos, galería, preguntas frecuentes y cierre de WhatsApp.
- **Fleet:** catálogo editorial con filtros sencillos y enlace a una página completa por embarcación.
- **Boat detail:** galería, especificaciones, capacidad, incluidos, tabla de duración/precio, datos estructurados de producto y caja de reserva.
- **Experiences:** Sunset, celebraciones, familia, empresa y Jet Ski, enlazadas a embarcaciones adecuadas.
- **FAQ / About / Contact:** contenido trilingüe, políticas solicitadas, historia del equipo local, WhatsApp y mapa de Puerto Banús.
- **Legal:** aviso legal, privacidad GDPR, cookies y términos; todas dejarán explícita la función de intermediario.

## Reservas y contactos
- Forzar todos los enlaces de WhatsApp a `https://wa.me/34600746712` y borrar del sitio público el teléfono y email del operador anterior.
- Crear una caja de reserva reutilizable con fecha, duración, personas y nombre; generará el mensaje correcto en EN/ES/FR con todos los datos y el barco.
- Crear un formulario de solicitud con esos campos, email y teléfono, validación, estados de envío y confirmación.
- Añadir botones flotantes de WhatsApp y chat, sin solaparse en móvil.

## Lovable Cloud
- Crear una tabla `booking_requests` para solicitudes y otra `chat_leads` para datos captados por el asistente.
- Permitir únicamente inserciones públicas validadas; no exponer listados ni datos de otros visitantes.
- Guardar origen, idioma, barco, fecha y datos de contacto cuando estén disponibles.
- Verificar que ambos formularios escriben correctamente y que los datos quedan protegidos.

## Asistente de flota
- Implementar un widget flotante trilingüe con respuesta en streaming y renderizado Markdown.
- Usar `openai/gpt-6-astra` a través de Lovable AI, con toda la flota, precios, incluidos, experiencias y FAQ como contexto autoritativo.
- Instruirlo para recomendar por tamaño, presupuesto y ocasión, pero nunca inventar disponibilidad ni precios.
- Añadir traspaso a WhatsApp con un resumen localizado de la conversación.
- Guardar el lead cuando el visitante comparta datos útiles; el texto completo no se persistirá.
- Probar una conversación de recomendación, una consulta de precio y una petición de disponibilidad.

## SEO y descubrimiento
- Añadir título, descripción, canonical, Open Graph y Twitter por página e idioma; actualizar también la cabecera estática con Banús Charters.
- Crear `hreflang` EN/ES/FR + x-default, `sitemap.xml` con todas las rutas y `robots.txt` apuntando al sitemap.
- Añadir JSON-LD LocalBusiness global, Product/Offer en cada barco y FAQPage en FAQ.
- Mantener las URLs canónicas bajo `https://sea-dreams-maker.lovable.app` hasta que exista dominio propio.
- Orientar textos y metadatos a yacht charter Marbella, boat rental Puerto Banús, location bateau Marbella y alquiler barco Marbella sin sobrecarga artificial.

## Limpieza y verificación
- Eliminar del uso público componentes y textos antiguos: descuento, contacto directo con propietarios, testimonios ficticios y marca Direct Boat.
- Buscar referencias residuales a la marca, antiguo WhatsApp, antiguo email, precios tachados y terminología incorrecta.
- Verificar navegación, cambio de idioma, reservas, formulario, chat, galería y vídeo en móvil y escritorio.
- Revisar visualmente portada, catálogo, una ficha, contacto y legales; comprobar errores de compilación, ejecución, consola y red.

## Decisión técnica
- Mantener React + Vite y React Router, con datos compartidos y páginas localizadas en el cliente. Es la opción segura para reconstruir ahora sin poner en riesgo recursos o datos existentes.
- La pre-generación HTML real no se añadirá en esta fase porque la pila actual es una SPA. Si se requieren vistas sociales y contenido HTML únicos antes de ejecutar JavaScript, el siguiente paso será migrar a la plantilla TanStack Start.
