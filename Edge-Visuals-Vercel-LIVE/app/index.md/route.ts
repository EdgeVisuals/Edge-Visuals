export const dynamic = "force-static";

export function GET() {
  const content = `# Edge Visuals

Edge Visuals monta video brevi per creator, professionisti e personal brand. Trasforma podcast, interviste e riprese grezze in Reel Instagram, video TikTok e YouTube Shorts che conquistano l'attenzione dal primo secondo, mantengono il ritmo e rendono riconoscibile la voce del cliente.

## Servizio

Edge Visuals ascolta il materiale, seleziona i passaggi più efficaci, costruisce la struttura e cura tagli, sottotitoli, suono e motion graphics. Consegna ogni video nel formato corretto per la pubblicazione sui social.

## Risultati ed esperienza

I video montati hanno generato complessivamente più di 30 milioni di visualizzazioni. Edge Visuals unisce strategia, copy e montaggio da 4 anni e collabora online da Verona con clienti ovunque.

## Metodo

1. Edge Visuals trova il passaggio che offre a chi guarda un motivo immediato per restare.
2. Edge Visuals costruisce il ritmo con tagli, sottotitoli, suono e movimento.
3. Edge Visuals raccoglie i commenti in un unico passaggio e consegna il video pronto per la pubblicazione.

## Video pilota

Il video pilota permette di valutare la collaborazione su un risultato concreto, senza obblighi di continuità. Comprende un reel verticale completo, due aperture alternative, una revisione e il file pronto per i social.

## Tempi di consegna

Edge Visuals consegna in genere la prima versione di un video pilota in un periodo compreso tra 3 e 5 giorni lavorativi dal momento in cui riceve tutto il materiale.

## Contatto

Contatta Edge Visuals su Instagram all'indirizzo https://www.instagram.com/edgevisuals.co/ per raccontare il progetto e verificare la disponibilità.
`;

  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
