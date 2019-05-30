var level, img, im2, img3, img4, doorImg, buttons, buttonImg, gameover, winImg, nivel1, nivel2, nivel3;
var levels = []
var actualLevel = 0

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
}

function setup() {
  createCanvas(1366, 768)
  windowResized()

  buttons = new Buttons(buttonImg, 1000, 600, 60, 50, ()=>{window['fullscreen'](window['fullscreen'])})

  let doors = new Doors(400, 370, doorImg, 'Hector', 150, 130)
  doors.add(700, 370, doorImg, 'Pedro', 150, 130)
  doors.add(1000, 370, doorImg, 'Ramon', 150, 130)
  levels.push(new Level(nivel1, '¿llamas?', doors, new Player(20, 500, 5, 5, 120, 170, img, img3, img2, img4), buttons, 100, 300, 400, 40, 20))

  doors = new Doors(400, 370, doorImg, 'catorce', 100, 100)
  doors.add(700, 370, doorImg, 'trece', 150, 130)
  doors.add(1000, 370, doorImg, 'doce', 150, 130, 70, 30)
  levels.push(new Level(nivel2, '¿años?', doors, new Player(20, 500, 5, 5, 120, 170, img, img3, img2, img4), buttons, 100, 300, 400, 40, 20))

  doors = new Doors(400, 370, doorImg, 'Verne', 150, 130)
  doors.add(700, 370, doorImg, 'Douglas', 150, 130)
  doors.add(1000, 370, doorImg, 'Ernest', 150, 130, 70, 30)
  levels.push(new Level(nivel3, '¿Autor?', doors, new Player(20, 500, 5, 5, 120, 170, img, img3, img2, img4),buttons, 100, 300, 400, 40, 20))

  level = levels[0]

}

function draw() {
  level.draw()
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if(level.iWin() != undefined){
      if(level.iWin()){
        if(actualLevel+1 === levels.length){
          window['draw'] = () => {
            background('white')
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

        }
      }
    }
  }
}

function mouseClicked() {
  levels[actualLevel].actionButtons()
}