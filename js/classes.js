class Door {
    constructor(x, y, img, msj, width, height) {
        this.x = x
        this.y = y
        this.img = img
        this.msj = msj
        this.width = width
        this.height = height
    }

    imIn(x, y) {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height
    }
    draw() {
        // msj text
        image(this.img, this.x, this.y, this.width, this.height)
    }
}

class Doors {
    constructor(x, y, img, msj, width, height) {
        this.doors = [new Door(x, y, img, msj, width, height)]
    }
    add(x, y, img, msj, width, height) {
        this.doors.push(new Door(x, y, img, msj, width, height))
    }
    draw() {
        for (let i = 0; i < this.doors.length; i++) {
            this.doors[i].draw()
        }
    }
    imIn(x, y) {
        let result = []
        for (let i = 0; i < this.doors.length; i++) {
            if (this.doors[i].imIn(x, y)) {
                result.push(this.doors[i])
            }
        }
        return result
    }
}

class Player {
    constructor(x, y, velocity, changeImgVelocity, playerWidth, playerHeight, imgRight, imgLeft, imgRightSecond, imgLeftSecond) {
        this.position = createVector(x, y)
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