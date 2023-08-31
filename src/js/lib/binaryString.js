import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProp.js"

const SPEED = .05
const PANJANG_BINARY = 100

const binaryGroundElems = document.querySelectorAll('[data-binary-ground]')
let widthStrBinary = window.innerWidth

export function setBinaryGround() {
    const number = '01'
    let output = ''
    for (let i = 0; i<PANJANG_BINARY; i++) {
        output += number
    }

    binaryGroundElems.forEach(elem => {
        elem.innerHTML = output
    })

    // widthStrBinary = binaryGroundElems[0].getBoundingClientRect().width /10
    
    console.log(widthStrBinary)
    setCustomProperty(binaryGroundElems[0], '--left', 0)
    setCustomProperty(binaryGroundElems[1], '--left', widthStrBinary)
}


export function updateBinaryGround(delta, speedScaleDifficulty) {
    console.log(getCustomProperty(binaryGroundElems[0], '--left'), widthStrBinary*-1)

    binaryGroundElems.forEach((elem, i) => {
        console.log(delta)
        incrementCustomProperty(elem, '--left', delta * speedScaleDifficulty * SPEED * -1) //geser si binaryGround kekiri sesuai dengan kenaikan speedScaleDiff
        // console.log(getCustomProperty(elem, '--left'), i, widthStrBinary)

        if (getCustomProperty(elem, '--left') <= (widthStrBinary * -1)) {
            console.log('masuk')
            incrementCustomProperty(elem, '--left', widthStrBinary*2)
        }
    })

}
