import AnimationHelper from "../AnimationHelper.js"
export default class Ciri{
    constructor(){

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

}