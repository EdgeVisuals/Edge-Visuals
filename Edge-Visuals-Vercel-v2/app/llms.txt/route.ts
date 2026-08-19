import { siteUrl } from "../site-config";

export const dynamic = "force-static";

export function GET() {
  const content = `# Edge Visuals

> Edge Visuals è lo studio di montaggio video di Davide e trasforma podcast, interviste e riprese grezze in contenuti riconoscibili per Instagram, TikTok e YouTube.

Davide segue personalmente strategia, copywriting, montaggio e revisioni. Edge Visuals collabora online dall'Italia e sviluppa montaggi cinematici, motion graphics e modern edit. I contenuti realizzati hanno generato complessivamente più di 30 milioni di visualizzazioni.

## Informazioni principali

* [Pagina in formato Markdown](${siteUrl}/index.md): descrive il servizio, il metodo, il video pilota, i tempi di consegna e il contatto.
* [Sito ufficiale](${siteUrl}/): presenta Edge Visuals con l'esperienza visiva completa.
* [Instagram ufficiale](https://www.instagram.com/edgevisuals.co/): permette di contattare direttamente Edge Visuals e verificare la disponibilità.
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
