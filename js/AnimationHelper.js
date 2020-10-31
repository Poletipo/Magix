export default class AnimationaHelper{
    constructor(node, animationKeys){
        //[x = 0,y = 1,finalSpeed = 2, time = 3]
        this.node = node;
        this.animKey = [[50,50, 0,0],[1000,800,500,5],[500,500,0,2]];
        //this.animKey = animationKeys;
        this.speedInitX = 0;
        this.speedInitY = 0;
        this.accX = 0;
        this.accY = 0;
        this.displX = 0;
        this.displY = 0;
        this.timer = 0;

        this.isAnim = false;
        this.index = 1;
    }

    tick(deltatick){

        this.speedInitX = (((this.animKey[this.index][0] - this.animKey[(this.index-1)][0])*2)/this.animKey[this.index][3])-this.animKey[this.index][2];

        this.accX = (this.animKey[this.index][2]-this.speedInitX)/this.animKey[this.index][3];

    }



}