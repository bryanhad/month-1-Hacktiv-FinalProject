import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./lib/updateCustomProp.js"

const dinoElem = document.querySelector('[data-dino]')
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_RUNNING_FRAME_COUNT = 3 //jumlah sprite si dino untuk berjalan
// const DINO_JUMPING_FRAME_COUNT = 3 //jumlah sprite si dino untuk berjalan
const FRAME_TIME = 100 //tiap sprite si dino akan muncul per 100ms, tiap detik ya kegant 10x

let isJumping
let dinoFrame
let currentFrameTime
let kecepatanY

export function setDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    kecepatanY = 0

    setCustomProperty(dinoElem, '--bottom' , 0)
    document.removeEventListener('keydown', onJump) //untuk reset pas reset game, biar incase sebelumnya udh ada event listenernya, rmeove dulu, baru add lagi
    document.addEventListener('keydown', onJump)
}

export function updateDino(delta, speedScaleDifficulty) {
    handleRun(delta, speedScaleDifficulty)
    handleJump(delta)
}

function handleRun(delta, speedScaleDifficulty) {
    if (isJumping) {
        dinoElem.src = '../img/dino-stationary.png'
        return
    }

    if (currentFrameTime >= FRAME_TIME) { //kalo frame time si sprite yg sekarang udah melebihi FRAME_TIME (yg nentuin seberapa lama tiap sprite muncul), ganti sprite!
        dinoFrame = (dinoFrame + 1) % DINO_RUNNING_FRAME_COUNT //ini biar framenya ngelooping! 
        // misal sekarang lagi di frame 15, nah kita misal punya total frame itu 10, 
        // nah 15 modulo 10 (frame count) ya kan 5, jadi skrng kita make sprite ke 5
        dinoElem.src = `../img/fox/fox-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    
    currentFrameTime += delta * speedScaleDifficulty //biar si spritenya bakal updatenya sesuai dengan speedScaleDifficulty
}

function handleJump(delta) {
    if (!isJumping) return 

    // dinoElem.src = '../img/fox/fox-jump-1.png'
    switch(true) {
        case kecepatanY >= 0.15: dinoElem.src = '../img/fox/fox-jump-0.png'; break
        case kecepatanY >= -0.15: dinoElem.src = '../img/fox/fox-jump-1.png'; break
        default: dinoElem.src = '../img/fox/fox-jump-2.png'; break
    }

    incrementCustomProperty(dinoElem, '--bottom', kecepatanY * delta)

    if (getCustomProperty(dinoElem, '--bottom') <= 0) { //kalo prop css 'bottom' udah udah 0 kebawah, maka jgn turun lagi lahh
        setCustomProperty(dinoElem, '--bottom', 0)
        isJumping = false
    }

    kecepatanY -= GRAVITY * delta //biar kecepatanY nya ato kecepatan naik turun pas lompat sesuai dengan ketingkatan kecepatan game yg udh berlalu,,
}

function onJump(e) {
    if (e.code !== 'Space' || isJumping) return
    kecepatanY = JUMP_SPEED
    isJumping = true
}

export function getKotakDino() {
    return dinoElem.getBoundingClientRect() //dapetin dimensi kotak si dino
}

export function setDinoLose() {
    dinoElem.src = '../img/dino-lose.png'
}