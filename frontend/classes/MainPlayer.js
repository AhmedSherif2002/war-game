// import BulletsController from "./BulletsController";
import Bullet from "./Bullet.mjs";

export default class MainPlayer{
    keys = []
    degree = 0;
    shoot = false
    aim = false
    visualAngle = 60;
    visualOpacity = 0.1
    isHitByObstacle = { // obstacle hitting
        "left": false,
        "right": false,
        "above": false,
        "below": false
    } 
    left = 0;
    top = 0
    shootingInterval
    constructor(id,x,y,canvas,obstacles,scale,ctx,bulletsController,socket){
        this.x = x*scale;
        this.y = y*scale;
        this.id = id
        this.speed = 8;
        this.radius = 30;
        this.canvas = canvas
        this.scale = scale
        this.mapObstacles = obstacles
        this.bulletsController = bulletsController
        this.listenForEvents()
        this.socket = socket
        console.log(canvas.width)
    }

    isHitObstacle(){
        this.isHitByObstacle = { // obstacle hitting
            "left": false,
            "right": false,
            "above": false,
            "below": false
        } 
        // check if player hits obstacles 
        const canvasX = this.canvas.getBoundingClientRect().x
        const canvasY = this.canvas.getBoundingClientRect().y
        for(let i=0;i<this.mapObstacles.length;i++){
            const obstacle = this.mapObstacles[i];
            const obstacleX = canvasX + obstacle.x;
            const obstacleY = canvasY + obstacle.y;
            const playerX = canvasX + this.x;
            const playerY = canvasY + this.y;
            if(obstacle.alpha) continue;
            if(
                playerX+this.radius >= obstacleX 
                && playerX-this.radius <= obstacleX+obstacle.width 
                && playerY+this.radius >= obstacleY 
                && playerY-this.radius <= obstacleY+obstacle.height
            ){
                if(playerX < obstacleX){ // hit from left
                    if(playerY >= obstacleY + obstacle.height){
                        this.isHitByObstacle["below"] = true;
                    }else if(playerY < obstacleY){
                        this.isHitByObstacle["above"] = true;
                    }
                    this.isHitByObstacle["left"] = true;
                }
                else if(playerX >= obstacleX + obstacle.width){ // hit from right
                    if(playerY >= obstacleY + obstacle.height){
                        this.isHitByObstacle["below"] = true;
                    }else if(playerY < obstacleY){
                        this.isHitByObstacle["above"] = true;
                    }
                    this.isHitByObstacle["right"] = true;
                }
                else if(playerY < obstacleY){ // hit from above
                    this.isHitByObstacle["above"] = true;
                }
                else if(playerY >= obstacleY + obstacle.height){ // hit from below
                    this.isHitByObstacle["below"] = true;
                }
            }
        }
    }

    move(ctx){
        // this.x = x
        // this.y = y
        this.isHitObstacle()
        if(this.keys['w'] == true && this.keys['d'] == true && !this.isHitByObstacle["left"] && !this.isHitByObstacle["below"] && !(this.y-this.radius <= 0) && !(this.x+this.radius >= this.canvas.width*this.scale)){
            this.x += Math.sqrt((this.speed**2)/2);
            this.y -= Math.sqrt((this.speed**2)/2);
            this.left += -Math.sqrt((this.speed**2)/2);
            this.top += Math.sqrt((this.speed**2)/2)
        }else if(this.keys['w'] == true && this.keys['a'] == true && !this.isHitByObstacle["right"] && !this.isHitByObstacle["below"] && !(this.x-this.radius <= 0) && !(this.y-this.radius <= 0)){
            this.x -= Math.sqrt((this.speed**2)/2);
            this.y -= Math.sqrt((this.speed**2)/2);
            this.left += Math.sqrt((this.speed**2)/2)
            this.top += Math.sqrt((this.speed**2)/2)
        }else if(this.keys['s'] == true && this.keys['d'] == true && !this.isHitByObstacle["left"] && !this.isHitByObstacle["above"] && !(this.x+this.radius >= this.canvas.width*this.scale) && !(this.y+this.radius >= this.canvas.height*this.scale)){
            this.x += Math.sqrt((this.speed**2)/2);
            this.y += Math.sqrt((this.speed**2)/2);
            this.left += -Math.sqrt((this.speed**2)/2);
            this.top += -Math.sqrt((this.speed**2)/2);
        }else if(this.keys['s'] == true && this.keys['a'] == true && !this.isHitByObstacle["right"] && !this.isHitByObstacle["above"] && !(this.x-this.radius <= 0) && !(this.y+this.radius >= this.canvas.height*this.scale)){
            this.x -= Math.sqrt((this.speed**2)/2);
            this.y += Math.sqrt((this.speed**2)/2);
            this.left += Math.sqrt((this.speed**2)/2);
            this.top += -Math.sqrt((this.speed**2)/2);
        }
        else if(this.keys['w'] == true && !this.isHitByObstacle["below"] && !(this.y-this.radius <= 0)){
            this.y -= this.speed
            this.top += this.speed;
        } 
        else if(this.keys['d'] == true && !this.isHitByObstacle["left"] && !(this.x+this.radius >= this.canvas.width*this.scale)){
            this.x += this.speed
            this.left += -this.speed;
        }
        else if(this.keys['s'] == true && !this.isHitByObstacle["above"] && !(this.y+this.radius >= this.canvas.height*this.scale)){
            this.y += this.speed
            this.top += -this.speed;
        } 
        else if(this.keys['a'] == true && !this.isHitByObstacle["right"] && !(this.x-this.radius <= 0)){
            this.x -= this.speed
            this.left += this.speed;
        } 
        this.draw(ctx)
        // console.log(this.canvas)
        this.canvas.style.left = `${this.left}px`;
        this.canvas.style.top = `${this.top}px`;
    }

    draw(ctx){
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2 * Math.PI);
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
        ctx.lineWidth = 10
        ctx.rotate(this.degree)
        // ctx.rotate(0)
        ctx.moveTo(0, 0);
        ctx.lineTo(80, 0);
        ctx.stroke()
        ctx.closePath()
        // draw visual range
        ctx.beginPath()
        ctx.strokeStyle = "red"
        ctx.fillStyle = "rgb(231,169,176)"
        ctx.globalAlpha = this.visualOpacity
        ctx.lineWidth = 0.6
        ctx.moveTo(0,0)
        ctx.lineTo(900,900*Math.tan(this.visualAngle*Math.PI/180))
        // ctx.moveTo(0,0)
        ctx.lineTo(900,900*Math.tan(-this.visualAngle*Math.PI/180))
        ctx.lineTo(0,0)
        ctx.stroke()
        ctx.fill()
        ctx.restore()
    }

    listenForEvents(){
        // Detect button press
        document.addEventListener("keydown",(e)=>{
            if(e.key == "w" || e.key == "d" || e.key == "s" || e.key == "a"){
                this.keys[e.key] = true
                // if(shoot){
                //     clearInterval(shootingInterval);
                //     shootingInterval = setInterval(shootingHandle,10);
                // }
            }
        })

        // Detect button release
        document.addEventListener("keyup",(e)=>{
            if(e.key == "w" || e.key == "d" || e.key == "s" || e.key == "a"){
                this.keys[e.key] = false
            }
        })

        // Detect mouse move
        canvas.addEventListener("mousemove",(e)=>{
            const canvasX = this.canvas.getBoundingClientRect().x
            const canvasY = this.canvas.getBoundingClientRect().y
            const mouseX = e.clientX
            const mouseY = e.clientY
            const relativeX = mouseX - canvasX;
            const relativeY = mouseY - canvasY;
            const deltaX = relativeX - this.x;
            const deltaY = relativeY - this.y;
            if(deltaX >= 0)
                this.degree = Math.atan(deltaY/deltaX)
            else 
                this.degree = Math.atan(deltaY/deltaX) + Math.PI 
        })

        //detect mousedown (shoot)
        this.canvas.oncontextmenu = (e)=> e.preventDefault()
        document.addEventListener("mousedown",(e)=>{
            console.log("aa")
            if(e.button === 0){
                this.shoot = true;
                this.speed = 5;
                // this.shoot()
                this.shootingInterval = setInterval(()=>this.bulletsController.shoot(this.x,this.y,this.degree),10);
            }else{
                this.aim =true
                this.speed = 5;
                this.visualAngle = 2
                this.visualOpacity = 0.4
            }
        })

        // Detect mouseup (stop shooting)
        document.addEventListener("mouseup",(e)=>{
            this.speed = 8;
            if(e.button === 0){
                this.shoot = false
                console.log("stop")
                clearInterval(this.shootingInterval)
            }else{
                this.aim = false
                this.visualAngle = 60
                this.visualOpacity = 0.1
            }
        })

        // // Detect mouse click (To Shoot)
        // this.canvas.oncontextmenu = (e)=> e.preventDefault()
        // this.canvas.addEventListener("mousedown",(e)=>{
        //     if(e.button === 0){
        //         shoot = true
        //         shootingInterval = setInterval(shootingHandle,10);
        //         console.log("shoot")
        //     }
        //     else{
        //         // aim = true
        //         console.log("aim")
        //     }
        //     this.speed = 5
        // })

        // // Detect mouseup (To stop shooting)
        // document.addEventListener("mouseup",(e)=>{
        //     shoot = false
        //     // aim = false
        //     this.speed = 8;
        //     console.log("stop")
        //     clearInterval(shootingInterval)
        // })
    }

}