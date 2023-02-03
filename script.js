const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = canvas.width = 1000
const CANVAS_HEIGHT = canvas.height = 1000

const enemies = []
const numberEnemies = 100

let gameFrame = 0

class Enemy{
    constructor(imageSrc){
        this.enemyImage = new Image()
        this.enemyImage.src = imageSrc
        this.speed = (Math.random()*4+1)
        this.spriteWidth = 266
        this.spriteHeight = 188
        this.flapSpeed = Math.floor(Math.random() * 4 + 2)
        this.width = this.spriteWidth*this.flapSpeed*0.1
        this.height = this.spriteHeight*this.flapSpeed*0.1
        this.x = Math.random() * (CANVAS_WIDTH - this.width)
        this.y = Math.random() * (CANVAS_HEIGHT- this.height)
        this.Y = this.y
        this.frame = 0
        this.angle = Math.random()*Math.PI
        this.angleSpeed = Math.random()*0.2-0.1
    }
    update(gameFrame){
        this.x -= this.speed
        this.y = Math.sin(this.angle)*100+this.Y
        this.angle+=this.angleSpeed
        if (this.x<-this.width) this.x = CANVAS_WIDTH
        if (gameFrame%this.flapSpeed===0){
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
            
    }
    draw(ctx){
        ctx.drawImage(this.enemyImage,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
}

for (let i = 0; i < numberEnemies; ++i) {
    enemies.push(new Enemy("enemy2.png"))
}

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    enemies.forEach(enemy => {
        enemy.update(gameFrame)
        enemy.draw(ctx)
    })
    gameFrame++
    requestAnimationFrame(animate)
}
animate()