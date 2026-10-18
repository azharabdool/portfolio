'use client';
import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Palette=dynamic(()=>import('./command-palette'),{ssr:false});
export function CommandLauncher() {
  const [open,setOpen]=useState(false);
  const trigger=useRef<HTMLButtonElement>(null);
  const close=()=>{setOpen(false);requestAnimationFrame(()=>trigger.current?.focus());};
  useEffect(()=>{const key=(event:KeyboardEvent)=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();setOpen(value=>!value);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[]);
  return <><button ref={trigger} type='button' className='command-launcher icon-button' title='Search portfolio (Ctrl+K)' aria-label='Search portfolio' aria-haspopup='dialog' aria-expanded={open} onClick={()=>setOpen(true)}><Search size={18}/><kbd aria-hidden='true'>Ctrl K</kbd></button>{open&&<Palette onClose={close}/>}</>;
}
