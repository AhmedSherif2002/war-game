import Bullet from "./Bullet.mjs"

export default class BulletsController{
    players = {};
    constructor(playerId,ctx,mapObstacles){
        this.playerId = playerId
        this.bullets = []
        this.ctx = ctx
        this.mapObstacles = mapObstacles
        setInterval(()=>{
            this.moveBullets(this.bullets)
        },1)
    }

    setPlayers(players){
        this.players = players;
    }

    shoot(x, y, degree){
        this.bullets.push(new Bullet(x,y,degree,this.ctx))
    }

    moveBullets(){
        // console.log(this.bullets)
        // console.log("bb")
        if(this.bullets.length === 0) return;
        this.bullets.forEach(bullet=>{
            bullet.x += Math.cos(bullet.degree)*30;
            bullet.y += Math.sin(bullet.degree)*30;
            const isHit = bullet.detectCollision(this.mapObstacles)
            if(isHit){
                const ind = this.bullets.indexOf(bullet)
                this.bullets.splice(ind,1)
                console.log(ind)
            }
        })  
    }

    drawBullets(){
        this.bullets.forEach(bullet=>{
            // bullet.x += Math.cos(bullet.degree)*100;
            // bullet.y += Math.sin(bullet.degree)*100;
            bullet.draw()
        })
    }
}