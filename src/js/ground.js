import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./lib/updateCustomProp.js"
const SPEED = .03

const groundElems = document.querySelectorAll('[data-ground]')


export function setGround() {
    setCustomProperty(groundElems[0], '--left', 0) //set property variabel css --left di groundElem pertama jadi 0
    setCustomProperty(groundElems[1], '--left', 129) //set property variabel css --left di groundElem kedua jadi 300
}

export function updateGround(delta, speedScaleDifficulty) { //param delta itu kan untuk tau selisih waktu yg diperluin dalam refresh rate,
    //speedScaleDifficulty itu buat nentuin tingkat kecepatan si groundnya
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, '--left', delta * speedScaleDifficulty * SPEED * -1)

        if (getCustomProperty(ground, '--left') <= -130) {
            incrementCustomProperty(ground, '--left', 255)
        }

    })
}