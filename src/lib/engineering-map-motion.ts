import { cityLights } from '../data/city-lights.ts';

type Point={x:number;y:number};
type Rect={left:number;top:number;width:number;height:number};
const clamp=(n:number,min=0,max=1)=>Math.max(min,Math.min(max,Number.isFinite(n)?n:min));
export function mapReveal(top:number,height:number,viewport:number,reduced=false) {
  if(reduced)return 1;
  return clamp((viewport-top)/Math.max(1,Math.min(height,viewport)*.88));
}
export function mixPoint(from:Point,to:Point,progress:number):Point {
  const p=clamp(progress);
  return {x:from.x+(to.x-from.x)*p,y:from.y+(to.y-from.y)*p};
}
export function lightOrigin(index:number,horizon:Rect,plot:Rect):Point {
  const light=cityLights[index%cityLights.length];
  return {x:clamp((horizon.left+horizon.width*light[0]/100-plot.left)/Math.max(1,plot.width)*680,28,652),y:clamp((horizon.top+horizon.height*light[1]/100-plot.top)/Math.max(1,plot.height)*640,28,612)};
}
