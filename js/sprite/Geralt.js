import AnimationHelper from "../AnimationHelper.js"
export default class Geralt{
    constructor(){

        document.addEventListener("mousemove", evt =>{this.interactifMove(evt)});

        this.node = document.querySelector(".geralt");
        console.log("GERLAT");
        this.anim = new AnimationHelper(this.node,[[-783,0, 0,0],[0,0, 0,3]]);

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
        console.log("hello");
        if(!this.anim){
            let w = window.innerWidth;
            let h = window.innerHeight;
    
            this.suposedX = 0;


            this.x = evt.x/-40;
        
            this.newPosX = this.suposedX + this.x;
            let newAnimKey = [[parseInt(this.node.style.left),parseInt(this.node.style.top), 0, 0], [this.newPosX, 0, 10, 0.1]];
            this.anim = null;
            this.anim = new AnimationHelper(this.node, newAnimKey);
        }
    }



}