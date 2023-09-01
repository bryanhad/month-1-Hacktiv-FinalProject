import { randomNumberBetween } from './lib/randomNumberBetween.js'
import {
   getCustomProperty,
   incrementCustomProperty,
   setCustomProperty,
} from './lib/updateCustomProp.js'

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector('[data-world]')
const OBSTACLE_FRAME_COUNT = 2

let obstacleFrame
let nextCactusTime

export function setCactus() {
   nextCactusTime = CACTUS_INTERVAL_MIN

   document.querySelectorAll('[data-cactus]').forEach((cactus) => {
      cactus.remove()
   })
}

export function updateCactus(delta, speedScaleDifficulty) {
   document.querySelectorAll('[data-cactus]').forEach((cactus) => {
      incrementCustomProperty(
         cactus,
         '--left',
         delta * speedScaleDifficulty * SPEED * -1
      )

      if (getCustomProperty(cactus, '--left') <= -100) {
         //kalo cactus udah disebelah kiri jauh, buang aja
         cactus.remove()
      }
   })

   if (nextCactusTime <= 0) {
      //if the nextCactusTime already reaches 0, spawn new cactus!
      spawnCactus()
      nextCactusTime =
         randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
         speedScaleDifficulty //set next cactus time untuk nentuin berapa lama si cactus bakal spawn nextnya.. nah ini diambil dari random number antara min interval dan max interval, terus dibagi dengan speedScaleDifficulty biar sesuai dengan kecepatan game
   }
   nextCactusTime -= delta
}

function spawnCactus() {
   obstacleFrame = randomNumberBetween(0, OBSTACLE_FRAME_COUNT - 1)

   const cactus = document.createElement('img')
   cactus.dataset.cactus = true
   cactus.src = `../img/obstacle/${obstacleFrame}.png`
   cactus.alt = `obstacle${obstacleFrame}-Sprite`
   cactus.classList.add('cactus')
   if (obstacleFrame === 1) {
      cactus.style.height = '30%'
   } else {
      cactus.style.height = '15%'
   }

   setCustomProperty(cactus, '--left', 100)
   worldElem.append(cactus)
}

export function getKotakCactuses() {
   return [...document.querySelectorAll('[data-cactus]')].map((cactus) => {
      return cactus.getBoundingClientRect() //ngedapetin dimensi kotak si tiap cactus, left-top-bottom-right.
   })
}
