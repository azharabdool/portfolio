'use client';
import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const Palette=dynamic(()=>import('./command-palette'),{ssr:false});
export function CommandLauncher() {
  const [open,setOpen]=useState(false);
  const trigger=useRef<HTMLButtonElement>(null);
  const restore=useRef<HTMLElement|null>(null);
  const launch=useCallback(()=>{restore.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setOpen(true);},[]);
  const close=useCallback(()=>{setOpen(false);requestAnimationFrame(()=>{if(restore.current?.isConnected)restore.current.focus();else trigger.current?.focus();});},[]);
  useEffect(()=>{const key=(event:KeyboardEvent)=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(open)close();else launch();}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[open,close,launch]);
  return <><button ref={trigger} type='button' className='command-launcher icon-button' title='Search portfolio (Ctrl+K)' aria-label='Search portfolio' aria-haspopup='dialog' aria-expanded={open} onClick={launch}><Search size={18}/><kbd aria-hidden='true'>Ctrl K</kbd></button>{open&&<Palette onClose={close}/>}</>;
}
