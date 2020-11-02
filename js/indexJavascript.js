import Geralt from "./sprite/Geralt.js";
import Ciri from "./sprite/Ciri.js";
import Title from "./sprite/Title.js";
import Smoke from "./sprite/Smoke.js";
let spriteList = [];
let smokeSpawn = 0;
let smokeTimer = 0;

window.addEventListener("load", () => {

    spriteList.push(new Geralt());
    spriteList.push(new Ciri());
    spriteList.push(new Title());
    
    window.requestAnimationFrame(tick);
})

let lastTime = 0;
let deltaTick = 0;

const tick = timeSpan =>{
    deltaTick =  (timeSpan - lastTime) / 1000;
    lastTime = timeSpan;
    
    smokeTimer += deltaTick;
    if(smokeTimer >= smokeSpawn){
        let speedX  = (Math.random() <= 0.5 )? Math.random()*20+90 : Math.random()*-20-90;
        let speedY = Math.random()*20-70;
        smokeSpawn = Math.random();
        let size = Math.random()*100 + 500;
        let time = Math.random()*3+4;
        spriteList.push(new Smoke(1000,750,speedX,speedY, size, time, document.querySelector(".login")));
        smokeTimer = 0;
        
    }



    for (let i = 0; i < spriteList.length; i++) {
        const element = spriteList[i];
        let alive = element.tick(deltaTick);
    
        if(spriteList[i].name == "ChatIntro" && !alive){
            introDone = true;
        }


        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);

}