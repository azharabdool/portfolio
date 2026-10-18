import { cityLights } from '@/data/city-lights';
export function CityLighting() {
  return <><div className='journey-city-lights'>{cityLights.map(([x,y,w,h],i)=><span key={x} className={`tower-light colour-${i%4}`} style={{left:`${x}%`,top:`${y}%`,width:`${w}%`,height:`${h}%`}}><i/><i/><i/></span>)}</div><div className='city-water-lights'>{[34,47,59,74,80,85,94].map((x,i)=><i className={`colour-${i%4}`} key={x} style={{left:`${x}%`}}/>)}</div><div className='city-traffic'><i/><i/></div></>;
}
