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
        this.spriteWidth = 213
        this.spriteHeight = 213
        this.flapSpeed = Math.floor(Math.random() * 4 + 2)
        this.width = this.spriteWidth*this.flapSpeed*0.1
        this.height = this.spriteHeight*this.flapSpeed*0.1
        this.x = Math.random() * (CANVAS_WIDTH - this.width)
        this.y = Math.random() * (CANVAS_HEIGHT- this.height)
        this.newx = Math.random() * (CANVAS_WIDTH - this.width)
        this.newy = Math.random() * (CANVAS_HEIGHT- this.height)
        this.frame = 0
        this.intervalMov = Math.floor(Math.random()*200)+50
    }
    update(gameFrame){
        if (gameFrame%this.intervalMov===0){
            this.newx = Math.random() * (CANVAS_WIDTH - this.width)
            this.newy = Math.random() * (CANVAS_HEIGHT- this.height)
        }
        const dx = this.x - this.newx
        const dy = this.y - this.newy
        this.x -= dx/100*this.speed
        this.y -= dy/100*this.speed
        if (gameFrame%this.flapSpeed===0){
            this.frame > 7 ? this.frame = 0 : this.frame++
        }
            
    }
    draw(ctx){
        ctx.drawImage(this.enemyImage,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
}

for (let i = 0; i < numberEnemies; ++i) {
    enemies.push(new Enemy("enemy4.png"))
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