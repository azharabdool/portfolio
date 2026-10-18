'use client';
import type { ReactNode } from 'react';
import { useVisibleWork } from '@/hooks/use-visible-work';

export function CardMotion({children}:{children:ReactNode}) {
  const {ref,animate}=useVisibleWork('0px');
  return <div ref={ref} className='project-preview' aria-hidden='true' data-animate={animate}>{children}</div>;
}
