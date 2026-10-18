'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useVisibleWork } from '@/hooks/use-visible-work';

function MapStandby() { return <div className='network-reserved'><h2>Engineering map</h2><Link href='/lab/'>Engineering studies</Link></div>; }
function MotionStandby() { return <div className='motion-reserved'><h2>Try the projects</h2><Link href='/playground/'>Explore all demos</Link></div>; }
const EngineeringMap=dynamic(()=>import('./engineering-map'),{loading:MapStandby});
const MiniDemos=dynamic(()=>import('./mini-engineering-demos'),{loading:MotionStandby});
export function ConnectedSystem() {
  const {ref:mapRef,near:mapNear}=useVisibleWork('400px');
  const {ref:demosRef,near:demosNear}=useVisibleWork('250px');
  return <><section id='engineering-map' className='section connected-section' aria-label='Engineering map'><div className='container' ref={mapRef}>{mapNear?<EngineeringMap/>:<MapStandby/>}</div></section><section id='engineering-motion' className='section motion-section' aria-label='Try the projects'><div className='container' ref={demosRef}>{demosNear?<MiniDemos/>:<MotionStandby/>}</div></section></>;
}
