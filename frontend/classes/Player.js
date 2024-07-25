export default class Player{
    degree = 0;
    mapObstacles = [  // map obstacles
        {
            x: 100,
            y: 100,
            width: 300,
            height: 300,
        },
        {
            x: 600,
            y: 100,
            width: 300,
            height: 300
        },
        {
            x: 1100,
            y: 100,
            width: 300,
            height: 300,
        },
        {
            x: 1600,
            y: 100,
            width: 300,
            height: 300,
        },
        {
            x: 2100,
            y: 100,
            width: 300,
            height: 300,
        },
        {
            x: 2600,
            y: 100,
            width: 300,
            height: 300
        },
        {
            x: 2975,
            y: 170,
            width: 480,
            height: 4
        },
        {
            x: 3455,
            y: 175,
            width: 4,
            height: 165
        },
        {
            x: 2975,
            y: 340,
            width: 480,
            height: 4
        },
        {
            x: 2970,
            y: 175,
            width: 4,
            height: 165
        },
        {
            x: 100,
            y: 550,
            width: 1300,
            height: 300
        },
        {
            x: 1605,
            y: 550,
            width: 580,
            height: 20,
        },
        {
            x: 2400,
            y: 550,
            width: 500,
            height: 20,
        },
        {
            x: 1600,
            y: 550,
            width: 20,
            height: 100,
        },
        {
            x: 1600,
            y: 550,
            width: 1300,
            height: 300,
            alpha: 0.3
        },
        {
            x: 1600,
            y: 750,
            width: 20,
            height: 100,
        },
        {
            x: 1605,
            y: 830,
            width: 580,
            height: 20,
        },
        {
            x: 2400,
            y: 830,
            width: 500,
            height: 20,
        },
        {
            x: 2900,
            y: 550,
            width: 20,
            height: 180,
        },
        {
            x: 1300,
            y: 1000,
            width: 600,
            height: 400,
        },
        {
            x: 1300,
            y: 1600,
            width: 600,
            height: 1100,
        },
        {
            x: 1300,
            y: 2900,
            width: 600,
            height: 400,
        },
        {
            x: 2100,
            y: 1000,
            width: 900,
            height: 900
        },
        {
            x: 2100,
            y: 2400,
            width: 900,
            height: 900
        },
        {
            x: 3200,
            y: 1000,
            width: 600,
            height: 400,
        },
        {
            x: 3200,
            y: 1600,
            width: 600,
            height: 1100,
        },
        {
            x: 3200,
            y: 2900,
            width: 600,
            height: 400,
        },
        {
            x: 2800,
            y: 1900,
            width: 20,
            height: 100
        },
        {
            x: 2300,
            y: 2300,
            width: 20,
            height: 100
        },
        {
            x: 2450,
            y: 2050,
            width: 200,
            height: 200
        },
        {
            x: 1300,
            y: 3440,
            width: 200,
            height: 400
        },
        {
            x: 1700,
            y: 3440,
            width: 200,
            height: 400
        },
        {
            x: 2100,
            y: 3440,
            width: 300,
            height: 210
        },
        {
            x: 2700,
            y: 3440,
            width: 300,
            height: 210
        },
        {
            x: 3200,
            y: 3440,
            width: 200,
            height: 400
        },
        {
            x: 3600,
            y: 3440,
            width: 200,
            height: 400
        },
        {
            x: 2150,
            y: 3640,
            width: 2,
            height: 170
        },
        {
            x: 2160,
            y: 3820,
            width: 190,
            height: 2
        },
        {
            x: 2360,
            y: 3640,
            width: 2,
            height: 170
        },
        {
            x: 2760,
            y: 3640,
            width: 2,
            height: 170
        },
        {
            x: 2770,
            y: 3820,
            width: 190,
            height: 2
        },
        {
            x: 2960,
            y: 3640,
            width: 2,
            height: 170
        },
        {
            x: 200,
            y: 1000,
            width: 300,
            height: 800
        },
        {
            x: 700,
            y: 1000,
            width: 300,
            height: 800
        },
        {
            x: 0,
            y: 2000,
            width: 60,
            height: 20
        },
        {
            x: 200,
            y: 2000,
            width: 600,
            height: 20
        },
        {
            x: 0,
            y: 2000,
            width: 20,
            height: 1000
        },
        {
            x: 800,
            y: 2000,
            width: 20,
            height: 100
        },
        {
            x: 800,
            y: 2240,
            width: 20,
            height: 780
        },
        {
            x: 0,
            y: 3000,
            width: 60,
            height: 20
        },
        {
            x: 200,
            y: 3000,
            width: 420,
            height: 20
        },
        {
            x: 760,
            y: 3000,
            width: 40,
            height: 20
        },
        {
            x: 0,
            y: 2300,
            width: 300,
            height: 20,
        },
        {
            x: 300,
            y: 2000,
            width: 20,
            height: 200,
        },
        {
            x: 0,
            y: 2680,
            width: 300,
            height: 20,
        },
        {
            x: 300,
            y: 2800,
            width: 20,
            height: 200,
        },
        {
            x: 490,
            y: 2000,
            width: 20,
            height: 450,
        },
        {
            x: 490,
            y: 2600,
            width: 20,
            height: 420,
        },
        {
            x: 0,
            y: 2000,
            width: 800,
            height: 1000,
            alpha: 0.2
        },
        {
            x: 100,
            y: 3300,
            width: 800,
            height: 400
        },
    ]
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

    update(x,y,health,degree,speed, mainPlayerPosition,ctx){
        this.x = x;
        this.y = y;
        this.health = health;
        this.degree = degree;
        this.speed = speed;
        let toDraw = this.toDraw(mainPlayerPosition)
        if(toDraw) this.draw(ctx);
    }

    toDraw({x, y, degree, team}){
        // return false
        if(team === this.team) return true
        // degree = degree * 180/Math.PI;
        const deltaY = (this.y-y)
        const deltaX = (this.x-x);
        const m = deltaY/deltaX;
        let degree1
        // if(deltaX >= 0)
        //     degree1 = Math.atan(deltaY/deltaX)
        // else 
        //     degree1 = Math.atan(deltaY/deltaX) + Math.PI 

        if(deltaX >= 0 && deltaY >= 0){
            degree1 = Math.atan(deltaY/deltaX)
        }else if(deltaX < 0 && deltaY >= 0){
            degree1 = Math.PI - Math.atan(deltaY/-deltaX); 
        }else if(deltaX < 0 && deltaY < 0){
            degree1 = Math.atan(deltaY/deltaX) + Math.PI;
        }else if(deltaX >= 0 && deltaY < 0){
            degree1 = 2 * Math.PI - Math.atan(-deltaY/deltaX);
        }

        const c = y - m*x;
        const obstacle = this.checkObstaclesInBetween(this.x, this.y, x, y, m, c)
        console.log(degree1,degree);
        // let l = degree-Math.PI*(1/4);
        // let r = degree+Math.PI*(1/4);
        if(degree-Math.PI*(1/4) < 0){
            // l = (degree-Math.PI*(1/4)) + 2*Math.PI;
            if(degree1 >= ((degree-Math.PI*(1/4)) + 2*Math.PI) && !obstacle) return true;
        }
        if(degree+Math.PI*(1/4) > 2*Math.PI){
            // r = degree+Math.PI*(1/4) - 2*Math.PI;
            if(degree1 <= (degree+Math.PI*(1/4) - 2*Math.PI) && !obstacle) return true;
        }
        if(degree1 >= degree-Math.PI*(1/4) && degree1 <= degree+Math.PI*(1/4) && !obstacle) return true;
        else return false;
    }

    checkObstaclesInBetween = (x,y,x1,y1,m,c)=>{
        // console.log(mapObstacles)
        for(let obstacle of this.mapObstacles){
            const xs = obstacle.x;
            const xe = xs + obstacle.width;
            const ys = obstacle.y;
            const ye = ys + obstacle.height;
            // console.log("x:=",x,x1,xs);
            let xpb = Math.min(x,x1)
            let xpe = Math.max(x,x1)
            let ypb = Math.min(y,y1)
            let ype = Math.max(y,y1)
            if(((xpb <= xs && xs <= xpe) || (xpb <= xe && xe <= xpe))){
                let yc = m*xs + c;
                let yc1 = m*xe + c;       
                // console.log("y=>",yc1,ys,ye)
                if((xpb <= xs && xs <= xpe && ys <= yc && yc <= ye) || (xpb <= xe && xe <= xpe && ys <= yc1 && yc1 <= ye)){
                    return true;
                }  
            }
            if(((ypb <= ys && ys <= ype) || (ypb <= ye && ye <= ype))){
                let xc = (ys-c)/m;
                let xc1 = (ye-c)/m;
                if((ypb <= ys && ys <= ype && xs <= xc && xc <= xe) || (ypb <= ye && ye <= ype && xs <= xc1 && xc1 <= xe)){
                    return true;
                }
            }
        }
        return false;
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