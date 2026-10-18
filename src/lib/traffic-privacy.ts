const productionHosts = new Set(['azharabdool.vercel.app', 'portfolio-livid-seven-890kon00eu.vercel.app']);

export function analyticsAllowed(hostname: string, doNotTrack?: string | null, globalPrivacyControl?: boolean) {
  return productionHosts.has(hostname) && doNotTrack !== '1' && globalPrivacyControl !== true;
}

export function anonymousPageUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !productionHosts.has(url.hostname)) return null;
    url.search = ''; url.hash = ''; url.username = ''; url.password = '';
    return url.href;
  } catch { return null; }
}
