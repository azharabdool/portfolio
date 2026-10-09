// New browser models. Original coursework and teaching frameworks remain separate.
export const graphNodes = ['A', 'B', 'C', 'D', 'E'] as const;
export const graphEdges: [string, string, number][] = [['A','B',4],['A','C',1],['C','B',2],['B','D',1],['C','D',5],['D','E',3]];
export type GraphStep = { current: string | null; edge: string | null; settled: string[]; distance: Record<string, number | null>; previous: Record<string, string | null>; message: string };
export function dijkstraSteps(start: string): GraphStep[] {
  if (!graphNodes.some(n => n === start)) throw new Error('Unknown start node');
  const distance: Record<string, number | null> = Object.fromEntries(graphNodes.map(n => [n, n === start ? 0 : null]));
  const previous: Record<string, string | null> = Object.fromEntries(graphNodes.map(n => [n, null]));
  const settled: string[] = [];
  const steps: GraphStep[] = [];
  const record = (current: string | null, edge: string | null, message: string) => steps.push({ current, edge, settled: [...settled], distance: {...distance}, previous: {...previous}, message });
  record(null, null, `Initialise ${start} at distance 0.`);
  while (settled.length < graphNodes.length) {
    const node = graphNodes.filter(n => !settled.includes(n) && distance[n] !== null).sort((a,b) => distance[a]! - distance[b]!)[0];
    if (!node) break;
    settled.push(node);
    record(node, null, `Settle ${node}: distance ${distance[node]} is final.`);
    for (const [from,to,weight] of graphEdges.filter(([from]) => from === node)) {
      const candidate = distance[from]! + weight;
      const improved = !settled.includes(to) && (distance[to] === null || candidate < distance[to]!);
      if (improved) { distance[to] = candidate; previous[to] = from; }
      record(node, `${from}${to}`, improved ? `Relax ${from} → ${to}: distance ${candidate}, predecessor ${from}.` : `Inspect ${from} → ${to}: no improvement.`);
    }
  }
  record(null, null, 'Complete. Unreached nodes have no path from this start.');
  return steps;
}
export function graphPath(state: GraphStep, end: string): string[] {
  if (state.distance[end] === null) return [];
  const path: string[] = []; let node: string | null = end;
  while (node !== null && !path.includes(node)) { path.unshift(node); node = state.previous[node]; }
  return path;
}
export const pageTable = [2,4,1,7,3,5,6];
export function translateAddress(address: number) {
  if (!Number.isInteger(address) || address < 0 || address > 895) throw new Error('Address must be 0–895');
  const page = address >> 7, offset = address & 127, frame = pageTable[page];
  return { page, offset, frame, physical: (frame << 7) + offset };
}
export function components(pixels: number[], width: number, threshold: number, minSize: number) {
  if (width < 1 || pixels.length % width) throw new Error('Invalid raster');
  const visited = new Set<number>(); const groups: number[][] = [];
  for (let i=0; i<pixels.length; i++) {
    if (visited.has(i) || pixels[i] < threshold) continue;
    const queue = [i]; visited.add(i);
    for (let head=0; head<queue.length; head++) {
      const p=queue[head], x=p%width;
      const adjacent = [p-width,p+width,...(x ? [p-1] : []),...(x<width-1 ? [p+1] : [])];
      for (const n of adjacent) if (n>=0 && n<pixels.length && !visited.has(n) && pixels[n]>=threshold) { visited.add(n); queue.push(n); }
    }
    groups.push(queue);
  }
  return { groups, kept: groups.filter(g => g.length >= minSize) };
}
export function syntheticRaster() {
  return Array.from({length:24*16}, (_,i) => {
    const x=i%24,y=Math.floor(i/24);
    return x>=2&&x<7&&y>=2&&y<7 ? 200 : x>=12&&x<20&&y>=9&&y<12 ? 220 : x===21&&y===3 ? 255 : x>=2&&x<7&&y>=11&&y<15 ? 80 : 0;
  });
}
export const solvedPuzzle = [1,2,3,4,5,6,7,8,0];
export function moveTile(board: number[], index: number) {
  const blank=board.indexOf(0);
  if (index<0 || index>=9 || Math.abs(Math.floor(index/3)-Math.floor(blank/3))+Math.abs(index%3-blank%3)!==1) return board;
  const next=[...board]; [next[index],next[blank]]=[next[blank],next[index]]; return next;
}
export function shuffledPuzzle(random: () => number = Math.random) {
  let board=[...solvedPuzzle], last=-1;
  for(let i=0;i<80;i++) { const legal=board.map((_,j)=>j).filter(j=>j!==last && moveTile(board,j)!==board); const index=legal[Math.floor(random()*legal.length)]; last=board.indexOf(0); board=moveTile(board,index); }
  return board.every((v,i)=>v===solvedPuzzle[i]) ? moveTile(board,7) : board;
}
export const demoWords = ['signal','queue','thread','graph','frame','pixel','model','timer','vector','kernel','data','binary'];
export type WordState = { words: {text:string;y:number;generation:number}[]; score:number;caught:number;missed:number };
export function initialWords(): WordState { return {words:demoWords.slice(0,3).map((text,i)=>({text,y:-i*25,generation:0})),score:0,caught:0,missed:0}; }
function replacement(index:number,generation:number) { return demoWords[(index+(generation+1)*3)%demoWords.length]; }
export function catchWord(state: WordState, text: string): WordState {
  const index=state.words.findIndex(w=>w.y>=0 && w.text===text);
  if(index<0) return state;
  return {...state,caught:state.caught+1,score:state.score+text.length,words:state.words.map((w,i)=>i===index?{text:replacement(i,w.generation),y:0,generation:w.generation+1}:w)};
}
export function fallWords(state: WordState, amount=2): WordState {
  let missed=state.missed;
  const words=state.words.map((w,i)=>{const y=w.y+amount;if(y<=100)return {...w,y};missed++;return {text:replacement(i,w.generation),y:0,generation:w.generation+1};});
  return {...state,words,missed};
}
export type RoomState = { position: number[]; collected: string[]; reward: number; total: number; action: string; steps: number };
export function moveRoom(state: RoomState, direction: number, grid: number[][], packages: number[][]): RoomState {
  const delta=[[0,-1],[0,1],[-1,0],[1,0]][direction];
  if (!delta) return state;
  const next=[state.position[0]+delta[0],state.position[1]+delta[1]];
  const blocked = grid[next[1]]?.[next[0]] === undefined || grid[next[1]][next[0]] === -1;
  const key=next.join(','); const parcel=!blocked && packages.some(p=>p.join(',')===key) && !state.collected.includes(key);
  const reward=blocked?-15:parcel?80:-1;
  return {position:blocked?state.position:next,collected:parcel?[...state.collected,key]:state.collected,reward,total:state.total+reward,action:['UP','DOWN','LEFT','RIGHT'][direction],steps:state.steps+1};
}
// Synthetic club events: single-threaded capacity model, not Java thread execution.
export function clubState(time: number, capacity: number, count: number) {
  const exits: number[]=[]; const patrons=[];
  for(let i=0;i<count;i++) {
    const arrival=i*2;
    while(exits.length && exits[0]<=arrival) exits.shift();
    let entry=arrival;
    if(exits.length>=capacity) entry=exits.shift()!;
    const leave=entry+8+(i%3)*2;
    exits.push(leave); exits.sort((a,b)=>a-b);
    patrons.push({id:i+1,arrival,entry,leave,status:time<arrival?'incoming':time<entry?'waiting':time<leave?'inside':'left'});
  }
  return patrons;
}
