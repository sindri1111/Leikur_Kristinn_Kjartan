const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 650
canvas.height = 700


// Hér ætlum við að láta þyngdaraflið líkja eftir eðleilegur hreifingum á karakterunum.
const gravity = 0.5

// Hér búum við til klasa sem býr til karakter í leiknum. 
class Player {
    constructor() {
        this.position = {
            x:10,
            y:540
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 40
    }

    // Fall sem teiknar karakterinn
    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, 
            this.width, this.height)
    }

    // Fall sem uppfærir karakterinn reglulega
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        if (this.position.y + this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

// class Enemies {
//     constructor( {x, y} ) {
//         this.position = {
//             x,
//             y
//         }
//         this.velocity = {
//             x: 0,
//             y: 0
//         }
//         this.width = 30
//         this.height = 40
//     }

//     // Fall sem teiknar karakterinn
//     draw() {
//         ctx.fillStyle = 'red'
//         ctx.fillRect(this.position.x, this.position.y, 
//             this.width, this.height)
//     }

//     update() {
//         this.draw()
//         this.position.x += this.velocity.x
//         this.position.y += this.velocity.y


//         if (this.position.y + this.height +
//             this.velocity.y <= canvas.height)
//             this.velocity.y += gravity
//     }
// }

class Platform {
    constructor( {x, y, image} ) {
        this.position = {
            x,
            y
        }
        this.width = image.width;
        this.height = image.height;   
        this.image = image;     
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

let image = {

    btmLvlLeft: "img/bottom-level-left.png",
    btmLvlRight: "img/bottom-level-right.png",
    lvlTwoLeft: "img/level-two-left.png",
    lvlTwoRight: "img/level-two-right-floor.png",
    lvlThree: "img/level-three.png",
    lvlFour: "img/level-four.png",
    lvlFive: "img/level-five.png",
    lvlSix: "img/level-six.png",
    topLvl: "img/top-level-floor.png",
    stairs: "img/stairs.png",
    skyTwo: "img/sky-2.png",
    skyOne: "img/sky-1.png",
    scoreBoard: "img/score-board.png",
    door: "img/door.png"
    };


let player = new Player()
// let enemies = [
//     new Enemies( {x: 200, y: 100} ),
//     new Enemies( {x: 40, y: 400} )

// ]
let platforms = [
    new Platform( {x: 400, y: 750, image: createImage(btmLvlLeft) }),
    new Platform( {x: 0, y: 600, image: createImage(btmLvlRight) }),
    new Platform( {x: 250, y: 750, lvlTwoLeft }),
    new Platform( {x: 350, y: 600, lvlTwoRight }),
    new Platform( {x: 400, y: 450, lvlThree }),
    new Platform( {x: 200, y: 350, lvlFour }),
    new Platform( {x: 0, y: 250, lvlFive }),
    new Platform( {x: 400, y: 250, lvlSix }),
    new Platform( {x: -40, y: 450, topLvl }),
    new Platform( {x: 400, y: 100, stairs }),
    new Platform( {x: 0, y: 150, score })

    ]

const keys = {
    right:{
        pressed: false
    }, 
    left:{
        pressed: false
    }
}

function Init() {

player = new Player()

// enemies = [
//     new Enemies( {x: 200, y: 100} ),
//     new Enemies( {x: 40, y: 400} )
// ]

}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    platforms.forEach((platform) => {
        platform.draw()      
    })

    // enemies.forEach((enemies) => {
    //     enemies.update()      
    // })
    player.update()
    // enemies.update()
    

    // ef ýtt er á hægri takka og leikmaður á x ás er minni en 620px þá 
    // færist hann áfram um 5 oh hins vegar ef ýtt er á vinstri takka og leikmaður er 
    // staðsetttur á yfir 0px fer hann í hina áttina um sama bil. annars fer leikmaður
    // ekki lengra.
    if (keys.right.pressed && player.position.x < 620) {
        player.velocity.x = 5
    }   else if (keys.left.pressed && player.position.x > 0) {
        player.velocity.x = -5
    }   else player.velocity.x = 0 

    // fall sem lætur karakterinn okkar stoppa um leið og hann snertir flöt á platformi
    platforms.forEach((platform) => {
    if (player.position.y + player.height <= 
        platform.position.y && player.position.y + 
        player.height + player.velocity.y >= 
        platform.position.y && player.position.x + player.width >=
        platform.position.x && player.position.x <=
        platform.position.x + platform.width) 
        {
        player.velocity.y = 0
        }
    })
    // enemies.forEach((enemies) => {
    //     if (enemies.position.y + enemies.height <= 
    //         platform.position.y && enemies.position.y + 
    //         enemies.height + enemies.velocity.y >= 
    //         platform.position.y && enemies.position.x + enemies.width >=
    //         platform.position.x && enemies.position.x <=
    //         platform.position.x + platform.width) 
    //         {
    //         enemies.velocity.y = 0
    //         }
    //     })

// Hérna erum við að segja leiknum okkar að byrja upp á nýtt ef 
// leikmaður nær ekki að stökkva yfir bil og deyr. Notum þá init. 
if (player.position.y > canvas.height) {
    Init()
}
}
animate() 

// aðgerðir þegar við ýtum á valda takka á lyklaborðinu
addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65: case 37:
            console.log('left')
            keys.left.pressed = true
            break
        
        case 83: case 40:
            console.log('down')
            break

        case 68: case 39:
            console.log('right')
            keys.right.pressed = true
            break

        case 87: case 32:
            console.log('up')
            player.velocity.y -= 7.5
            break
    }
})

// aðgerðir þegar við sleppum völdum tökkum á lyklaborðinu
addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65: case 37:
            console.log('left')
            keys.left.pressed = false
            break
        
        case 83: case 40:
            console.log('down')
            break

        case 68: case 39:
            console.log('right')
            keys.right.pressed = false
            break

        case 87: case 32:
            console.log('up')
            break
    }
})
