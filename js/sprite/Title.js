class Title{
    constructor(){
        document.addEventListener("mousemove", evt =>{this.interactifMove(evt)});

        this.node = document.querySelector(".login-title");
        this.animKeys = [[-800,-200,0,0],[0,450,900,1]];
        this.anim = null;
        
        this.node.style.width = 100 + "%";
        this.node.style.height = 50 + "%";

        this.node.style.left = 0 + "px";
        this.node.style.top = 450 + "px";
        
    }
    
    tick(deltatick){
        
        let alive = true;
        let aliveAnim = false;
        if(this.anim){
            aliveAnim = this.anim.tick(deltatick);
        }
        if(!aliveAnim){
            this.anim = null;
        }

        return alive;
    }


    interactifMove(evt){
        if(!this.anim){
            let w = window.innerWidth;
            let h = window.innerHeight;
    
            this.suposedX = this.animKeys[1][0];
            this.suposedY = this.animKeys[1][1];

            this.x = (evt.x - (w/2))/-15;
            this.y = (evt.y - (h/2))/-20;
            

            this.newPosX = this.suposedX + this.x;
            this.newPosY = this.suposedY + this.y;
            let newAnimKey = [[parseFloat(this.node.style.left),parseFloat(this.node.style.top), 0, 0], [this.newPosX, this.newPosY, 10, 0.1]];
            this.anim = null;
            this.anim = new AnimationHelper(this.node, newAnimKey);
        }
        
    }


}