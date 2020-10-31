
export default class Geralt{
    constructor(){
        
        this.posInit = [-783,0,0]; //[x,y,speed]
        this.posFinal = [0,0,0];
        this.x = this.posInit[0];
        this.y = this.posInit[1];
        this.timeToAnim = 2;

        this.posInit[2] = (((this.posFinal[0] - this.posInit[0])*2)/this.timeToAnim)-this.posFinal[2];

        this.speed = this.posInit[2];

        this.acceleration = (this.posFinal[2]-this.speed)/this.timeToAnim;

        this.timer = 0;
        this.displacement = 0;

        this.node = document.querySelector(".geralt");

        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
    }


    tick(deltatick){
        
        let alive = true;
        this.timer += deltatick;
        if (this.timer <= this.timeToAnim){
            this.displacement = this.speed*this.timer + ((this.acceleration * Math.pow(this.timer,2))/2);
        }
        else{
            alive = false;
        }

        this.x = this.posInit[0] + this.displacement;
        console.log(this.node.style.left);

        this.node.style.left = this.x + "px";
    
        return alive;
    }

}