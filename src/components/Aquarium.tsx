'use client'
import { useEffect, useRef } from 'react'

// Procedural sea life: no image downloads or heavy 3D runtime required.
export default function Aquarium({ moving }: { moving: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const clock = useRef(0)
  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    let frame = 0, previous = 0, width = 0, height = 0
    const rand = (n: number) => {const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x)}
    function resize() {width = innerWidth; height = innerHeight; const dpr = Math.min(devicePixelRatio || 1, 2); el!.width = width*dpr; el!.height = height*dpr; ctx!.setTransform(dpr,0,0,dpr,0,0); draw()}
    function fish(x: number,y: number,size: number,phase: number,color: string,flip=false) {
      const c=ctx!; c.save(); c.translate(x,y); c.scale(flip ? -size : size,size)
      const tail=Math.sin(phase)*5
      c.fillStyle=color; c.beginPath(); c.moveTo(-27,0); c.lineTo(-47,-14+tail); c.quadraticCurveTo(-41,0,-47,14+tail); c.closePath(); c.fill()
      const g=c.createLinearGradient(0,-15,0,15);g.addColorStop(0,'#a6c7c7');g.addColorStop(.35,color);g.addColorStop(1,'#0a304b');c.fillStyle=g
      c.beginPath();c.moveTo(34,0);c.bezierCurveTo(12,-21,-17,-16,-30,0);c.bezierCurveTo(-15,16,13,19,34,0);c.fill()
      c.fillStyle=color;c.beginPath();c.moveTo(-8,-11);c.lineTo(-1,-23);c.lineTo(15,-10);c.fill();c.beginPath();c.moveTo(-3,8);c.lineTo(-11,20);c.lineTo(16,8);c.fill()
      c.strokeStyle='#b7e7df55';c.lineWidth=.7;c.beginPath();c.moveTo(-23,0);c.quadraticCurveTo(4,-4,27,0);c.stroke();c.fillStyle='#061b2a';c.beginPath();c.arc(23,-2,1.6,0,Math.PI*2);c.fill();c.restore()
    }
    function ray(x:number,y:number,t:number) {const c=ctx!;c.save();c.translate(x,y);c.rotate(-.15);const s=Math.min(width/1100,1.1);c.scale(s,s); const flap=Math.sin(t*.65)*19;const g=c.createLinearGradient(0,-75,0,70);g.addColorStop(0,'#6f9ca7');g.addColorStop(.4,'#315b74');g.addColorStop(1,'#102d49');c.fillStyle=g;c.beginPath();c.moveTo(65,0);c.bezierCurveTo(32,-14,6,-45,-69,-76+flap);c.quadraticCurveTo(-48,-22,-30,0);c.quadraticCurveTo(-53,28,-78,73-flap);c.bezierCurveTo(-16,52,33,16,65,0);c.fill();c.strokeStyle='#426c80';c.lineWidth=2;c.beginPath();c.moveTo(-25,0);c.bezierCurveTo(-90,5,-110,25,-155,14);c.stroke();c.restore()}
    function draw() {
      const c=ctx!,t=clock.current;c.clearRect(0,0,width,height)
      const bg=c.createLinearGradient(0,0,0,height);bg.addColorStop(0,'#03192c');bg.addColorStop(.48,'#06324b');bg.addColorStop(1,'#020e22');c.fillStyle=bg;c.fillRect(0,0,width,height)
      const glow=c.createRadialGradient(width*.78,height*.15,0,width*.7,height*.35,width*.65);glow.addColorStop(0,'#12698155');glow.addColorStop(1,'#07314b00');c.fillStyle=glow;c.fillRect(0,0,width,height)
      for(let i=0;i<6;i++){c.save();c.translate(width*(.43+i*.12)+Math.sin(t*.12+i)*20,-100);c.rotate(.22+Math.sin(t*.08+i)*.03);const g=c.createLinearGradient(0,0,0,height*1.3);g.addColorStop(0,'#7dccd011');g.addColorStop(1,'#7dccd000');c.fillStyle=g;c.beginPath();c.moveTo(0,0);c.lineTo(30,0);c.lineTo(180,height*1.3);c.lineTo(-30,height*1.3);c.fill();c.restore()}
      // Distant schools keep the left-hand reading area calm.
      for(let i=0;i<29;i++){const x=((rand(i+1)*width+t*(5+rand(i+5)*9))%(width+180))-90;const y=height*(.16+rand(i+40)*.68)+Math.sin(t*.3+i)*12;c.globalAlpha=.12+rand(i+60)*.26;fish(x,y,.13+rand(i+20)*.25,t*2+i,'#669ba8')}
      c.globalAlpha=.75;ray(width*.79+Math.sin(t*.13)*width*.13,height*.29+Math.sin(t*.19)*35,t)
      c.globalAlpha=.75;fish(width*.84+Math.sin(t*.18)*width*.1,height*.61+Math.cos(t*.3)*30,1.05,t*2,'#5e9baf',true)
      c.globalAlpha=.65;fish(width*.91+Math.sin(t*.14+2)*width*.08,height*.73+Math.sin(t*.32)*22,.65,t*2+1,'#759fa5',true)
      c.globalAlpha=.5;fish(width*.65+Math.sin(t*.11)*width*.12,height*.84+Math.sin(t*.2)*15,.7,t*1.6,'#5a9297')
      // Translucent jellyfish with flowing tentacles.
      for(let j=0;j<2;j++){const x=width*(.88-j*.18)+Math.sin(t*.19+j)*22,y=height*(.43+j*.42)+Math.sin(t*.4+j)*13,s=j===0?25:14;c.globalAlpha=.24;const g=c.createRadialGradient(x,y,0,x,y,s*1.3);g.addColorStop(0,'#c2e8e4');g.addColorStop(1,'#5eabc355');c.fillStyle=g;c.beginPath();c.ellipse(x,y,s,s*.7,0,Math.PI,0);c.quadraticCurveTo(x,y+s*.3,x-s,y);c.fill();c.strokeStyle='#91cad5';c.lineWidth=.7;for(let k=0;k<5;k++){c.beginPath();c.moveTo(x-s*.6+k*s*.3,y);c.bezierCurveTo(x-s+k*s*.4+Math.sin(t+k)*10,y+s,x+k*3+Math.sin(t+k)*9,y+s*1.5,x-s*.5+k*s*.3,y+s*2.5);c.stroke()}}
      // Fine suspended particles.
      for(let i=0;i<65;i++){c.globalAlpha=.09+rand(i+300)*.22;c.fillStyle='#b1e6df';c.beginPath();c.arc(rand(i+100)*width,(rand(i+200)*height-t*(2+rand(i)*4)+height*10)%height,rand(i+400)*1.3+.3,0,Math.PI*2);c.fill()}
      c.globalAlpha=1
    }
    function animate(now:number){if(previous)clock.current+=Math.min((now-previous)/1000,.05);previous=now;draw();frame=requestAnimationFrame(animate)}
    function visibility(){cancelAnimationFrame(frame);previous=0;if(moving&&!document.hidden)frame=requestAnimationFrame(animate)}
    resize();if(moving)frame=requestAnimationFrame(animate)
    window.addEventListener('resize',resize);document.addEventListener('visibilitychange',visibility)
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility)}
  },[moving])
  return <canvas ref={canvas} className="aquarium" aria-hidden="true" />
}
