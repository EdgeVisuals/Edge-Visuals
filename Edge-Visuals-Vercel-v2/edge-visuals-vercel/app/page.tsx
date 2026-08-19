"use client";

import { track } from "@vercel/analytics";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { AmbientSound } from "./ambient-sound";
import { faqItems, instagram } from "./content";
import { ShowcaseCarousel } from "./showcase";

const reactions = [
  { text: "Ma che caz*… O.O", meta: "adesso · rispondi" },
  { text: "Aspetta, COME l’hai fatto?!", meta: "18 s · rispondi" },
  { text: "Quel taglio sul beat 🔥", meta: "1 min · rispondi" },
  { text: "ok, rivisto 4 volte ahah", meta: "2 min · rispondi" },
];

const method = [
  {
    number: "01",
    title: "Trovo il punto",
    text: "Seleziono la frase, il passaggio o l'idea che dà a chi guarda un motivo immediato per restare.",
  },
  {
    number: "02",
    title: "Costruisco il ritmo",
    text: "Tagli, sottotitoli, suono e motion graphics guidano lo sguardo senza coprire il messaggio.",
  },
  {
    number: "03",
    title: "Rifinisco e consegno",
    text: "Raccolgo le revisioni in un unico passaggio e preparo ogni formato perché il contenuto sia pronto da pubblicare.",
  },
];


function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.15 10.55 19.84C5.4 15.16 2 12.08 2 8.3 2 5.22 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.03 6.03 0 0 1 16.5 3C19.58 3 22 5.22 22 8.3c0 3.78-3.4 6.86-8.55 11.55L12 21.15Z" />
    </svg>
  );
}

function LoopTimer() {
  const timerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = timerRef.current;
    const value = valueRef.current;
    if (!timer || !value) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      value.textContent = "00:03.000";
      timer.style.setProperty("--timer-progress", "100%");
      timer.classList.add("is-complete");
      return;
    }

    const origin = performance.now();
    const runDuration = 3000;
    const holdDuration = 650;
    const cycleDuration = 4400;
    let animationFrame = 0;
    let previousValue = "";

    const tick = (now: number) => {
      const phase = (now - origin) % cycleDuration;
      const isComplete = phase >= runDuration && phase < runDuration + holdDuration;
      const isReloading = phase >= runDuration + holdDuration;
      const elapsed = isReloading ? 0 : Math.min(phase, runDuration);
      const seconds = Math.floor(elapsed / 1000).toString().padStart(2, "0");
      const milliseconds = Math.floor(elapsed % 1000).toString().padStart(3, "0");
      const nextValue = `00:${seconds}.${milliseconds}`;

      if (nextValue !== previousValue) {
        value.textContent = nextValue;
        previousValue = nextValue;
      }

      timer.style.setProperty("--timer-progress", `${(elapsed / runDuration) * 100}%`);
      timer.classList.toggle("is-complete", isComplete);
      timer.classList.toggle("is-reloading", isReloading);
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="craft-timer-float" aria-label="Timer che misura i primi tre secondi di attenzione">
      <div className="craft-timer" ref={timerRef}>
        <div className="timer-top"><span>SOGLIA D&apos;ATTENZIONE</span><span><i /> IN CORSO</span></div>
        <strong aria-hidden="true"><span ref={valueRef}>00:00.000</span><small>s</small></strong>
        <span className="timer-track" aria-hidden="true"><i /></span>
        <div className="timer-bottom"><span>PRIMI 3 SECONDI</span><b aria-hidden="true">↻</b></div>
      </div>
    </div>
  );
}

export default function Home() {
  const trackContact = (position: string) => track("instagram_contact", { position });

  useEffect(() => {
    const root = document.documentElement;
    const updateScroll = () => {
      const distance = root.scrollHeight - innerHeight;
      root.style.setProperty("--progress", `${distance ? (scrollY / distance) * 100 : 0}%`);
      root.classList.toggle("availability-visible", scrollY > innerHeight * 0.8);
    };
    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty("--x", `${event.clientX}px`);
      root.style.setProperty("--y", `${event.clientY}px`);
      root.style.setProperty("--rx", `${((event.clientY / innerHeight) - 0.5) * -1.5}deg`);
      root.style.setProperty("--ry", `${((event.clientX / innerWidth) - 0.5) * 1.8}deg`);
    };
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("seen")),
      { threshold: 0.12 },
    );

    document.querySelectorAll("[data-reveal]").forEach((node) => reveal.observe(node));
    updateScroll();
    addEventListener("scroll", updateScroll, { passive: true });
    addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      reveal.disconnect();
      root.classList.remove("availability-visible");
      removeEventListener("scroll", updateScroll);
      removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <div className="site">
      <a className="skip-link" href="#contenuto">Salta al contenuto</a>
      <div className="progress" aria-hidden="true" />
      <div className="custom-cursor" aria-hidden="true" />

      <header className="header">
        <a className="brand" href="#top" aria-label="Edge Visuals, torna all'inizio">
          <span className="brand-logo" aria-hidden="true" />
          <span className="brand-wordmark" aria-hidden="true" />
        </a>
        <nav aria-label="Navigazione principale">
          <a href="#approccio">Approccio</a>
          <a href="#showcase">Lavori</a>
          <a href="#metodo">Metodo</a>
        </nav>
        <a className="header-cta" href={instagram} target="_blank" rel="noreferrer" onClick={() => trackContact("header")}>Raccontami l&apos;idea <span>↗</span></a>
      </header>

      <main id="contenuto">
        <section className="hero" id="top">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><i /> Montaggio video per creator e personal brand</p>
            <h1>
              Hai già qualcosa da dire.
              <span className="hero-line">
                <span className="hero-line-lead">Facciamolo</span>{" "}<span className="hero-neon-underline"><span className="hero-neon-part">impossibile da</span>{" "}<span className="hero-neon-part">ignorare.</span></span>
              </span>
            </h1>
            <p className="hero-intro">
              Edge Visuals trasforma podcast, interviste e riprese grezze in Reel, TikTok e YouTube Shorts
              che si fanno notare dal primo secondo, mantengono il ritmo e rendono riconoscibile il tuo modo di comunicare.
            </p>
            <div className="hero-actions">
              <a className="button" href={instagram} target="_blank" rel="noreferrer" onClick={() => trackContact("hero")}>Valutiamo il tuo prossimo video <span>↗</span></a>
              <a className="text-link" href="#showcase">Guarda i linguaggi visivi <span>↓</span></a>
            </div>
            <p className="contact-note">Una conversazione diretta, senza moduli né risposte automatiche</p>
          </div>

          <article className="signature-card" data-reveal aria-label="La card principale di Edge Visuals mostra una mano con uno smartphone e racconta l'importanza del primo secondo">
            <div className="signature-grid" aria-hidden="true" />
            <span className="signature-index">01 / STUDIO VIDEO BREVI</span>
            <span className="signature-word" aria-hidden="true"><i>E</i><i>D</i><i>G</i><i>E</i></span>
            <span className="signature-phone">
              <Image
                src="/edge-signature-phone.webp"
                alt="Una mano impugna uno smartphone che mostra un Reel montato da Edge Visuals"
                fill
                priority
                sizes="(max-width: 720px) 94vw, (max-width: 1080px) 72vw, 40vw"
              />
            </span>
            <span className="signature-scan" aria-hidden="true" />
            <div className="engagement-layer" aria-hidden="true">
              {reactions.map((reaction, index) => (
                <div className={`floating-comment comment-${index + 1}`} key={reaction.text}>
                  <span className="comment-avatar"><i /></span>
                  <span className="comment-copy"><b>{reaction.text}</b><small>{reaction.meta}</small></span>
                  <HeartIcon />
                </div>
              ))}
              <span className="floating-heart heart-1"><HeartIcon /></span>
              <span className="floating-heart heart-2"><HeartIcon /></span>
              <span className="floating-heart heart-3"><HeartIcon /></span>
              <span className="floating-heart heart-4"><HeartIcon /></span>
            </div>
            <div className="signature-proof"><strong>30M+</strong><span>Visualizzazioni generate<br />dai contenuti realizzati</span></div>
            <div className="signature-statement">
              <span>APERTURA · RITMO · IDENTITÀ</span>
              <strong><span className="neon-underline">IL PRIMO SECONDO</span><br />NON SI IMPROVVISA.</strong>
              <p>Il montaggio deve far capire subito perché vale la pena restare.</p>
            </div>
            <span className="signature-footer">INSTAGRAM · TIKTOK · YOUTUBE</span>
          </article>
        </section>

        <section className="proof-strip" aria-label="Esperienza e risultati">
          <div data-reveal><strong>30M+</strong><span>Visualizzazioni generate dai contenuti realizzati per i clienti</span></div>
          <div data-reveal><strong>4 anni</strong><span>Tra strategia, copywriting e montaggio</span></div>
          <div data-reveal><strong>100%</strong><span>Online, con creator e professionisti in tutta Italia</span></div>
        </section>

        <section className="positioning section" id="approccio">
          <p className="kicker" data-reveal>[ PRIMA DEGLI EFFETTI ]</p>
          <div className="positioning-copy" data-reveal>
            <h2>Un video può essere pulito, dinamico e <em>completamente dimenticabile.</em></h2>
            <p>Parto dal messaggio, non dagli effetti. Definisco ciò che deve capire, ricordare o fare chi guarda. Poi uso montaggio, suono e movimento per guidare la sua attenzione fino alla fine.</p>
            <strong>Aiuto creator e professionisti a costruire una <span className="marker-highlight">voce riconoscibile</span>, senza riciclare formule già viste.</strong>
            <div className="maker-note">
              <span>IL PROFESSIONISTA DIETRO EDGE VISUALS</span>
              <p><b>Sono Davide.</b> Seguo personalmente analisi, copywriting, montaggio e revisioni. Nessun passaggio tra reparti e nessuno stile preconfezionato: ogni contenuto parte da ciò che vuoi dire e da chi vuoi raggiungere.</p>
            </div>
          </div>
        </section>

        <section className="craft-section section">
          <article className="craft-card" data-reveal aria-label="Ogni secondo ha un motivo: un timer misura i primi tre secondi sopra una trama digitale con riflessi cromatici">
            <div className="craft-scene" aria-hidden="true"><span className="chroma-sweep" /></div>
            <div className="craft-shade" aria-hidden="true" />
            <LoopTimer />
            <div className="craft-topline"><span>02 / DAL MATERIALE ALLA STORIA</span><span><i /> SESSIONE IN CORSO</span></div>
            <div className="craft-copy">
              <span>DIETRO IL RISULTATO</span>
              <h2>Ogni secondo<br /><em>ha un motivo.</em></h2>
              <p>Ascolto ogni registrazione, individuo il punto che merita attenzione e costruisco intorno una struttura chiara. Poi uso suono e movimento per dare forza al messaggio, senza mettermi davanti a te.</p>
              <a href={instagram} target="_blank" rel="noreferrer" onClick={() => trackContact("craft")}>Inviami una clip <span>↗</span></a>
            </div>
            <div className="craft-process" aria-hidden="true">
              <span><b>01</b> ASCOLTO</span><i /><span><b>02</b> STRUTTURA</span><i /><span><b>03</b> MONTAGGIO</span><i /><span><b>04</b> CONSEGNA</span>
            </div>
          </article>
        </section>

        <section className="showcase section" id="showcase" aria-labelledby="showcase-title">
          <div className="showcase-heading" data-reveal>
            <p className="kicker">[ TRE LINGUAGGI VISIVI ]</p>
            <h2 id="showcase-title">Non esiste un montaggio giusto per tutti.<br /><em>Esiste quello che fa arrivare il tuo messaggio.</em></h2>
            <p>Cinematico, motion graphics o modern edit: non scelgo per gusto. Scelgo in base a ciò che il contenuto deve far sentire, capire e ricordare.</p>
          </div>
          <ShowcaseCarousel />
          <div className="showcase-cta" data-reveal>
            <p>Hai già in mente una direzione oppure vuoi trovarla insieme?</p>
            <a href={instagram} target="_blank" rel="noreferrer" onClick={() => trackContact("showcase")}>Confrontiamoci sullo stile <span>↗</span></a>
          </div>
        </section>

        <section className="method section" id="metodo">
          <div className="method-heading" data-reveal>
            <p className="kicker">[ IL METODO ]</p>
            <h2>Meno passaggi.<br /><em>Più decisioni giuste.</em></h2>
          </div>
          <div className="method-list" data-reveal>
            {method.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pilot section" id="pilota">
          <div className="pilot-copy" data-reveal>
            <p className="kicker">[ UN PRIMO PASSO SEMPLICE ]</p>
            <h2>Non scegliere una collaborazione al buio.<br /><em className="marker-highlight">Inizia da un video.</em></h2>
            <p>Mandami una registrazione. Ti restituisco un Reel pronto da pubblicare, con apertura, ritmo e identità progettati per trattenere l&apos;attenzione. Valuti il risultato concreto e poi decidi se continuare.</p>
          </div>
          <div className="pilot-action" data-reveal>
            <ul>
              <li>Creo un reel verticale completo</li>
              <li>Propongo due aperture alternative</li>
              <li>Includo una revisione</li>
              <li>Consegno il file pronto per i social</li>
            </ul>
            <a className="button" href={instagram} target="_blank" rel="noreferrer" onClick={() => trackContact("pilot")}>Proponimi il video pilota <span>↗</span></a>
            <small>Guarda il risultato. Poi scegli se continuare.</small>
          </div>
        </section>

        <section className="faq section" id="faq" aria-labelledby="faq-title">
          <div className="faq-heading" data-reveal>
            <p className="kicker">[ PRIMA DI INIZIARE ]</p>
            <h2 id="faq-title">Domande concrete.<br /><em>Risposte chiare.</em></h2>
          </div>
          <div className="faq-list" data-reveal>
            {faqItems.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<i>+</i></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta" id="contatto">
          <span className="final-mark" aria-hidden="true" />
          <p data-reveal>Nel tuo materiale c&apos;è già una storia che merita attenzione.</p>
          <h2 data-reveal>Facciamolo<br /><em>emergere.</em></h2>
          <a className="button" href={instagram} target="_blank" rel="noreferrer" data-reveal onClick={() => trackContact("final")}>Iniziamo dal materiale <span>↗</span></a>
          <small data-reveal>@edgevisuals.co · La prima risposta arriva da me</small>
        </section>
      </main>

      <footer>
        <a className="footer-brand" href="#top" aria-label="Edge Visuals, torna all'inizio"><span className="footer-mark" aria-hidden="true" /><span className="footer-wordmark" aria-hidden="true" /></a>
        <p>CREO VIDEO BREVI PER I SOCIAL<br />COLLABORO DA VERONA CON CLIENTI OVUNQUE</p>
        <a href={instagram} target="_blank" rel="noreferrer" onClick={() => trackContact("footer")}>INSTAGRAM ↗</a>
        <span>© {new Date().getFullYear()} EDGE VISUALS</span>
      </footer>

      <aside className="availability-bar" aria-label="Disponibilità limitata per nuovi progetti">
        <div className="availability-status"><i /><span>NUOVI PROGETTI</span></div>
        <p><strong>Seguo pochi progetti alla volta.</strong><span> Così ogni montaggio riceve attenzione reale, dall&apos;idea alla consegna.</span></p>
        <a href={instagram} target="_blank" rel="noreferrer" onClick={() => trackContact("availability")}>Verifica disponibilità <span>↗</span></a>
      </aside>
      <AmbientSound />
    </div>
  );
}
