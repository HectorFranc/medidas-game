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
        // code here
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