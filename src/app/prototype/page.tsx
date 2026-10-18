import type {Metadata} from 'next';
import { ConnectedSystem } from '@/components/connected-system';
import { CommandLauncher } from '@/components/command-launcher';
export const metadata:Metadata={title:'Connected engineering prototype',robots:{index:false,follow:false}};
export default function Prototype(){return <div className='connected-prototype'><div className='container prototype-bar'><span className='eyebrow'>LOCAL INTERACTION PROTOTYPE</span><CommandLauncher/></div><ConnectedSystem/></div>;}
