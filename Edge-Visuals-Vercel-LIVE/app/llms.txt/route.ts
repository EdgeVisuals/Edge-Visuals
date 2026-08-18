import { siteUrl } from "../site-config";

export const dynamic = "force-static";

export function GET() {
  const content = `# Edge Visuals

> Edge Visuals monta video brevi per creator e personal brand e trasforma podcast, interviste e riprese grezze in contenuti riconoscibili per Instagram, TikTok e YouTube.

Edge Visuals collabora online dall'Italia. Ogni progetto parte dal messaggio, costruisce il ritmo attorno alla voce del cliente e termina con un file pronto per la pubblicazione. I video montati hanno generato complessivamente più di 30 milioni di visualizzazioni.

## Informazioni principali

* [Pagina in formato Markdown](${siteUrl}/index.md): descrive il servizio, il metodo, il video pilota, i tempi di consegna e il contatto.
* [Sito ufficiale](${siteUrl}/): presenta Edge Visuals con l'esperienza visiva completa.
* [Instagram ufficiale](https://www.instagram.com/edgevisuals.co/): permette di contattare direttamente Edge Visuals e verificare la disponibilità.
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
