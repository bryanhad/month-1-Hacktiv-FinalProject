import { moveSprites } from "./sprite_SET_and_UPDATE.js"
import { setDino, updateDino, getKotakDino, setDinoLose } from "./dino.js"
import { setCactus, updateCactus, getKotakCactuses } from "./cactus.js"
import { addHistory } from "./history.js"

const USERNAME = 'BAMBANG'
const WORLD_WIDTH = 100 //ratio of world width
const WORLD_HEIGHT = 35   //ratio of world height
const SPEED_SCALE_INCREASE = 0.00001 //tingkat kecepatan si ground bakal makin cepet

const worldContainerElem = document.querySelector("[data-world-container]")
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const usernameElem = document.querySelector('[data-username]')

setPixelToWorldScale()
moveSprites('SET', '[data-ground]')
moveSprites('SET', '[data-forest]')
moveSprites('SET', '[data-mountain]')
usernameElem.innerHTML = localStorage.getItem('username')

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
    // updateGround(delta, speedScaleDifficulty)
    moveSprites('UPDATE', '[data-ground]', 0.05, delta, speedScaleDifficulty)
    moveSprites('UPDATE', '[data-forest]', 0.032, delta, speedScaleDifficulty)
    moveSprites('UPDATE', '[data-mountain]', 0.009, delta, speedScaleDifficulty)
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

    setDino()
    setCactus()
    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update) //manggil func "update" pas ada refresh rate
}

function setPixelToWorldScale() {
    const worldContainerDimention = worldContainerElem.getBoundingClientRect()
    let worldToPixelScale
    if (worldContainerDimention.height / worldContainerDimention.width < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = worldContainerDimention.width / WORLD_WIDTH
    } else {
        worldToPixelScale = worldContainerDimention.height / WORLD_HEIGHT
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
    addHistory(Math.floor(score))

    setTimeout(() => {
        document.addEventListener('keydown', handleStart, {once: true})
        startScreenElem.classList.remove('hide')
    }, 200);
}