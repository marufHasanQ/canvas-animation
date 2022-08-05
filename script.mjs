//document.onload = () =>  setTimeout()

//setTimeout( () => console.log('ok'),4000);

document.onload = setTimeout(() => alert(`
\u2190 & \u2192 to change animation mode. 
[space] to pause the animation.
`),5000);
const canvas = document.getElementById("tutorial");
const context = canvas.getContext("2d");
context.globalAlpha = 0.5;

let particlesArray = [];
let color = '';
let pause = false;

let rotationSpeed = 0.0;
let frameCount = 0;

const cursor = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};


generateParticles(140);

setSize();
anim();

addEventListener(
    "keyup",
    (e) => {
        if(e.key === 'ArrowLeft')
            rotationSpeed -= 1;
        if(e.key === 'ArrowRight')
            rotationSpeed += 1;
        if(e.key === 'ArrowUp')
            rotationSpeed += .01;
        if(e.key === 'ArrowDown')
            rotationSpeed -= .01;
        if( e.key === ' ')
            pause = !pause;
        console.log(rotationSpeed);
    },
    { passive: false }
);

addEventListener("resize", () => setSize());

function generateParticles(amount) {
    for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
            innerWidth / 2,
            innerHeight/ 2,
            4,
            generateColor(),
            Math.random() * (innerWidth/5),
            0.2
        );
    }
}

function generateColor() {
    let hexSet = "0123456789ABCDEF";
    let finalHexString = "#";
    for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    }
    return finalHexString;
}

function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}

function Particle(x, y, particleTrailWidth, strokeColor,t, rotateSpeed) {
    this.x = x;
    this.y = y;
    this.particleTrailWidth = particleTrailWidth;
    this.strokeColor = strokeColor;
    this.theta = Math.random() * Math.PI * 2;
    this.rotateSpeed = rotateSpeed;
    this.t = t ;

    this.rotate = () => {
        const ls = {
            x: this.x,
            y: this.y,
        };

        this.theta = (this.theta +  rotationSpeed) ;
        this.t += 1;


        this.x = cursor.x + Math.cos(this.theta) * this.t;
        this.y = cursor.y + Math.sin(this.theta) * this.t;
        context.beginPath();
        context.lineWidth = this.particleTrailWidth;
        context.strokeStyle = this.strokeColor;
        context.moveTo(ls.x, ls.y);
        context.lineTo(this.x, this.y);
        context.stroke();

    };
}


function anim() {
    requestAnimationFrame(anim);

    frameCount += 1;

    if(pause || frameCount % 2 === 0
    ){
        if(frameCount > 50)
            frameCount = 0;

        return;
    }
    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if(new Date().getSeconds() % 4 === 0){

        color = generateColor();

    }


    particlesArray.forEach((particle) =>{

        // const outOfBoundParticle = particlesArray.find(v => v.t > innerWidth/5); 

        const outOfBoundParticle = particle.t > innerWidth/5 ? particle : false; 
        if(outOfBoundParticle){
            outOfBoundParticle.x = cursor.x;
            outOfBoundParticle.y = cursor.y;
            outOfBoundParticle.strokeColor = color;
            outOfBoundParticle.t = 2;
        }
        particle.rotate();
    })
}

