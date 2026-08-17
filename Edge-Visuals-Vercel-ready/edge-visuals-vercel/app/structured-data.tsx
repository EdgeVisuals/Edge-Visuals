import { faqItems, instagram } from "./content";
import { siteUrl } from "./site-config";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Edge Visuals",
      url: siteUrl,
      logo: `${siteUrl}/edge-visuals-precision-mark.svg`,
      sameAs: [instagram],
      description:
        "Edge Visuals monta video brevi per creator e personal brand e trasforma podcast, interviste e riprese grezze in contenuti riconoscibili.",
      knowsAbout: [
        "Montaggio video breve",
        "Reel Instagram",
        "Video TikTok",
        "YouTube Shorts",
        "Motion graphics",
        "Personal branding",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Edge Visuals",
      inLanguage: "it-IT",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Edge Visuals: montaggio video per Reel, TikTok e YouTube Shorts",
      description:
        "Edge Visuals monta video brevi per creator e personal brand e collabora online con clienti in tutta Italia.",
      inLanguage: "it-IT",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#service` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "Montaggio video breve per creator e personal brand",
      serviceType: "Montaggio di Reel Instagram, video TikTok e YouTube Shorts",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Italia" },
      audience: {
        "@type": "Audience",
        audienceType: "Creator, professionisti e personal brand",
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: instagram,
        availableLanguage: "Italian",
      },
      description:
        "Edge Visuals seleziona i passaggi più efficaci, costruisce il ritmo e consegna video verticali pronti per Instagram, TikTok e YouTube.",
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      inLanguage: "it-IT",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
