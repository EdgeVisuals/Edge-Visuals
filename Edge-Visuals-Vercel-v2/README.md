# Edge Visuals, versione pronta per Git e Vercel

Questa cartella contiene il sito completo di Edge Visuals in Next.js. Il progetto parte direttamente dal dominio pubblico `https://www.edgevisuals.studio` e non richiede database o backend.

## Cosa contiene questa versione

* Home responsive con logo, animazioni e immagini ottimizzate.
* Carosello narrativo per tre Reel: cinematico, motion graphics e modern edit.
* Anteprime grafiche eleganti finché non inserisci i video reali.
* Musica ambientale facoltativa con controllo esplicito `SUONO ON/OFF`.
* Pausa automatica della musica quando parte un Reel.
* Copywriting più diretto e call to action differenziate.
* Vercel Web Analytics predisposto per misurare contatti, selezioni e riproduzioni.
* Metadata SEO, social preview, dati strutturati e contenuti GEO.
* `robots.txt`, `sitemap.xml`, `llms.txt` e pagina Markdown con il dominio corretto.
* Accessibilità di base, supporto a `prefers-reduced-motion` e navigazione da tastiera.

## Inserire i tre Reel

Esporta i video in verticale 9:16, formato MP4 H.264, senza bande nere. Mantieni ogni file indicativamente tra 8 e 20 MB e copialo nella cartella `public/showcase` con questi nomi esatti:

```text
01-cinematico.mp4
02-motion-graphics.mp4
03-modern-edit.mp4
```

Il sito rileva i file automaticamente e sostituisce le anteprime grafiche con i player reali. Non devi modificare il codice.

## Inserire la musica

Usa una traccia di cui possiedi i diritti, preferibilmente strumentale, in loop e senza picchi improvvisi. Copiala nella cartella `public/media` con questo nome esatto:

```text
edge-visuals-ambient.mp3
```

Consiglio una durata tra 45 e 60 secondi, un bitrate tra 128 e 160 kbps e un peso inferiore a 1,5 MB. Se il file non è presente, il controllo audio non compare e il sito continua a funzionare normalmente.

## Verifica in locale

Usa Node.js 20.9 o successivo. Node.js 22 è la scelta consigliata.

```bash
npm install
npm run dev
```

Apri `http://localhost:3000`. Prima di pubblicare, verifica sempre la versione di produzione:

```bash
npm run lint
npm run build
```

## Primo caricamento su GitHub

Estrai lo ZIP e apri il terminale dentro la cartella che contiene `package.json`. Poi esegui:

```bash
git init
git add .
git commit -m "Pubblica il nuovo sito Edge Visuals"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/edge-visuals.git
git push -u origin main
```

Prima crea su GitHub un repository vuoto chiamato, per esempio, `edge-visuals`. Sostituisci l'indirizzo di esempio con quello del tuo repository.

Se Git restituisce `not a git repository`, controlla di aver aperto il terminale nella cartella estratta e di aver eseguito `git init`.

## Pubblicazione su Vercel

1. In Vercel scegli `Add New`, quindi `Project`.
2. Importa il repository GitHub appena creato.
3. Verifica che Vercel riconosca il framework `Next.js`.
4. Lascia invariati i comandi di installazione e build.
5. Aggiungi la variabile `NEXT_PUBLIC_SITE_URL` con valore `https://www.edgevisuals.studio` nell'ambiente Production.
6. Avvia il deploy.
7. In `Settings`, quindi `Domains`, collega sia `edgevisuals.studio` sia `www.edgevisuals.studio` e imposta la variante `www` come dominio principale.
8. Nella sezione Analytics di Vercel attiva Web Analytics, quindi esegui un nuovo deploy per leggere gli eventi già configurati nel sito.

Il codice usa già `https://www.edgevisuals.studio` come valore sicuro predefinito. La variabile d'ambiente rende però esplicita la configurazione anche nel pannello Vercel.

## Aggiornamenti successivi

Dopo una modifica esegui:

```bash
npm run lint
npm run build
git add .
git commit -m "Aggiorna il sito Edge Visuals"
git push origin main
```

Vercel pubblicherà automaticamente la nuova versione collegata al branch `main`.

## File principali

* `app/page.tsx`: struttura, testi e call to action.
* `app/content.ts`: FAQ, link Instagram e configurazione dello showcase.
* `app/showcase.tsx`: carosello e rilevamento automatico dei Reel.
* `app/ambient-sound.tsx`: controllo della musica e gestione dei volumi.
* `app/globals.css`: grafica, responsive e animazioni.
* `app/layout.tsx`: metadata SEO e social.
* `app/structured-data.tsx`: dati strutturati per motori di ricerca e sistemi generativi.
* `public/showcase`: Reel reali.
* `public/media`: musica ambientale.

## Controlli dopo la pubblicazione

* Apri home page, menu, carosello, player video e call to action da desktop e telefono.
* Verifica `https://www.edgevisuals.studio/robots.txt` e `https://www.edgevisuals.studio/sitemap.xml`.
* Controlla che canonical, Open Graph e dati strutturati usino sempre il dominio `www`.
* Invia di nuovo la sitemap in Google Search Console dopo il deploy.
* Prova la condivisione del link in WhatsApp, Telegram e LinkedIn per controllare la nuova anteprima.

## Nota importante

Le anteprime grafiche non vengono presentate come lavori reali. Inserisci nello showcase soltanto progetti che puoi mostrare pubblicamente e usa una traccia musicale con licenza adeguata all'uso commerciale.
