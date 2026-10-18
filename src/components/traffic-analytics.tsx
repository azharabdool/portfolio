'use client';
import { Analytics } from '@vercel/analytics/next';
import { useSyncExternalStore } from 'react';
import { analyticsAllowed, anonymousPageUrl } from '@/lib/traffic-privacy';

const subscribe = () => () => {};
function permitted() {
  const privacy = navigator as Navigator & { globalPrivacyControl?: boolean };
  return analyticsAllowed(location.hostname, privacy.doNotTrack, privacy.globalPrivacyControl);
}
export function TrafficAnalytics() {
  const enabled = useSyncExternalStore(subscribe, permitted, () => false);
  if (!enabled) return null;
  return <Analytics mode='production' debug={false} beforeSend={event => {
    if (!permitted() || event.type !== 'pageview') return null;
    const url = anonymousPageUrl(event.url);
    return url ? { ...event, url } : null;
  }}/>;
}
