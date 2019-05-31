var level, img, im2, img3, img4, doorImg, buttons, buttonImg, gameover, winImg, nivel1, nivel2, nivel3, buttonRestart, victoriaBackground, introImg;
var levels = []
var actualLevel = 0
var gameStarted = false

function preload() {
  img = loadImage('img/personaje.png')
  img2 = img
  img3 = img
  img4 = img
  doorImg = loadImage('img/door.jpg')
  buttonImg = loadImage('img/button.png')
  gameover = loadImage('img/gameover.png')
  winImg = loadImage('img/victoria.png')
  nivel1 = loadImage('img/puerta1.jpg')
  nivel2 = loadImage('img/puerta2.jpg')
  nivel3 = loadImage('img/inframundo.jpg')
  victoriaBackground = loadImage('img/victoriaBackkground.jpg')
  introImg = victoriaBackground // Cambiar por verdadero background
}

function setup() {
  createCanvas(1366, 768)
  windowResized()

  buttonRestart = new Button(buttonImg, 300, 500, 40, 40, ()=>{actualLevel = 0})

  buttons = new Buttons(buttonImg, 1000, 600, 60, 50, ()=>{window['fullscreen'](window['fullscreen'])})

  let doors = new Doors(400, 300, doorImg, 'Hector', 150, 200)
  doors.add(700, 300, doorImg, 'Pedro', 150, 200)
  doors.add(1000, 300, doorImg, 'Ramon', 150, 200)
  levels.push(new Level(nivel1, '¿llamas?', doors, new Player(20, 500, 5, 5, 120, 170, img, img3, img2, img4), buttons, 50, 30, 1265, 60, 20))

  doors = new Doors(400, 300, doorImg, 'catorce', 150, 200)
  doors.add(700, 300, doorImg, 'trece', 150, 200)
  doors.add(1000, 300, doorImg, 'doce', 150, 200)
  levels.push(new Level(nivel2, '¿años?', doors, new Player(20, 500, 5, 5, 120, 170, img, img3, img2, img4), buttons, 50, 30, 1265, 60, 20))

  doors = new Doors(400, 300, doorImg, 'Verne', 150, 200)
  doors.add(700, 300, doorImg, 'Douglas', 150, 200)
  doors.add(1000, 300, doorImg, 'Ernest', 150, 200)
  levels.push(new Level(nivel3, '¿Autor?', doors, new Player(20, 500, 5, 5, 120, 170, img, img3, img2, img4),buttons, 50, 30, 1265, 60, 20))

  level = levels[0]

}

function draw() {
  if(gameStarted){
    level.draw()
  } else {
    image(introImg, 0, 0, width, height)
    if(mouseIsPressed){
      gameStarted = true
    }
  }
}

function keyPressed() {
  if(gameStarted){
    if (keyCode === UP_ARROW) {
      if(level.iWin() != undefined){
        if(level.iWin()){
          if(actualLevel+1 === levels.length){
            window['draw'] = () => {
              background('white')
              image(victoriaBackground, 0, 0, width, height)
              image(winImg, width/2-200, height/2-200, 400, 400)
            }
          } else {
            actualLevel +=1
            level = levels[actualLevel]
            draw = () => {
              level.draw()
            }
          }
        } else {
          window['draw'] = () => {
            background('white')
            image(gameover, width/2-200, height/2-200, 400, 400)
            buttonRestart.draw()
            if(mouseIsPressed){
              if(buttonRestart.imIn(mouseX, mouseY)){
                for(let i = 0; i < levels.length; i++){
                  levels[i].restart()
                }
                buttonRestart.action()
                level = levels[actualLevel]
                draw = () => {
                  level.draw()
                }
              }
            }
          }
        }
      }
    }
  }
}

function mouseClicked() {
  if(gameStarted){
    levels[actualLevel].actionButtons()
  }
  }