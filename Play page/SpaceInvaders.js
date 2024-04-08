const Score = document.querySelector('#Score')
const canvas = document.querySelector('canvas')
const c =canvas.getContext('2d')

console.log(Score)

canvas.width =innerWidth
canvas.height =innerHeight

//create the spaceship
class Player{
    constructor() {
        this.position = {
            x: canvas.width /5 - this.width /5, 
            y: canvas.width /2 - this.width /2,
        }

        this.velocity = {
            x:0,
            y:0
        }

        this.rotaion = 0
        this.opacity =1

        const image = new Image()
        image.src='./cartoon-space-shuttle-and-booster-vector-27310109-removebg-preview.png'
        image.onload = () => {
            const scale = 0.2
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width /2 - this.width /2, 
                y: canvas.height -this.height -20
            }
    
        }  
    }

    draw() {
        //c.fillStyle ='red'
        //c.fillRect (this.position.x, this.position.y, this.width, this.height)
        
        c.save()

        c.drawImage (
            this.image, 
            this.position.x, 
            this.position.y,
            this.width, 
            this.height, 
        )
    }
    
    update(){
        if(this.image) {
        this.draw()
        this.position.x += this.velocity.x
        }
    }
}

//create bulets
class projectile{
    constructor({position, velocity}){
        this.position =position
        this.velocity= velocity

        this.radius =4
    }

    draw(){
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'red'
    c.fill()
    c.closePath()

    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class praticale{
    constructor({position, velocity, radius, color}){
        this.position =position
        this.velocity= velocity

        this.radius = radius
        this.color = color
        this.opacity =1 
    }

    draw(){
    c.save()   
    c.globalAlpha = this.opacity 
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.opacity -= 0.01
    }
}


class Invaderprojectile{
    constructor({position, velocity}){
        this.position =position
        this.velocity= velocity

       this.width=3
       this.height=10
    }

    draw(){
    c.fillStyle='white' 
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

//create enymyies
class Invader{
    constructor({position}) {
        this.position = {
            x: canvas.width /2 - this.width /2, 
            y: canvas.width /2 - this.width /2,
        }

        this.velocity = {
            x:0,
            y:0
        }

        const image = new Image()
        image.src='./inveders.png'
        image.onload = () => {
            const scale = 0.065
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
            }
    
        }  
    }

    draw() {
        //c.fillStyle ='red'
        //c.fillRect (this.position.x, this.position.y, this.width, this.height)
        
        c.drawImage (
            this.image, 
            this.position.x, 
            this.position.y,
            this.width, 
            this.height, 
        )
    }
    
    update({velocity}){
        if(this.image) {
        this.draw()
        this.position.x += velocity.x
        this.position.y += velocity.y
        }

    }

    shoot(Invaderprojectiles){
        Invaderprojectiles.push(new Invaderprojectile({
            position:{
                x:this.position.x+ this.width/2,
                y:this.position.y+ this.height
            },
            velocity:{
                x:0,
                y:5
            }
        }))
    }
}

class Grid{
    constructor(){
        this.position={
            x:0,
            y:0
        }

        this.velocity = this.velocity = {
            x:3,
            y:0
        }

        this.invaders=[]

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 30

        for(let i = 0; i < columns; i++){ 
        for(let y = 0; y < rows; y++){    
            this.invaders.push (new Invader ({position: {
                x:i * 30,
                y:y * 30
            }}))
        }
    } 
        console.log(this.invaders)
        }

        update() {
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            this.velocity.y =0

            if (this.position.x + this.width >= canvas.width || this.position.x<=0) {
                this.velocity.x = -this.velocity.x
                this.velocity.y = 30               
            }
        }       
    }
const player =new Player()
const projectiles =[]
const grids =[new Grid()]
const invaderprojectiles=[]
const praticales=[]
const keys ={
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
} 

let frames= 0
let randomintervel = Math.floor(Math.random() * 500 + 500)
let game = {
    over:false,
    active:false
}

let score =0
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle= 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    praticales.forEach((praticale, i) => {
        if (praticale.opacity <= 0) {

            setTimeout(() => {
                praticales.splice(i, 1) 
            }, 0); 
        }else{
            praticale.update()
        }
    })
    invaderprojectiles.forEach((Invaderprojectile, index) => { 

        if (Invaderprojectile.position.y + Invaderprojectile.
            height >= canvas.height) {
            setTimeout(() => {
                invaderprojectiles.splice(index, 1)
            }, 0);
        } else Invaderprojectile.update()

        if (Invaderprojectile.position.y + Invaderprojectile.height
            >= player.position.y && Invaderprojectile.position.x +Invaderprojectile.width >= player.position.x
            && Invaderprojectile.position.x <= player.position.x + player.width) 
            
            {
            console.log('you loose')

            setTimeout(() => {
                invaderprojectiles.splice(index,1)
                player.opacity =0
                game.over=true
            }, 0);


        }
    })

    projectiles.forEach ((projectile, index ) => {
      if (projectile.position.y + projectile.radius <= 0) {
        setTimeout(() => {
            projectiles.splice(index,1)
        }, 0);
      }else { projectile.update() 
      }    
    });

    grids.forEach ((grid, gridIndex) =>{
        grid.update()
          //spaw projectiles
    if (frames % 100 === 0 && grid.invaders.length > 0) {
        grid.invaders[ Math.floor(Math.random() *grid.invaders.
            length)].shoot(
                invaderprojectiles)
    }

        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity})

            //projectile hit the enymyies
            projectiles.forEach((projectile,j) =>{
                if(projectile.position.y - projectile.radius <= 
                    invader.position.y + invader.height && 
                    projectile.position.x + projectile.radius >= invader.position.x && projectile.position.x - 
                    projectile.radius <= invader.position.x + invader.width&& projectile.position.y+projectile.radius >= 
                    invader.position.y ){
                    
                     setTimeout(()=>{
                        const invaderFound = grid.invaders.find((invader2) =>invader2 === invader)
                        const projectileFound = projectiles.find((projectile2) =>projectile2 ===projectile)

                        if (invaderFound && projectileFound) {
                           
                            score += 100
                            Score.innerHTML = score
                            console.log(score)
                            praticales.push(new praticale({
                                position:{
                                    x:invader.position.x + invader.width/2,
                                    y:invader.position.y + invader.height/2
                                },
                                velocity:{
                                    x: (Math.random() - 0.5) * 2,
                                    y: (Math.random() -0.5) * 2
                                },
                                radius: Math.random() * 3,
                                color:'Green'
                        }))
                        grid.invaders.splice(i,1)
                        projectiles.splice(j,1)
                    }  
                        if (grid.invaders.length > 0) {
                            const firstInvader = grid.invaders[0]
                            const lastInvader = grid.invaders[grid.invaders.length - 1]

                            grid.width = lastInvader.position.x -firstInvader.position.x + lastInvader.width
                            grid.position.x =firstInvader.position.x
                        } 
                        else{
                            grids.splice(gridIndex, 1)
                        }    
                    
                    },0)
                }
            })
        })
    })

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x =-7  
    }
    else if(keys.d.pressed && player.position.x + player.width <= canvas.width){
        player.velocity.x = 7
    }
    else{
        player.velocity.x =0  
    }


    //spawing enymyies
    if (frames % randomintervel === 0) {
        grids.push(new Grid ())
        randomintervel = Math.floor(Math.random() * 500 + 500)
        console.log(randomintervel)
    }
     
  
    frames ++
}

animate()

addEventListener ('keydown', ({key}) => {
    switch (key) {
        case 'a':
            //console.log('left')
            keys.a.pressed=true
            break;
        case 'd':
            //console.log('right')
            keys.d.pressed=true
            break;
        case ' ':
            //console.log('space')
            projectiles.push(new projectile({
                position:{
                    x:player.position.x + player.width/2,
                    y:player.position.y
                },
                velocity:{
                    x:0,
                    y:-10
                }
            }))

            //console.log(projectiles)
            break;   
    }
})

addEventListener ('keyup', ({key}) => {
    switch (key) {
        case 'a':
            //console.log('left')
            keys.a.pressed=false
            break;
        case 'd':
            //console.log('right')
            keys.d.pressed=false
            break;
        case ' ':
           //console.log('space')
            break;   
    }
})