var level, img, im2, img3, img4, doorImg, buttons, buttonImg;
var levels = []
var actualLevel = 0

function preload() {
  img = loadImage('img/respiratorio.png')
  img2 = loadImage('img/respiratorio.jpg')
  img3 = loadImage('img/neurona.png')
  img4 = loadImage('img/neurona.jpg')
  doorImg = loadImage('img/door.jpg')
  buttonImg = loadImage('img/button.png')
}

function setup() {
  createCanvas(1366, 768)
  windowResized()

  buttons = new Buttons(buttonImg, 1000, 600, 60, 50, ()=>{window['fullscreen'](window['fullscreen'])})

  let doors = new Doors(60, 100, doorImg, 'Hector JAJD JADRI JDFF EK', 100, 100, 70, 30)
  doors.add(200, 100, doorImg, 'Pedro', 100, 100)
  doors.add(500, 100, doorImg, 'Ramon', 100, 100)
  levels.push(new Level('¿Como te llamas?', doors, new Player(20,200, 3, 5, 60, 90, img, img3, img2, img4 ), buttons, 100, 300, 400, 40, 20))

  doors = new Doors(500, 100, doorImg, 'catorce', 100, 100)
  doors.add(200, 100, doorImg, 'trece', 100, 100)
  doors.add(60, 100, doorImg, 'doce', 100, 100, 70, 30)
  levels.push(new Level('¿Cuantos años?', doors, new Player(20,200, 3, 5, 60, 90, img, img3, img2, img4 ), buttons, 100, 300, 400, 40, 20))

  doors = new Doors(200, 100, doorImg, 'Verne', 100, 100)
  doors.add(500, 100, doorImg, 'Douglas', 100, 100)
  doors.add(60, 100, doorImg, 'Ernest', 100, 100, 70, 30)
  levels.push(new Level('¿Autor?', doors, new Player(20,200, 3, 5, 60, 90, img, img3, img2, img4 ),buttons, 100, 300, 400, 40, 20))

  level = levels[0]

}

function draw() {
  background('yellow')
  level.draw()
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if(level.iWin() != undefined){
      if(level.iWin()){
        if(actualLevel+1 === levels.length){
          window['draw'] = () => {background('green')}
        } else {
          actualLevel +=1
          level = levels[actualLevel]
          draw = () => {
            background('yellow')
            level.draw()
          }
        }
      } else {
        window['draw'] = () => {background('red')}
      }
    }
  }
}

function mouseClicked() {
  levels[actualLevel].actionButtons()
}