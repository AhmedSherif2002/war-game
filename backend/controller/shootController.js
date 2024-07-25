const canvasWidth = 4000;
const canvasHeight = 4100;
const radius = 30;
let mapObstacles = [  // map obstacles
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
// let playersHit = {};

// const initPlayersHit = (players)=>{
//     for(let player in players){
//         playersHit[player] = {}
//     }
// }

const shoot = (x, y, m, c, degree, players, shooter)=>{
    let xs,xe;
    let ys,ye; 
    // define the domain and the range of the line equation
    if(degree >= -Math.PI/2 && degree <= Math.PI/2){    // +ve x
        xs = x;
        xe = canvasWidth;
    }else{
        xs = 0;
        xe = x;
    }
    if(degree >= 0 && degree <= Math.PI){   // +ve y
        ys = y;
        ye = canvasHeight;
    }else{
        ys = 0;
        ye = y;
    }
    return checkIfPlayerIsHit(xs,xe,ys,ye,m,c,players, shooter); // return the players who were hit.
}

const checkIfPlayerIsHit = (xs,xe,ys,ye,m,c,players, shooter)=>{
    console.log("checking for hit")
    let x = players[shooter].position.x;
    let y = players[shooter].position.y;
    let playersHit = [];
    for(let player in players){
        if(player === shooter || players[player].team === players[shooter].team){ // no friendly fire
            console.log("friendly fire");
            continue
        }
        // console.log(player,players[player]);
        const xc = players[player].position.x;
        const yc = players[player].position.y;
        const c1 = c-yc;
        const a = 1+m**2;
        const b = 2*c1*m - 2*xc;
        const ceqn = xc**2 + c1**2 - radius**2;
        let t = b**2 - 4*a*ceqn;
        // console.log(t)
        if(t < 0) continue; // no hit
        const x1 = (-b + Math.sqrt(t))/(2*a);
        const x2 = (-b - Math.sqrt(t))/(2*a);
        // console.log(xs,xe,x2)
        if((xs <= x1 && x1 <= xe) || (xs <= x2 && x1 <= xe)){
            const y1 = m*x1 + c;
            const y2 = m*x2 + c;
            if((ys <= y1 && y1 <= ye) || (ys <= y2 && y2 <= ye)){
                let obstacleHit = checkObstaclesInBetween(x,y,xc,yc,m,c);
                if(!obstacleHit){
                    console.log("player is hit");
                    playersHit.push(player);
                }else{
                    console.log("player isn't hit but in the line of fire");
                }
            }
        }
    }
    return playersHit;
}

const checkObstaclesInBetween = (x,y,x1,y1,m,c)=>{
    // console.log(mapObstacles)
    for(let obstacle of mapObstacles){
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

module.exports = {
    shoot,
}