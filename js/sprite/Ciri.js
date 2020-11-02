import AnimationHelper from "../AnimationHelper.js"
export default class Ciri{
    constructor(){
        document.addEventListener("mousemove", evt =>{this.interactifMove(evt)});

        this.node = document.querySelector(".ciri");

        this.anim = new AnimationHelper(this.node,[[827,0, 0,0],[0,0, 0,3]]);

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
    
            this.suposedX = 0;

            this.x = (w - evt.x)/50;
        
            this.newPosX = this.suposedX + this.x;
            let newAnimKey = [[parseInt(this.node.style.left),parseInt(this.node.style.top), 0, 0], [this.newPosX, 0, 10, 0.1]];
            this.anim = null;
            this.anim = new AnimationHelper(this.node, newAnimKey);
        }
    }


}