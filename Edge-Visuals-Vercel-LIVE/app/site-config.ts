function normalizeUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

const deploymentDomain =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  process.env.NEXT_PUBLIC_VERCEL_URL;

export const siteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? deploymentDomain ?? "http://localhost:3000",
);
