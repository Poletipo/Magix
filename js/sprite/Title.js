import AnimationHelper from "../AnimationHelper.js"
export default class Title{
    constructor(){

        this.node = document.querySelector(".login-title");
        this.animKeys = [[-500,-200,0,0],[0,450,10000,1]];
        this.anim = new AnimationHelper(this.node,this.animKeys);
        this.timer = 0;
        this.sizeX = 200;
        this.sizeY = 150;
        this.dimX = 100;
        this.dimY = 100;

        this.node.style.width = 200 + "%";
        //this.node.style.width = 5000 + "px";
        this.node.style.height = 200 + "%";
        
    }
    
    tick(deltatick){
        
        let alive = true;
        let aliveAnim = false;
        if(this.anim){
            aliveAnim = this.anim.tick(deltatick);
            
            this.sizeX -= this.dimX * deltatick;
            this.sizeY -= this.dimY * deltatick;
            this.node.style.width = this.sizeX + "%";
            this.node.style.height = this.sizeY + "%";
            
        }
        if(!aliveAnim){
            this.anim = null;
        }

        return alive;
    }
}