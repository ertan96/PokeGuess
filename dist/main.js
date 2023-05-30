!function(){"use strict";var t,s,e,i;t=class{constructor(t,s,e,i){this.image=new Image,this.image.src=t,this.canvas=s,this.ctx=e,this.scale=i,this.width=0,this.height=0,this.x=0,this.y=0,this.dx=1,this.dy=1,this.angle=0,this.move=this.move.bind(this),this.image.onload=()=>{this.width=this.image.width*this.scale,this.height=this.image.height*this.scale,this.x=Math.random()*(this.canvas.width-this.width),this.y=Math.random()*(this.canvas.height-this.height),this.draw()}}move(){this.x+=this.dx,this.y+=this.dy,this.angle+=.02,(this.x+this.width>this.canvas.width||this.x<0)&&(this.dx*=-1),(this.y+this.height>this.canvas.height||this.y<0)&&(this.dy*=-1)}draw(){this.move(),this.ctx.save(),this.ctx.translate(this.x+this.width/2,this.y+this.height/2),this.ctx.rotate(this.angle),this.ctx.drawImage(this.image,-this.width/2,-this.height/2,this.width,this.height),this.ctx.restore()}startAnimation(){this.draw()}},s=class extends t{constructor(t,s,e,i){let a=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];super(t,s,e,i),this.imagePath=t,this.isSilhouette=a,this.isRevealed=!1}applySilhouette(t){const s=t.data;for(let t=0;t<s.length;t+=4)0!==s[t+3]&&(s[t]=0,s[t+1]=0,s[t+2]=0);return t}draw(){if(super.draw(),this.isSilhouette&&!this.isRevealed){const t=this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height),s=this.applySilhouette(t);this.ctx.putImageData(s,0,0)}}reveal(){this.isRevealed=!0,this.isSilhouette=!1,this.startAnimation()}},e=class{constructor(t,e,i,a){this.silhouette=new s(t,e,i,a,!0),this.actual=new s(t,e,i,a,!0)}draw(){this.actual.isRevealed?this.actual.draw():this.silhouette.draw()}reveal(){this.actual.reveal(),this.silhouette.reveal(),console.log("Pair class reveal: 321")}},i=class{constructor(){this.canvas=document.getElementById("view-canvas"),this.canvas.width=500,this.canvas.height=500,this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0}),this.pokemons=[],this.pairs=[]}start(){const t=[new e("./src/pokemonImages/pikachu.png",this.canvas,this.ctx,.1),new e("./src/pokemonImages/emolga.png",this.canvas,this.ctx,.2),new e("./src/pokemonImages/bulbasaur.png",this.canvas,this.ctx,.3),new e("./src/pokemonImages/ivysaur.png",this.canvas,this.ctx,.3),new e("./src/pokemonImages/venusaur.png",this.canvas,this.ctx,.3),new e("./src/pokemonImages/charmander.png",this.canvas,this.ctx,.3),new e("./src/pokemonImages/charmeleon.png",this.canvas,this.ctx,.3),new e("./src/pokemonImages/charizard.png",this.canvas,this.ctx,.3),new e("./src/pokemonImages/squirtle.png",this.canvas,this.ctx,.3),new e("./src/pokemonImages/wartortle.png",this.canvas,this.ctx,.3),new e("./src/pokemonImages/blastoise.png",this.canvas,this.ctx,.3)];for(let s=0;s<4;s++){const s=Math.floor(Math.random()*t.length),e=t.splice(s,1)[0];this.pairs.push(e)}this.hiddenPairIndex=Math.floor(Math.random()*this.pairs.length),window.pairs=this.pairs,this.animate()}animate(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.pairs.forEach(((t,s)=>{s!==this.hiddenPairIndex&&t.draw()})),requestAnimationFrame((()=>this.animate()))}revealPair(t){console.log(`Revealing pair at index ${t}`),this.pairs[t].reveal(),console.log(`Pair revealed: ${this.pairs[t].actual.isRevealed}`)}isGameWon(){return this.pairs.filter(((t,s)=>s!==this.hiddenPairIndex)).every((t=>t.actual.isRevealed))}},document.addEventListener("DOMContentLoaded",(()=>{console.log("Webpack testing works"),document.getElementById("start-button").addEventListener("click",(()=>{console.log("button is getting clicked");const t=new i;t.start(),function(t){const s=document.querySelector(".container"),e=document.createElement("table"),i=t.pairs.length;for(let s=0;s<2;s++){const a=document.createElement("tr");for(let e=0;e<2;e++){const h=document.createElement("td"),n=document.createElement("img"),c=2*s+e;c<i&&(n.src=t.pairs[c].actual.imagePath,n.dataset.pokemon=c,n.classList.add("pokemon-button")),h.appendChild(n),a.appendChild(h)}e.appendChild(a)}s.appendChild(e),e.addEventListener("click",(s=>{if("IMG"===s.target.tagName){const e=parseInt(s.target.dataset.pokemon);e===t.hiddenPairIndex?console.log("You lose!"):(t.revealPair(e),t.isGameWon()&&console.log("You win!"))}}))}(t)}))}))}();
//# sourceMappingURL=main.js.map