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
        let speedX  = (Math.random() <= 0.5 )? Math.random()*2+5 : Math.random()*-2-5;
        let speedY = Math.random()*2 - 7;
        smokeSpawn = Math.random();
        let size = Math.random()*10 + 50;
        let time = Math.random()*3+4;
        spriteList.push(new Smoke(50,75,speedX,speedY, size, time, document.querySelector(".smoke-container"), "%"));
        smokeTimer = 0;
    }



    for (let i = 0; i < spriteList.length; i++) {
        const element = spriteList[i];
        let alive = element.tick(deltaTick);

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);

}