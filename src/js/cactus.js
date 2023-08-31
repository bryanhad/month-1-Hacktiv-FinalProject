import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./lib/updateCustomProp.js"

const SPEED = .05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector('[data-world]')

let nextCactusTime

export function setCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN

    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScaleDifficulty) {
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        incrementCustomProperty(cactus, '--left', delta * speedScaleDifficulty * SPEED * -1)

        if (getCustomProperty(cactus, '--left') <= -100) { //kalo cactus udah disebelah kiri jauh, buang aja
            cactus.remove()
        }
    })


    if (nextCactusTime <= 0) { //if the nextCactusTime already reaches 0, spawn new cactus! 
        spawnCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScaleDifficulty //set next cactus time untuk nentuin berapa lama si cactus bakal spawn nextnya.. nah ini diambil dari random number antara min interval dan max interval, terus dibagi dengan speedScaleDifficulty biar sesuai dengan kecepatan game
    }
    nextCactusTime -= delta
}

function spawnCactus() {
    const cactus = document.createElement('img')
    cactus.dataset.cactus = true
    cactus.src = '../img/cactus.png'
    cactus.classList.add('cactus')

    setCustomProperty(cactus, '--left', 100)
    worldElem.append(cactus)
}


function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}

export function getKotakCactuses() {
    return [...document.querySelectorAll('[data-cactus]')].map(cactus => {
        return cactus.getBoundingClientRect() //ngedapetin dimensi kotak si tiap cactus, left-top-bottom-right.
    })
}