// Vercel supplies the stable production hostname during deployment builds.
export const siteOrigin = new URL(
  process.env.SITE_URL ??
  'https://azharabdool.vercel.app',
);
