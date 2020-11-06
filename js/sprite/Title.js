class Title{
    constructor(){
        document.addEventListener("mousemove", evt =>{this.interactifMove(evt)});

        this.node = document.querySelector(".login-title");
        this.animKeys = [[-800,-200,0,0],[0,450,900,1]];
        this.anim = new AnimationHelper(this.node,this.animKeys);
        this.timer = 0;
        this.sizeX = 200;
        this.sizeY = 150;
        this.dimX = 100;
        this.dimY = 100;
        this.introDone = false;
        
        this.node.style.width = 200 + "%";
        this.node.style.height = 200 + "%";
        
    }
    
    tick(deltatick){
        
        let alive = true;
        let aliveAnim = false;
        if(this.anim){

            aliveAnim = this.anim.tick(deltatick);
        }
        if(!aliveAnim){
            this.anim = null;
            this.introDone = true;
        }
        if(!this.introDone){
            this.sizeX -= this.dimX * deltatick;
            this.sizeY -= this.dimY * deltatick;
            this.node.style.width = this.sizeX + "%";
            this.node.style.height = this.sizeY + "%";
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