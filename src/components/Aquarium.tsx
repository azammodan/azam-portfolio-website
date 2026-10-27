'use client'
import { useEffect, useRef } from 'react'

// Procedural sea life: no image downloads or heavy 3D runtime required.
export default function Aquarium({ moving, scene = 0 }: { moving: boolean; scene?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const clock = useRef(0)
  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    // Retain the outgoing scene for a short crossfade without a second animation loop.
    const outgoing = document.createElement('canvas')
    outgoing.width = el.width; outgoing.height = el.height
    outgoing.getContext('2d')?.drawImage(el, 0, 0)
    let fade = moving ? 1 : 0
    let frame = 0, previous = 0, width = 0, height = 0
    const palettes = [
      ['#03192c','#06324b','#020e22','#12698155'],
      ['#010813','#041326','#010610','#17365444'],
      ['#140d2b','#33244d','#090c24','#8555b844'],
      ['#071126','#172841','#050d22','#779bd333'],
      ['#022735','#07525b','#031e30','#50bcaa44'],
    ]
    const colors = palettes[scene] || palettes[0]
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
    function jelly(x:number,y:number,s:number,t:number,j:number,color:string){
      const c=ctx!;c.save();c.globalAlpha=scene===3?.5:.24
      const pulse=1+Math.sin(t*.8+j)*.06
      const g=c.createRadialGradient(x,y,0,x,y,s*1.4);g.addColorStop(0,color);g.addColorStop(1,'#5eabc300');c.fillStyle=g
      c.beginPath();c.ellipse(x,y,s*pulse,s*.7,0,Math.PI,0);c.quadraticCurveTo(x,y+s*.3,x-s*pulse,y);c.fill()
      c.strokeStyle=color;c.lineWidth=.7
      for(let k=0;k<6;k++){c.beginPath();c.moveTo(x-s*.65+k*s*.26,y);c.bezierCurveTo(x-s+k*s*.4+Math.sin(t+k)*10,y+s,x+k*3+Math.sin(t+k)*9,y+s*1.5,x-s*.5+k*s*.25,y+s*2.5);c.stroke()}c.restore()
    }
    function submarine(x:number,y:number,t:number){
      const c=ctx!;c.save();c.globalAlpha=.85;c.translate(x,y);const scale=Math.min(width/800,.95);c.scale(scale,scale)
      // A soft searchlight points into the open water.
      const light=c.createLinearGradient(60,0,330,0);light.addColorStop(0,'#b7dbc92c');light.addColorStop(1,'#b7dbc900');c.fillStyle=light;c.beginPath();c.moveTo(72,0);c.lineTo(330,-90);c.lineTo(330,90);c.closePath();c.fill()
      const hull=c.createLinearGradient(0,-30,0,30);hull.addColorStop(0,'#7f9091');hull.addColorStop(.35,'#3b5967');hull.addColorStop(1,'#12293c');c.fillStyle=hull
      c.beginPath();c.ellipse(0,0,78,27,0,0,Math.PI*2);c.fill();c.fillRect(-29,-39,35,17)
      c.strokeStyle='#64828d';c.lineWidth=6;c.beginPath();c.moveTo(-10,-37);c.lineTo(-10,-57);c.lineTo(4,-57);c.stroke()
      c.fillStyle='#294859';c.beginPath();c.moveTo(-61,-7);c.lineTo(-92,-22);c.lineTo(-89,20);c.lineTo(-62,7);c.fill()
      c.strokeStyle='#789995';c.lineWidth=3;c.beginPath();c.moveTo(-91,-12*Math.cos(t*3));c.lineTo(-91,12*Math.cos(t*3));c.stroke()
      for(let i=0;i<3;i++){c.fillStyle='#d0d8a5';c.shadowBlur=12;c.shadowColor='#cfdbab';c.beginPath();c.arc(-28+i*30,-2,6,0,Math.PI*2);c.fill();c.shadowBlur=0;c.strokeStyle='#192f42';c.lineWidth=3;c.stroke()}
      c.fillStyle='#d5e5b9';c.beginPath();c.arc(73,-2,3,0,Math.PI*2);c.fill();c.restore()
    }
    function angler(x:number,y:number,t:number){
      const c=ctx!;c.save();c.translate(x,y);c.scale(.8,.8);c.globalAlpha=.9
      fish(0,0,1.2,t*1.6,'#36445e')
      c.fillStyle='#091321';c.beginPath();c.ellipse(28,4,9,11,-.3,0,Math.PI*2);c.fill()
      c.fillStyle='#a5b3af';for(let i=0;i<3;i++){c.beginPath();c.moveTo(23+i*4,-4);c.lineTo(25+i*4,2);c.lineTo(26+i*4,-5);c.fill()}
      c.strokeStyle='#718b96';c.lineWidth=1.2;c.beginPath();c.moveTo(10,-15);c.bezierCurveTo(7,-60,47,-63,48,-36);c.stroke()
      const light=c.createRadialGradient(48,-35,0,48,-35,48);light.addColorStop(0,'#a3e3ce55');light.addColorStop(1,'#a3e3ce00');c.fillStyle=light;c.fillRect(0,-83,96,96)
      c.fillStyle='#c9ffe6';c.shadowColor='#98ffda';c.shadowBlur=16;c.beginPath();c.arc(48,-35,4+Math.sin(t)*.4,0,Math.PI*2);c.fill();c.restore()
    }
    function turtle(x:number,y:number,t:number){
      const c=ctx!;c.save();c.translate(x,y);c.rotate(-.15);c.globalAlpha=.65;const s=Math.min(width/700,1);c.scale(s,s)
      c.fillStyle='#6caa9b';for(const side of [-1,1]){c.beginPath();c.moveTo(7,side*10);c.quadraticCurveTo(8+Math.sin(t)*7,side*49,36,side*34);c.lineTo(24,side*7);c.fill();c.beginPath();c.moveTo(-22,side*9);c.lineTo(-36,side*25);c.lineTo(-9,side*15);c.fill()}
      c.beginPath();c.ellipse(40,0,13,9,0,0,Math.PI*2);c.fill()
      const shell=c.createRadialGradient(10,-6,0,0,0,36);shell.addColorStop(0,'#7fa896');shell.addColorStop(1,'#285b5e');c.fillStyle=shell;c.beginPath();c.ellipse(0,0,34,22,0,0,Math.PI*2);c.fill()
      c.strokeStyle='#acc2a855';c.lineWidth=1;c.beginPath();c.moveTo(-15,-12);c.lineTo(8,-16);c.lineTo(22,0);c.lineTo(8,16);c.lineTo(-15,12);c.closePath();c.stroke();c.fillStyle='#092d39';c.beginPath();c.arc(45,-3,1.5,0,Math.PI*2);c.fill();c.restore()
    }
    function reef(t:number){
      const c=ctx!;c.save();c.globalAlpha=.3
      for(let i=0;i<16;i++){const x=width*(.6+rand(i+900)*.4),h=30+rand(i+920)*65;c.strokeStyle=i%3===0?'#ad8da8':'#5caa9a';c.lineWidth=3+rand(i+940)*5;c.lineCap='round';c.beginPath();c.moveTo(x,height+10);c.quadraticCurveTo(x-15,height-h*.5,x+Math.sin(t*.4+i)*8,height-h);c.stroke();c.beginPath();c.moveTo(x,height-h*.35);c.lineTo(x+18,height-h*.7);c.stroke()}c.restore()
    }
    function draw() {
      const c=ctx!,t=clock.current;c.clearRect(0,0,width,height)
      const bg=c.createLinearGradient(0,0,0,height);bg.addColorStop(0,colors[0]);bg.addColorStop(.48,colors[1]);bg.addColorStop(1,colors[2]);c.fillStyle=bg;c.fillRect(0,0,width,height)
      const glow=c.createRadialGradient(width*.78,height*.15,0,width*.7,height*.35,width*.65);glow.addColorStop(0,colors[3]);glow.addColorStop(1,'#07314b00');c.fillStyle=glow;c.fillRect(0,0,width,height)
      for(let i=0;i<(scene===1?0:6);i++){c.save();c.translate(width*(.43+i*.12)+Math.sin(t*.12+i)*20,-100);c.rotate(.22+Math.sin(t*.08+i)*.03);const g=c.createLinearGradient(0,0,0,height*1.3);g.addColorStop(0,'#7dccd011');g.addColorStop(1,'#7dccd000');c.fillStyle=g;c.beginPath();c.moveTo(0,0);c.lineTo(30,0);c.lineTo(180,height*1.3);c.lineTo(-30,height*1.3);c.fill();c.restore()}
      const fishColors = scene===2 ? ['#b788ca','#77bbc5','#cfab75','#7999cb'] : scene===4 ? ['#e1ba63','#60bfb0','#82a8ce','#d38e87'] : ['#669ba8','#759fa5','#5a9297']
      // Distant fish stay subdued behind the typography.
      const count=scene===1?12:scene===3?20:scene===4?58:48
      for(let i=0;i<count;i++){const x=((rand(i+1)*width+t*(5+rand(i+5)*9))%(width+180))-90;const y=height*(.16+rand(i+40)*.68)+Math.sin(t*.3+i)*12;c.globalAlpha=.12+rand(i+60)*.26;fish(x,y,.13+rand(i+20)*.25,t*2+i,fishColors[i%fishColors.length])}
      if(scene===0){
        c.globalAlpha=.75;ray(width*.79+Math.sin(t*.13)*width*.13,height*.29+Math.sin(t*.19)*35,t)
        c.globalAlpha=.75;fish(width*.84+Math.sin(t*.18)*width*.1,height*.61+Math.cos(t*.3)*30,1.05,t*2,'#5e9baf',true)
      }
      if(scene!==1 && scene!==3){
        for(let i=0;i<(scene===4?16:10);i++) {
          const leftward=i%2===0, speed=9+rand(i+510)*10
          const travel=(rand(i+520)*(width+220)+t*speed)%(width+220)
          const x=leftward?width+110-travel:travel-110
          const y=height*(.2+rand(i+530)*.65)+Math.sin(t*.4+i)*16
          c.globalAlpha=.35+rand(i+540)*.3
          fish(x,y,.38+rand(i+550)*.5,t*2+i,fishColors[i%fishColors.length],leftward)
          if(scene===4 && i%3===0){ // A pale band on a few reef fish.
            c.save();c.translate(x,y);c.scale(leftward?-1:1,1);c.strokeStyle='#e6e4c1';c.lineWidth=2;c.beginPath();c.moveTo(3,-6);c.lineTo(3,6);c.stroke();c.restore()
          }
        }
      }
      if(scene===1){submarine(width*.79+Math.sin(t*.12)*width*.07,height*.32+Math.sin(t*.3)*12,t);angler(width*.78+Math.sin(t*.17)*width*.08,height*.68+Math.sin(t*.25)*20,t)}
      if(scene===4){reef(t);turtle(width*.77+Math.sin(t*.13)*width*.1,height*.3+Math.sin(t*.23)*20,t)}
      // A moonlit bloom for the journal, with occasional jellyfish elsewhere.
      if(scene!==1 && scene!==4){
        const total=scene===3?8:2
        for(let j=0;j<total;j++){
          const x=width*(scene===3?.56+rand(j+800)*.4:.88-j*.18)+Math.sin(t*.19+j)*22
          const y=height*(scene===3?.2+rand(j+820)*.6:.43+j*.42)+Math.sin(t*.4+j)*13
          const size=scene===3?18+rand(j+840)*25:j===0?25:14
          jelly(x,y,size,t,j,scene===2?'#ceb2e9':'#a8d8e1')
        }
      }
      // Fine suspended particles.
      for(let i=0;i<65;i++){c.globalAlpha=.09+rand(i+300)*.22;c.fillStyle='#b1e6df';c.beginPath();c.arc(rand(i+100)*width,(rand(i+200)*height-t*(2+rand(i)*4)+height*10)%height,rand(i+400)*1.3+.3,0,Math.PI*2);c.fill()}
      c.globalAlpha=1
      if(fade>0 && outgoing.width>0){c.globalAlpha=fade;c.drawImage(outgoing,0,0,width,height);c.globalAlpha=1}
    }
    function animate(now:number){if(previous){const dt=Math.min((now-previous)/1000,.05);clock.current+=dt;fade=Math.max(0,fade-dt/1.1)}previous=now;draw();frame=requestAnimationFrame(animate)}
    function visibility(){cancelAnimationFrame(frame);previous=0;if(moving&&!document.hidden)frame=requestAnimationFrame(animate)}
    resize();if(moving)frame=requestAnimationFrame(animate)
    window.addEventListener('resize',resize);document.addEventListener('visibilitychange',visibility)
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility)}
  },[moving,scene])
  return <canvas ref={canvas} className="aquarium" aria-hidden="true" />
}
