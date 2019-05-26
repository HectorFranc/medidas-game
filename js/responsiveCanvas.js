function windowResized() {
    let canvas = document.getElementById('defaultCanvas0')
    if (fullscreen()) {
        canvas.classList.add('canvasResizedBig')
        canvas.classList.remove('canvasResizedSmall')
    } else {
        canvas.classList.remove('canvasResizedBig')
        canvas.classList.add('canvasResizedSmall')
    }
}