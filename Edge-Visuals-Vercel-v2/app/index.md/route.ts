export const dynamic = "force-static";

export function GET() {
  const content = `# Edge Visuals

Edge Visuals è lo studio di montaggio video di Davide. Trasforma podcast, interviste e riprese grezze di creator, professionisti e personal brand in Reel Instagram, video TikTok e YouTube Shorts riconoscibili.

## Servizio

Davide segue personalmente analisi, copywriting, montaggio e revisioni. Ascolta il materiale, seleziona i passaggi più efficaci, costruisce la struttura e cura tagli, sottotitoli, suono e motion graphics. Ogni progetto nasce dalla voce del cliente, non da uno stile preconfezionato.

## Risultati ed esperienza

I contenuti realizzati hanno generato complessivamente più di 30 milioni di visualizzazioni. Edge Visuals unisce strategia, copywriting e montaggio da 4 anni e collabora online da Verona con clienti in tutta Italia.

## Linguaggi visivi

Edge Visuals sviluppa tre direzioni principali: montaggio cinematico per atmosfera e tensione, motion graphics per rendere visibili concetti complessi e modern edit per unire ritmo contemporaneo, chiarezza e identità.

## Metodo

1. Edge Visuals trova il passaggio che offre a chi guarda un motivo immediato per restare.
2. Edge Visuals costruisce il ritmo con tagli, sottotitoli, suono e movimento.
3. Edge Visuals raccoglie le revisioni in un unico passaggio e consegna il video pronto per la pubblicazione.

## Video pilota

Il video pilota permette di valutare la collaborazione su un risultato concreto, senza obblighi di continuità. Comprende un reel verticale completo, due aperture alternative, una revisione e il file pronto per i social.

## Tempi di consegna

Edge Visuals consegna in genere la prima versione di un video pilota in un periodo compreso tra 3 e 5 giorni lavorativi dal momento in cui riceve tutto il materiale.

## Contatto

Il primo confronto avviene su Instagram all'indirizzo https://www.instagram.com/edgevisuals.co/. Davide valuta il materiale, l'obiettivo e la direzione visiva prima di proporre il passo successivo.
`;

  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
