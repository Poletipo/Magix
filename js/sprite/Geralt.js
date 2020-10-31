import AnimationHelper from "../AnimationHelper.js"
export default class Geralt{
    constructor(){

        this.node = document.querySelector(".geralt");

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

}