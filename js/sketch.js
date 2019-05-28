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

  let doors = new Doors(60, 100, doorImg, 'Hector JAJD JADRI JDFF EK', 100, 100, 70, 30)
  doors.add(200, 100, doorImg, 'Pedro', 100, 100)
  doors.add(500, 100, doorImg, 'Ramon', 100, 100)
  levels.push(new Level(nivel1, '¿Como te llamas?', doors, new Player(20,200, 3, 5, 60, 90, img, img3, img2, img4 ), buttons, 100, 300, 400, 40, 20))

  doors = new Doors(500, 100, doorImg, 'catorce', 100, 100)
  doors.add(200, 100, doorImg, 'trece', 100, 100)
  doors.add(60, 100, doorImg, 'doce', 100, 100, 70, 30)
  levels.push(new Level(nivel2, '¿Cuantos años?', doors, new Player(20,200, 3, 5, 60, 90, img, img3, img2, img4 ), buttons, 100, 300, 400, 40, 20))

  doors = new Doors(200, 100, doorImg, 'Verne', 100, 100)
  doors.add(500, 100, doorImg, 'Douglas', 100, 100)
  doors.add(60, 100, doorImg, 'Ernest', 100, 100, 70, 30)
  levels.push(new Level(nivel3, '¿Autor?', doors, new Player(20,200, 3, 5, 60, 90, img, img3, img2, img4 ),buttons, 100, 300, 400, 40, 20))

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