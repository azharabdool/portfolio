'use client';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { searchCommands } from '@/lib/command-index';

export default function CommandPalette({onClose}:{onClose:()=>void}) {
  const dialog=useRef<HTMLDialogElement>(null);
  const input=useRef<HTMLInputElement>(null);
  const anchors=useRef<(HTMLAnchorElement|null)[]>([]);
  const [query,setQuery]=useState('');
  const [index,setIndex]=useState(0);
  const results=searchCommands(query);
  const id=useId();
  const active=Math.min(index,Math.max(0,results.length-1));
  useEffect(()=>{const element=dialog.current;const previous=document.activeElement as HTMLElement|null;element?.showModal();input.current?.focus();return()=>{element?.close();previous?.focus();};},[]);
  useEffect(()=>{anchors.current[active]?.scrollIntoView({block:'nearest'});},[active,query]);
  return <dialog ref={dialog} className='command-dialog' aria-label='Search Azhar’s engineering portfolio' onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===event.currentTarget)onClose();}}>
    <div className='command-shell'><div className='command-input-row'><Search size={20}/><input ref={input} role='combobox' aria-label='Search projects, skills, credentials and demos' aria-expanded='true' aria-controls={`${id}-results`} aria-autocomplete='list' aria-activedescendant={results.length?`${id}-option-${active}`:undefined} placeholder='Find your way into the work…' value={query} onChange={event=>{setQuery(event.target.value);setIndex(0);}} onKeyDown={event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();setIndex(results.length?(active+(event.key==='ArrowDown'?1:-1)+results.length)%results.length:0);}if(event.key==='Enter'&&results[active]){event.preventDefault();anchors.current[active]?.click();}}}/><button type='button' onClick={onClose} className='icon-button' aria-label='Close search' title='Close search'><X size={18}/></button></div>
      <div className='command-results' role='listbox' id={`${id}-results`} aria-label='Search results'>{results.map((entry,i)=><a key={entry.id} ref={element=>{anchors.current[i]=element;}} id={`${id}-option-${i}`} role='option' aria-selected={active===i} tabIndex={-1} className={active===i?'command-result selected':'command-result'} href={entry.href} onMouseMove={()=>setIndex(i)} onClick={onClose}><span className='command-kind'>{entry.kind}</span><span><strong>{entry.title}</strong><small>{entry.detail}</small></span><ArrowUpRight size={16}/></a>)}{!results.length&&<p className='command-empty'>No matching work.</p>}</div><div className='command-footer'><span>AZHAR / ENGINEERING SYSTEM</span><span aria-live='polite'>{results.length} {results.length===1?'result':'results'}</span></div>
    </div>
  </dialog>;
}
