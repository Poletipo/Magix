class Flamme{
    constructor(x,y, size,flickerSpeed, parent,style){
        this.size = size;
        this.style = style;
        this.x = x -this.size/2;
        this.y = y - this.size/2;
        this.timer = 0;
        this.flickerSpeed = flickerSpeed;
        
        this.node = document.createElement("div");
        this.node.className = "flamme";
        this.node.style.width = this.size +this.style; 
        this.node.style.height = this.size +this.style;
        this.node.style.left = this.x +this.style;
        this.node.style.top = this.y +this.style;

        this.node.style.opacity = 0.5;
        parent.appendChild(this.node);
    }
    
    
    tick(deltatick){
        let alive = true;
        this.timer += deltatick;
        
        if(this.timer>this.flickerSpeed){
            this.node.style.opacity = (Math.random()/2)+0.5;
            this.timer = 0;
        }

        if(!alive){
            this.node.remove();
        }

        return alive;
    }

}