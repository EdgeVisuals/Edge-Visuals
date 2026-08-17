# Edge Visuals, copia pronta per Vercel

Questa cartella contiene il sito completo di Edge Visuals in Next.js, separato dal progetto provvisorio usato durante la realizzazione. Puoi pubblicarlo su Vercel senza migrare o collegare alcun vecchio sito.

## Cosa include

- Il sito completo e responsive con animazioni, immagini e logo.
- Configurazione Next.js nativa, riconosciuta automaticamente da Vercel.
- Metadata SEO e dati strutturati per motori di ricerca e sistemi generativi.
- `robots.txt`, `sitemap.xml`, `llms.txt` e pagina Markdown generati con il dominio corretto.
- Collegamenti diretti al profilo Instagram `@edgevisuals.co`.
- Nessun database, backend o servizio esterno da configurare.

## Verifica in locale

Richiede Node.js 20.9 o successivo. Consiglio Node.js 22.

```bash
npm install
npm run dev
```

Apri `http://localhost:3000` nel browser. Per verificare la build di produzione:

```bash
npm run build
npm run start
```

## Pubblicazione consigliata: GitHub e Vercel

1. Crea un nuovo repository vuoto su GitHub, per esempio `edge-visuals`.
2. Carica nel repository **il contenuto di questa cartella**, mantenendo `package.json` nella cartella principale del repository.
3. Accedi a Vercel e scegli **Add New → Project**.
4. Collega GitHub e importa il repository `edge-visuals`.
5. Vercel riconoscerà automaticamente **Next.js**. Lascia invariati Build Command, Install Command e Output Directory.
6. Apri **Environment Variables** nelle impostazioni del progetto e attiva **Automatically expose System Environment Variables**.
7. Premi **Deploy**. Il primo dominio sarà simile a `edge-visuals.vercel.app`.

Da quel momento, ogni aggiornamento inviato al branch `main` produrrà automaticamente una nuova pubblicazione.

## Dominio personalizzato

Quando acquisti o colleghi il dominio definitivo:

1. Apri il progetto su Vercel.
2. Vai in **Settings → Domains** e aggiungi il dominio.
3. Segui le indicazioni DNS mostrate da Vercel.
4. Se vuoi forzare un dominio canonico preciso, aggiungi la variabile `NEXT_PUBLIC_SITE_URL` con il valore completo, per esempio `https://www.edgevisuals.it`, negli ambienti Production e Preview.
5. Esegui un nuovo deployment dopo aver modificato la variabile.

Se non imposti `NEXT_PUBLIC_SITE_URL`, il sito usa automaticamente il dominio di produzione Vercel più breve. Questo comportamento mantiene corretti link canonici, sitemap e dati strutturati già dal primo deployment.

## Aggiornare il sito

I file principali sono:

- `app/page.tsx`: testi e struttura della pagina.
- `app/globals.css`: grafica, responsive e animazioni.
- `app/content.ts`: FAQ e link Instagram condivisi.
- `public/`: logo e immagini del sito.
- `app/layout.tsx`: metadata SEO.
- `app/structured-data.tsx`: dati strutturati GEO e SEO.

Prima di pubblicare una modifica, esegui sempre:

```bash
npm run lint
npm run build
```

## Checklist dopo la pubblicazione

- Controlla home page, menu, call to action Instagram e versione mobile.
- Apri `/robots.txt`, `/sitemap.xml`, `/llms.txt` e `/index.md` sul dominio pubblicato.
- Verifica che tutti gli indirizzi mostrino il dominio definitivo.
- Collega il sito a Google Search Console quando avrai il dominio definitivo.
- Mantieni il repository GitHub privato se non vuoi rendere pubblico il codice sorgente.

## Nota sui costi

Il progetto non richiede servizi a pagamento per funzionare. Verifica però le condizioni del piano Vercel più adatto a un sito professionale e commerciale prima della pubblicazione definitiva.
