import Geralt from "./sprite/Geralt.js";
import Ciri from "./sprite/Ciri.js";
let spriteList = [];

window.addEventListener("load", () => {
    console.log("Begin");

    spriteList.push(new Geralt());
    spriteList.push(new Ciri());

    window.requestAnimationFrame(tick);
})

let lastTime = 0;
let deltaTick = 0;

const tick = timeSpan =>{
    deltaTick =  (timeSpan - lastTime) / 1000;
    lastTime = timeSpan;

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