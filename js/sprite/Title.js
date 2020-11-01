import AnimationHelper from "../AnimationHelper.js"
export default class Title{
    constructor(){

        this.node = document.querySelector(".login-title");
        this.animKeys = [[0,0,0,0],[0,500,1000,2]];
        this.anim = new AnimationHelper(this.node,this.animKeys);


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