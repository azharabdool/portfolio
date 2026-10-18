'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useVisibleWork } from '@/hooks/use-visible-work';

const EngineeringMap=dynamic(()=>import('./engineering-map'));
const MiniDemos=dynamic(()=>import('./mini-engineering-demos'));
export function ConnectedSystem() {
  const {ref:mapRef,near:mapNear}=useVisibleWork('400px');
  const {ref:demosRef,near:demosNear}=useVisibleWork('250px');
  return <><section id='engineering-map' className='section connected-section' aria-label='Connected engineering foundation'><div className='container' ref={mapRef}>{mapNear?<EngineeringMap/>:<div className='network-reserved'><p className='eyebrow'>THE ENGINEERING MAP</p><h2>Different disciplines.<br/><span>Shared foundations.</span></h2><Link href='/lab/'>Explore the engineering archive</Link></div>}</div></section><section id='engineering-motion' className='section motion-section' aria-label='Engineering in motion'><div className='container' ref={demosRef}>{demosNear?<MiniDemos/>:<div className='motion-reserved'><p className='eyebrow'>ENGINEERING, IN MOTION</p><h2>Take the controls.</h2><Link href='/playground/'>Explore interactive demos</Link></div>}</div></section></>;
}
