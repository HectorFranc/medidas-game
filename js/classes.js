class Door {
    constructor(x, y, img, msj, width, height, heightMsj = 70, msjTextSize = 15) {
        this.x = x
        this.y = y
        this.img = img
        this.msj = msj
        this.width = width
        this.height = height
        this.heightMsj = heightMsj
        this.msjTextSize = msjTextSize
    }

    imIn(x, width) {
        return x > this.x - 15 && x + width < this.x + 15 + this.width
    }
    draw() {
        textSize(this.msjTextSize)
        rect(this.x, this.y - this.heightMsj, this.width, this.heightMsj)
        textAlign(CENTER, TOP)
        text(this.msj, this.x, this.y - this.heightMsj, this.width, this.heightMsj)
        image(this.img, this.x, this.y, this.width, this.height)
    }
}

class Doors {
    constructor(x, y, img, msj, width, height, heightMsj = 70, msjTextSize = 15) {
        this.xPositions = [x]
        this.yPosition = y
        this.size = createVector(width, height)
        let door = new Door(x, this.yPosition, img, msj, width, height, heightMsj, msjTextSize)
        door.imWinner = true
        this.doors = [door]
    }
    add(x, img, msj, heightMsj = 70, msjTextSize = 15) {
        this.xPositions.push(x)
        let temporalXPositions = this.xPositions.slice(0, this.xPositions.length)
        temporalXPositions.sort(() => Math.random() - 0.5)
        this.doors.push(new Door(x, this.yPosition, img, msj, this.size.x, this.size.y, heightMsj, msjTextSize))
        for (var i = 0; i < this.doors.length; i++) {
            this.doors[i].x = temporalXPositions.pop()
        }
    }
    draw() {
        for (let i = 0; i < this.doors.length; i++) {
            this.doors[i].draw()
        }
    }
    imIn(x, width) {
        let result = []
        for (let i = 0; i < this.doors.length; i++) {
            if (this.doors[i].imIn(x, width)) {
                result.push(this.doors[i])
            }
        }
        return result
    }
}

class Player {
    constructor(x, y, velocity, changeImgVelocity, playerWidth, playerHeight, imgRight, imgLeft, imgRightSecond, imgLeftSecond) {
        this.position = createVector(x, y)
        this.originalPosition = createVector(x, y)
        this.velocity = velocity
        this.changeImgVelocity = changeImgVelocity
        this.playerWidth = playerWidth
        this.playerHeight = playerHeight
        this.imgRight = imgRight
        this.imgLeft = imgLeft
        this.imgRightSecond = imgRightSecond
        this.imgLeftSecond = imgLeftSecond
        this.lastImage = 'Right'
        this.imgCounter = 0
    }
    move(direction) {
        if (direction === 'right') {
            if (this.position.x < width - this.playerWidth) {
                this.position.add(this.velocity)
            }
            this.draw(direction)
        } else {
            if (this.position.x > 0) {
                this.position.sub(this.velocity)
            }
            this.draw(direction)
        }
    }
    restart() {
        this.position = this.originalPosition
    }
    draw(direction) {
        if (direction) {
            if (this.lastImage.slice(0, 1).toLowerCase() != direction.slice(0, 1)) {
                if (direction === 'right') {
                    this.lastImage = 'Right'
                } else {
                    this.lastImage = 'Left'
                }
                this.imgCounter = 0
            } else {
                if (this.imgCounter % this.changeImgVelocity === 0) {
                    if (direction === 'right') {
                        this.lastImage = this.lastImage === 'Right' ? 'RightSecond' : 'Right'
                    } else {
                        this.lastImage = this.lastImage === 'Left' ? 'LeftSecond' : 'Left'
                    }
                }
            }
            this.imgCounter += 1
        }
        image(this['img' + this.lastImage], this.position.x, this.position.y, this.playerWidth, this.playerHeight)
    }
}

class Level {
    constructor(backgroundImg, question, doors, xPlayer, velocityPlayer, changeImgVelocityPlayer, playerWidth, playerHeight, imgRightPlayer, imgLeftPlayer, imgRightSecondPlayer, imgLeftSecondPlayer, buttons, questionX, questionY, questionWidth, heightQuestion = 40, questionTextSize = 15) {
        this.question = question
        this.backgroundImg = backgroundImg
        this.doors = doors
        this.player = new Player(xPlayer, this.doors.yPosition + this.doors.size.y - playerHeight, velocityPlayer, changeImgVelocityPlayer, playerWidth, playerHeight, imgRightPlayer, imgLeftPlayer, imgRightSecondPlayer, imgLeftSecondPlayer)
        this.buttons = buttons
        this.questionX = questionX
        this.questionY = questionY
        this.questionWidth = questionWidth
        this.heightQuestion = heightQuestion
        this.questionTextSize = questionTextSize
    }
    draw() {
        image(this.backgroundImg, 0, 0, width, height)
        textSize(this.questionTextSize)
        rect(this.questionX, this.questionY, this.questionWidth, this.heightQuestion)
        textAlign(CENTER, TOP)
        text(this.question, this.questionX, this.questionY, this.questionWidth, this.heightQuestion)
        this.doors.draw()
        if (keyIsPressed) {
            if (keyIsDown(37) || keyIsDown(39)) {
                if (keyIsDown(39)) {
                    this.player.move('right')
                } else {
                    this.player.move('left')
                }
            } else {
                this.player.draw()
            }
        } else {
            this.player.draw()
        }
        this.buttons.draw()
    }
    iWin() {
        let possibleDoors = this.doors.imIn(this.player.position.x, this.player.playerWidth)
        if (possibleDoors.length > 0) {
            for (let i = 0; i < possibleDoors.length; i++) {
                if (possibleDoors[i].imWinner) {
                    return true
                }
            }
            return false
        } else {
            return undefined
        }
    }
    restart() {
        this.player.restart()
    }
    actionButtons() {
        this.buttons.action()
    }
}

class Button {
    constructor(img, x, y, width, height, responseFunction) {
        this.img = img
        this.position = createVector(x, y)
        this.size = createVector(width, height)
        this.action = responseFunction
    }
    draw() {
        image(this.img, this.position.x, this.position.y, this.size.x, this.size.y)
    }
    imIn(x, y) {
        return x >= this.position.x && x <= this.position.x + this.size.x && y >= this.position.y && y <= this.position.y + this.size.y
    }
}

class Buttons {
    constructor(img, x, y, width, height, responseFunction) {
        let button = new Button(img, x, y, width, height, responseFunction)
        this.buttons = [button]
    }
    add(img, x, y, width, height, responseFunction) {
        this.buttons.push(new Button(img, x, y, width, height, responseFunction))
    }
    draw() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }
    }
    action() {
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i]
            if (button.imIn(mouseX, mouseY)) {
                button.action()
            }
        }
    }
}