export default class Smoke{
    constructor(x,y,speedX, speedY, size, duration, parent){
        this.size = size;
        this.x = x - this.size/2;
        this.y = y - this.size/2;
        this.timer = 0;
        this.duration = duration;
        this.angle = 0;
        this.rotDir = Math.random();
        
        this.node = document.createElement("div");
        this.node.className = "smokePuff";
        this.node.style.width = this.size +"px"; 
        this.node.style.height = this.size +"px";

        if(Math.random() < 0.5){
            this.node.style.backgroundImage = "url('./img/smoke-sprite-png-1.png')";
        }else if((Math.random() < 0.3)){
            this.node.style.backgroundImage = "url('./img/smoke-sprite-png-2.png')";
        }


        this.node.style.opacity = 0;
        parent.appendChild(this.node);
        
        this.speedX = speedX;
        this.speedY = speedY;
    }
    
    
    tick(deltatick){
        let alive = true;
        this.timer += deltatick;
        
        this.node.style.opacity = this.timer/2;
        if(this.timer>this.duration){
            this.node.style.opacity = 1-((this.timer-this.duration)/2);
            if(1-((this.timer-this.duration)/2) < 0){
                alive = false;
            }
        }
        this.angle += this.rotDir < 0.5 ? 0.5:-0.5;

        this.node.style.transform = "rotate(" + this.angle + "deg)";

        let w = window.innerWidth;
        let h = window.innerHeight;

        this.x += this.speedX * deltatick;
        this.y += this.speedY * deltatick;

        this.node.style.left = this.x +"px";
        this.node.style.top = this.y +"px";

        if(this.y > (h+this.size) || this.y < (0 - this.size) || 
            this.x < 0 - this.size || this.x > (w+this.size)){
            alive = false;
        }
        if(!alive){
            this.node.remove();
        }

        return alive;
    }

}