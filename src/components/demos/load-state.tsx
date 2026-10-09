'use client';
import { Component, useEffect, useState, type ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

function ReloadDemo() {
  return <button type='button' className='button button-quiet' onClick={()=>window.location.reload()}><RefreshCw size={17}/>Reload demo page</button>;
}

export function DemoLoading() {
  const [slow,setSlow]=useState(false);
  useEffect(()=>{const timer=setTimeout(()=>setSlow(true),10000);return()=>clearTimeout(timer);},[]);
  return <div className='demo-load-state'><p role='status'>{slow?'Loading is taking longer than expected.':'Loading demo…'}</p>{slow&&<ReloadDemo/>}</div>;
}

export class DemoBoundary extends Component<{children:ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?<div className='demo-load-state'><p role='alert'>The demo could not load. Reload this page to try again.</p><ReloadDemo/></div>:this.props.children;}
}
