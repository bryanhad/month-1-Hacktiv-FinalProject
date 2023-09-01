import { randomNumberBetween } from './lib/randomNumberBetween.js'
import {
   getCustomProperty,
   incrementCustomProperty,
   setCustomProperty,
} from './lib/updateCustomProp.js'

const SPEED = 0.005
const CLOUD_INTERVAL_MIN = 500
const CLOUD_INTERVAL_MAX = 10_000
const CLOUD_FRAME_COUNT = 6
const bodyEl = document.querySelector('[data-body]')

let cloudFrame
let nextCloudTime

export function setCloud() {
   cloudFrame = 0
   nextCloudTime = CLOUD_INTERVAL_MIN

   document.querySelectorAll('[data-cloud]').forEach(cloud => {
      cloud.remove()
   })
}


export function updateCloud(delta) {
   document.querySelectorAll('[data-cloud]').forEach((cloud) => {
      incrementCustomProperty(cloud, '--left', delta * SPEED * -1)

      if (getCustomProperty(cloud, '--left') <= -100) {
         cloud.remove()
      }
   })

   if (nextCloudTime <= 0) {
      spawnCloud()
      nextCloudTime = randomNumberBetween(
         CLOUD_INTERVAL_MIN,
         CLOUD_INTERVAL_MAX
      )
   }
   nextCloudTime -= delta

}

function spawnCloud() {
   const randomCloudHeight = randomNumberBetween(50, 95)
   cloudFrame = randomNumberBetween(0, CLOUD_FRAME_COUNT-1)

   const cloud = document.createElement('img')
   cloud.dataset.cloud = true
   cloud.src = `../img/cloud/${cloudFrame}.png`
   cloud.style.width = 'min-content'
   cloud.alt = 'cloudSprite'
   cloud.classList.add('cloud')
   
   setCustomProperty(cloud, '--left', 100)
   setCustomProperty(cloud, '--bottom', randomCloudHeight)
   bodyEl.append(cloud)
}
