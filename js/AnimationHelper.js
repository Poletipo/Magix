export default class AnimationHelper{
    constructor(node, animationKeys){
        //[x = 0,y = 1,finalSpeed = 2, time = 3]
        this.node = node;
        //this.animKey = [[500,0, 0,0],[0,500, 0,2]];//,[200,0,500,2],[0,500,0,2],[50,50, 0,1],[783,800,10,1]];
        this.animKey = animationKeys;
        this.speedInitX = 0;
        this.speedInitY = 0;
        this.accX = 0;
        this.accY = 0;
        this.displX = 0;
        this.displY = 0;
        this.timer = 0;

        this.node.style.left = this.animKey[0][0] + "px";
        this.node.style.top = this.animKey[0][1] + "px";

        this.isAnim = false;
        this.index = 1;
    }

    tick(deltatick){
        let alive = true;
        if(!this.isAnim){
            let distX = Math.abs(this.animKey[this.index][0] - this.animKey[(this.index-1)][0]);
            let distY = Math.abs(this.animKey[this.index][1] - this.animKey[(this.index-1)][1]);

            this.speedInitX = ((distX*2)/this.animKey[this.index][3])-this.animKey[this.index][2];
            this.speedInitX = this.speedInitX < 0 ? 0 : this.speedInitX;
            
            this.speedInitY = ((distY*2)/this.animKey[this.index][3])-this.animKey[this.index][2];
            this.speedInitY = this.speedInitY < 0 ? 0 : this.speedInitY;

            this.accX = ((distX - (this.speedInitX * this.animKey[this.index][3]))*2)/(Math.pow(this.animKey[this.index][3],2));
            this.accY = ((distY - (this.speedInitY * this.animKey[this.index][3]))*2)/(Math.pow(this.animKey[this.index][3],2));
            
            this.isAnim = true;
        }

        this.timer += deltatick;
        if (this.timer <= this.animKey[this.index][3]){
            this.displX = (this.speedInitX*this.timer) + ((this.accX * Math.pow(this.timer,2))/2);
            this.displY = (this.speedInitY*this.timer) + ((this.accY * Math.pow(this.timer,2))/2);
            

            if((this.animKey[this.index][0] - this.animKey[(this.index-1)][0]) < 0 ){
                this.displX = -this.displX;
            }
            if((this.animKey[this.index][1] - this.animKey[(this.index-1)][1])<0){
                this.displY = -this.displY;
            }

            let x = this.animKey[(this.index - 1)][0] + this.displX;
            let y = this.animKey[(this.index - 1)][1] + this.displY;


            this.node.style.left = x + "px";
            this.node.style.top = y + "px";
        }
        else{
            this.timer = 0;
            this.index++;
            this.isAnim = false;
            if(this.index >= this.animKey.length){
                alive = false;
            }
        }
        return alive;
    }



}