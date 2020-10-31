export default class AnimationHelper{
    constructor(node, animationKeys){
        //[x = 0,y = 1,finalSpeed = 2, time = 3]
        this.node = node;
        //this.animKey = [[0,0, 0,0],[783,0, 0,3]];//,[200,0,500,2],[0,500,0,2],[50,50, 0,1],[783,800,10,1]];
        this.animKey = animationKeys;
        this.speedInitX = 0;
        this.speedInitY = 0;
        this.accX = 0;
        this.accY = 0;
        this.displX = 0;
        this.displY = 0;
        this.timer = 0;

        this.node.style.left = this.animKey[0][0] + "px";

        this.isAnim = false;
        this.index = 1;
    }

    tick(deltatick){
        let alive = true;
        if(!this.isAnim){
            let dist = this.animKey[this.index][0] - this.animKey[(this.index-1)][0];
            console.log(dist);
            this.speedInitX = ((dist*2)/this.animKey[this.index][3])-this.animKey[this.index][2];
            //this.speedInitX = this.speedInitX < 0 ? 0 : this.speedInitX;
            this.accX = (this.animKey[this.index][2]-this.speedInitX)/this.animKey[this.index][3];

            this.isAnim = true;
        }

        this.timer += deltatick;
        if (this.timer <= this.animKey[this.index][3]){
            this.displX = (this.speedInitX*this.timer) + ((this.accX * Math.pow(this.timer,2))/2);
            //console.log(this.displX);
            let x = this.animKey[(this.index - 1)][0] + this.displX;
            this.node.style.left = x + "px";

            console.log("Index: " + this.index, this.speedInitX, this.accX, "Displ: " +this.displX, this.timer);

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