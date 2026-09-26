import { lazy, Suspense, useState } from "react";
import { MessageCircle, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";
const CharterChat = lazy(() => import("./CharterChat"));

export default function FloatingActions() { const { lang, copy } = useLanguage(); const [chatOpen, setChatOpen] = useState(false); return <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2"><Tooltip><TooltipTrigger asChild><Button asChild size="icon" className="size-12 rounded-full shadow-lg"><a href={getWhatsAppUrl(lang)} target="_blank" rel="noreferrer" aria-label={copy.bookWhatsapp}><MessageCircle /></a></Button></TooltipTrigger><TooltipContent side="left">WhatsApp</TooltipContent></Tooltip><Dialog open={chatOpen} onOpenChange={setChatOpen}><Tooltip><TooltipTrigger asChild><DialogTrigger asChild><Button size="icon" variant="secondary" className="size-12 rounded-full border border-primary/15 shadow-lg" aria-label={copy.chatbot}><MessagesSquare /></Button></DialogTrigger></TooltipTrigger><TooltipContent side="left">{copy.chatbot}</TooltipContent></Tooltip>{chatOpen && <DialogContent className="h-[min(720px,88svh)] w-[calc(100%-1.5rem)] max-w-md gap-0 overflow-hidden rounded-sm p-0"><DialogTitle className="sr-only">{copy.chatbot}</DialogTitle><Suspense fallback={<div className="h-full bg-background" />}><CharterChat /></Suspense></DialogContent>}</Dialog></div>; }