export default class Map{
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
    mapElements = [ // map elements
        {
            x: 100,
            y: 405,
            shape: "rectangle",
            width: 3800,
            height: 140,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 2900,
            y: 100,
            shape: "rectangle",
            width: 1000,
            height: 305,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 200,
            y: 465,
            shape: "rectangle",
            width: 120,
            height: 20,
            color : "white",
            repeat: 15,
            repeatDir: "x",
            distance: 100
        },
        {
            x: 3700,
            y: 250,
            shape: "circle",
            radius: 150,
            color: "rgb(50,50,50)",
            repeat: 0
        },
        {
            x: 3630,
            y: 175,
            shape: "rectangle",
            width: 30,
            height: 150,
            color: "yellow",
            repeat: 0,
        },
        {
            x: 3660,
            y: 235,
            shape: "rectangle",
            width: 80,
            height: 30,
            color: "yellow",
            repeat: 0,
        },
        {
            x: 3740,
            y: 175,
            shape: "rectangle",
            width: 30,
            height: 150,
            color: "yellow",
            repeat: 0,
        },
        {
            x: 3700,
            y: 250,
            shape: "arc",
            radius: 140,
            color: "yellow",
            repeat: 0
        },
        {
            x: 1160,
            y: 1000,
            shape: "rectangle",
            width: 140,
            height: 3040,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 1220,
            y: 1150,
            shape: "rectangle",
            width: 20,
            height: 120,
            color : "white",
            repeat: 12,
            repeatDir: "y",
            distance: 100
        },
        {
            x: 1300,
            y: 3300,
            shape: "rectangle",
            width: 2700,
            height: 140,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 1300,
            y: 3360,
            shape: "rectangle",
            width: 120,
            height: 20,
            color : "white",
            repeat: 11,
            repeatDir: "x",
            distance: 100
        },
        {
            x: 1900,
            y: 3650,
            shape: "rectangle",
            width: 1300,
            height: 200,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 1300,
            y: 3840,
            shape: "rectangle",
            width: 2700,
            height: 200,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 1300,
            y: 3930,
            shape: "rectangle",
            width: 120,
            height: 20,
            color : "white",
            repeat: 11,
            repeatDir: "x",
            distance: 100
        },
        {
            x: 1500,
            y: 3440,
            shape: "rectangle",
            width: 200,
            height: 400,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 1900,
            y: 3440,
            shape: "rectangle",
            width: 200,
            height: 400,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 2400,
            y: 3440,
            shape: "rectangle",
            width: 300,
            height: 400,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 3000,
            y: 3440,
            shape: "rectangle",
            width: 200,
            height: 400,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 3400,
            y: 3440,
            shape: "rectangle",
            width: 200,
            height: 400,
            color: "rgb(80,80,80)",
            repeat: 0
        },
        {
            x: 3800,
            y: 3440,
            shape: "rectangle",
            width: 200,
            height: 400,
            color: "rgb(80,80,80)",
            repeat: 0
        },
    ]
    constructor(scale,ctx){
        this.scale = scale
        this.ctx = ctx
    }

    render = (ctx,fighterImage,tank,rifle)=>{ // to render the map    
        // Make the map divs
        for(let i=0;i<this.mapObstacles.length;i++){
            ctx.fillStyle = "yellow";
            ctx.fillStyle = "#554840";
            ctx.fillStyle = "#98a163";
            ctx.fillStyle = "#659ACA";
            ctx.fillStyle = "brown";
            ctx.fillStyle = "#9A2A2A";
            ctx.fillStyle = "#4A0404";
            ctx.fillStyle = "#988558";
            ctx.globalAlpha = this.mapObstacles[i].alpha || 1
            ctx.shadowColor = "rgb(100,100,100)";
            ctx.shadowColor = "#696969";
            ctx.shadowOffsetX = 10*this.scale;
            ctx.shadowOffsetY = 10*this.scale;
            ctx.fillRect(this.mapObstacles[i].x,this.mapObstacles[i].y,this.mapObstacles[i].width,this.mapObstacles[i].height)
        }
        // Make map elements
        for(let i=0;i<this.mapElements.length;i++){
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0
            ctx.globalAlpha = 1
            if(this.mapElements[i].shape === "circle"){
                ctx.fillStyle = this.mapElements[i].color;
                ctx.beginPath()
                ctx.arc(this.mapElements[i].x,this.mapElements[i].y,this.mapElements[i].radius,0,2 * Math.PI);
                ctx.fill()
                let repeatValue = this.mapElements[i].repeat;
                while(repeatValue !== 0){
                    console.log(this.mapElements[i].repeat)
                    if(this.mapElements[i].repeatDir === "x"){
                        ctx.arc(this.mapElements[i].x,this.mapElements[i].y,this.mapElements[i].radius,0,2 * Math.PI);
                        ctx.fill()
                    }else{
                        ctx.arc(this.mapElements[i].x,this.mapElements[i].y,this.mapElements[i].radius,0,2 * Math.PI);
                        ctx.fill()
                    }
                    repeatValue--;
                }
            }else if(this.mapElements[i].shape === "rectangle"){
                ctx.fillStyle = this.mapElements[i].color;
                ctx.fillRect(this.mapElements[i].x,this.mapElements[i].y,this.mapElements[i].width,this.mapElements[i].height);
                let repeatValue = this.mapElements[i].repeat;
                while(repeatValue !== 0){
                    ctx.fillStyle = this.mapElements[i].color;
                    if(this.mapElements[i].repeatDir === "x"){
                        ctx.fillRect(this.mapElements[i].x+(this.mapElements[i].width+this.mapElements[i].distance)*repeatValue,this.mapElements[i].y,this.mapElements[i].width,this.mapElements[i].height)
                    }else{
                        ctx.fillRect(this.mapElements[i].x,this.mapElements[i].y+(this.mapElements[i].height+this.mapElements[i].distance)*repeatValue,this.mapElements[i].width,this.mapElements[i].height)
                    }
                    repeatValue--;
                }
            }
            else{
                ctx.strokeStyle = this.mapElements[i].color;
                ctx.lineWidth = "10"
                ctx.beginPath();
                ctx.arc(this.mapElements[i].x, this.mapElements[i].y, this.mapElements[i].radius, 0, 2*Math.PI)
                ctx.stroke();
                let repeatValue = this.mapElements[i].repeat;
                while(repeatValue !== 0){
                    console.log(this.mapElements[i].repeat)
                    if(this.mapElements[i].repeatDir === "x"){
                        // ctx.fillRect(this.mapElements[i].x+(this.mapElements[i].width+this.mapElements[i].distance)*repeatValue,this.mapElements[i].y,this.mapElements[i].width,this.mapElements[i].height)
                    }else{
                        // ctx.fillRect(this.mapElements[i].x,this.mapElements[i].y+(this.mapElements[i].height+this.mapElements[i].distance)*repeatValue,this.mapElements[i].width,this.mapElements[i].height)
                    }
                    repeatValue--;
                }
            }
        }
    
        // Add Images
        ctx.drawImage(fighterImage,3200,150,270,210)
        ctx.drawImage(fighterImage,2950,150,270,210)
        ctx.drawImage(tank,2740,3650,240,180)
        ctx.drawImage(tank,2140,3650,240,180)
    }
}