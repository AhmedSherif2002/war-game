export default class Bullet{
    constructor(x,y,degree,ctx){
        this.x = x;
        this.y = y;
        this.degree = degree;
        this.ctx = ctx
        this.radius = 3
        this.mapLimitX = 4000;
        this.mapLimitY = 4100;
    }

    draw(){
        this.ctx.beginPath()
        this.ctx.fillStyle = "red"
        this.ctx.arc(this.x ,this.y ,this.radius ,0 ,2*Math.PI)
        this.ctx.fill()
    }

    detectCollision(mapObstacles){
        for(let i=0;i<mapObstacles.length;i++){
            const obstacle = mapObstacles[i];
            if(obstacle.alpha) continue;
            if(
                (
                    this.x+this.radius >= obstacle.x &&
                    this.x-this.radius <= obstacle.x+obstacle.width &&
                    this.y+this.radius >= obstacle.y &&
                    this.y-this.radius <= obstacle.y+obstacle.height
                ) 
                || 
                (this.x >= this.mapLimitX || this.y >= this.mapLimitY || this.x <= 0 || this.y <= 0)
            ){
                console.log("this hit")
                return true;
                // this.shift() 
            }
        }
        return false;
    }

    detectEnemyHit(enemies){

    }
}