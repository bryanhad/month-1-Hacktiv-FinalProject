import { setGround, updateGround } from "./ground.js"
import { setDino, updateDino, getKotakDino, setDinoLose } from "./dino.js"
import { setCactus, updateCactus, getKotakCactuses } from "./cactus.js"
import { setBinaryGround, updateBinaryGround } from "./lib/binaryString.js"

const WORLD_WIDTH = 100 //ratio of world width
const WORLD_HEIGHT = 30 //ratio of world height
const SPEED_SCALE_INCREASE = 0.00001 //tingkat kecepatan si ground bakal makin cepet

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

setPixelToWorldScale()

window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScaleDifficulty
let score

function update(time) {
    if (!lastTime) {
        //ini biar pas call di call pertama kali variabel lastTime ngga kosong..
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime //biar tau selisih berapa lama sih sih framerate dari monitor (berapa miliSecond)
    updateGround(delta, speedScaleDifficulty)
    // updateBinaryGround(delta, speedScaleDifficulty)
    updateDino(delta, speedScaleDifficulty)
    updateCactus(delta, speedScaleDifficulty)
    updateSpeedScale(delta)
    updateScore(delta)
    if (checkLose()) return handleLose() //ini panggil return biar loopnya berhenti dan langsung panggil handleLose()

    lastTime = time
    window.requestAnimationFrame(update) //manggil diri sendiri lagi kalo ada reequestanimationFrame dari monitor, ini bakal kepanggil tiap refresh rate dari monitor
}

function updateSpeedScale(delta) {
    speedScaleDifficulty += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
    score += delta * 0.01 //scorenya itu bakal nambah dari hasil delta dibagi 10
    scoreElem.textContent = Math.floor(score)
}

function handleStart() {
    lastTime = null //reset lasttime variable ke null!
    speedScaleDifficulty = 1
    score = 0

    setGround()
    // setBinaryGround()
    setDino()
    setCactus()
    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update) //manggil func "update" pas ada refresh rate
}

function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

function checkLose() {
    const kotakDino = getKotakDino()
    const kotakCactusArr = getKotakCactuses()
    // console.log(kotakCactusArr)
    return kotakCactusArr.some((kotak) => nabrakGaSih(kotak, kotakDino)) //.some itu kalo salah satu dari callback returnnya itu true, maka yaudah langsung return true
}

function nabrakGaSih(kotakCactus, kotakDino) { //cek collision antara cactus dengan dino
    return (
        kotakCactus.left < kotakDino.right &&
        kotakCactus.top < kotakDino.bottom &&
        kotakCactus.right > kotakDino.left &&
        kotakCactus.bottom > kotakDino.top
    )
}

function handleLose() {
    setDinoLose()

    setTimeout(() => {
        document.addEventListener('keydown', handleStart, {once: true})
        startScreenElem.classList.remove('hide')
    }, 200);
}

// const binaryGroundElem = document.querySelector('[data-binary-ground]')
// binaryGroundElem.innerText = setBinaryGround()
