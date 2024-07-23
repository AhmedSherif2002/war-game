export default class Player{
    degree = 0;
    constructor(id,x,y,health,team,color,ctx){
        this.id = id;
        this.x = x;
        this.y = y;
        this.health = health;
        this.team = team;
        this.speed = 8;
        this.radius = 30;
        this.color = color;
        this.ctx = ctx
    }

    update(x,y,health,degree,speed,ctx){
        this.x = x;
        this.y = y;
        this.health = health;
        this.degree = degree;
        this.speed = speed;
        this.draw(ctx);
    }

    // move(x,y){
    //     this.x = x;
    //     this.y = y;
    // }

    draw(ctx){
        // console.log("abc",this.x,this.y,ctx)
        ctx.fillStyle = this.color;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.closePath()
        this.drawWeapon(ctx);
    }

    drawWeapon(ctx){
        ctx.save()
        ctx.beginPath()
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = "rgb(158,154,117)"
        ctx.strokeStyle = "#70899D"
        ctx.strokeStyle = "#3E372C"
        ctx.lineWidth = 7
        ctx.rotate(this.degree)
        // ctx.rotate(0)
        ctx.moveTo(0, 0);
        ctx.lineTo(80, 0);
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
    }
}