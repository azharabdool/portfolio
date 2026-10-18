import { projects, skillGroups, profile } from '../data/profile.ts';
import { archiveProjects } from '../data/engineering-archive.ts';
import { credentialEvidence } from '../data/credentials.ts';
import { demos } from '../data/demos.ts';
import { engineeringNodes } from '../data/engineering-network.ts';

export type CommandEntry = { id:string; title:string; kind:string; href:string; detail:string; keywords:string };
const actions: CommandEntry[] = [
  {id:'general-cv',title:'View general CV',kind:'Action',href:profile.cv,detail:'Software & Computer Engineering',keywords:'resume curriculum vitae download'},
  {id:'ai-cv',title:'View AI CV',kind:'Action',href:profile.aiCv,detail:'AI / Machine Learning applications',keywords:'resume machine learning ML download'},
  {id:'lab',title:'Enter Engineering Lab',kind:'Action',href:'/lab/',detail:'17 historical engineering studies',keywords:'archive explore systems electrical embedded'},
  {id:'play',title:'Explore interactive demos',kind:'Action',href:'/playground/',detail:'10 browser experiences',keywords:'play interact simulation playground'},
  {id:'github',title:'Open GitHub',kind:'Action',href:profile.github,detail:'azharabdool',keywords:'source code repositories'},
  {id:'linkedin',title:'Open LinkedIn',kind:'Action',href:profile.linkedin,detail:'Professional profile',keywords:'career experience'},
  {id:'contact',title:'Contact Azhar',kind:'Action',href:`mailto:${profile.email}`,detail:profile.email,keywords:'email hire work contact'},
];
const networkTerms = (slug:string) => engineeringNodes.find(node=>node.slug===slug)?.links.map(link=>`${link.discipline} ${link.reason} ${link.discipline==='ai'?'machine learning ML AI data':''}`).join(' ') ?? '';
export const commandEntries: CommandEntry[] = [
  ...actions,
  ...projects.map(p=>({id:`project-${p.slug}`,title:p.title,kind:'Project',href:`/projects/${p.slug}/`,detail:p.tags.join(' · '),keywords:`${p.slug} ${p.description} ${p.tags.join(' ')} ${networkTerms(p.slug)}`})),
  ...archiveProjects.map(p=>({id:`study-${p.slug}`,title:p.title,kind:'Study',href:`/engineering/${p.slug}/`,detail:`${p.course} · ${p.year}`,keywords:`${p.slug} ${p.tags.join(' ')} ${p.summary} ${networkTerms(p.slug)}`})),
  ...demos.map(d=>({id:`demo-${d.slug}`,title:d.slug==='andre'?'Run Andre':d.slug==='four-rooms'?'Play Four Rooms':d.title,kind:'Demo',href:`/playground/${d.slug}/`,detail:d.summary,keywords:`play run interactive demo ${d.slug} ${d.title} ${d.rules}`})),
  ...credentialEvidence.map(c=>({id:`credential-${c.slug}`,title:c.title,kind:'Credential',href:`/credentials/${c.slug}.pdf`,detail:c.issuer,keywords:`certification training certificate ${c.slug} ${c.title} ${c.issuer}`})),
  ...skillGroups.map(g=>({id:`skill-${g.number}`,title:g.title,kind:'Skills',href:'/profile/#skills',detail:g.items.join(' · '),keywords:`tools technologies ${g.items.join(' ')}`})),
];
export function searchCommands(query:string): CommandEntry[] {
  const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if(!words.length)return actions;
  return commandEntries.map(entry=>({entry,score:words.reduce((n,word)=>n+(entry.title.toLowerCase().includes(word)?5:entry.detail.toLowerCase().includes(word)?3:1),0)}))
    .filter(({entry})=>words.every(word=>`${entry.title} ${entry.detail} ${entry.keywords}`.toLowerCase().includes(word)))
    .sort((a,b)=>b.score-a.score||a.entry.title.localeCompare(b.entry.title)).map(item=>item.entry).slice(0,30);
}
