import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./lib/updateCustomProp.js"

export function moveSprites(update_Or_Set, dataAttribute, SPEED,  delta, speedScaleDifficulty) {   
    const elemsArr = document.querySelectorAll(dataAttribute)
    const elemWidthInCSS = getCustomProperty(elemsArr[0], '--width')
    const furthestPossibleLeftValue = elemWidthInCSS * elemsArr.length

    switch(update_Or_Set) {
        case 'SET':
            setElem(elemsArr, elemWidthInCSS); break
        case 'UPDATE':
            updateElem(elemsArr, elemWidthInCSS, furthestPossibleLeftValue, SPEED, delta, speedScaleDifficulty); break
        default: console.log(`please enter the correct functionType! 'update' | 'set'`); break
    }
}

// const groundElems = document.querySelectorAll('[data-ground]')
// const groundWidthInCSS =  getCustomProperty(groundElems[0], '--width')
// const furthestPossibleLeftValue = groundWidthInCSS * groundElems.length

function setElem(elemsArr, elemWidthInCSS) {
    let leftValue = 0
    elemsArr.forEach((el) => {
        setCustomProperty(el, '--left', leftValue)
        leftValue += elemWidthInCSS
    });

    //ini diatas buat ngelooping tiap elemen html, terus bakal kasih --left property di cssnya untuk dimulai dari 0, yang tiap loopign bakal di increment dengan lebar yang udh ditentuin di css.

    // setCustomProperty(groundElems[0], '--left', 0) //set property variabel css --left di groundElem pertama jadi 0
    // setCustomProperty(groundElems[1], '--left', 30) //set property variabel css --left di groundElem kedua jadi 300
    // setCustomProperty(groundElems[2], '--left', 60) //set property variabel css --left di groundElem kedua jadi 300
    // setCustomProperty(groundElems[3], '--left', 90) //set property variabel css --left di groundElem kedua jadi 300
    // setCustomProperty(groundElems[4], '--left', 120) //set property variabel css --left di groundElem kedua jadi 300
}

function updateElem(elemsArr, elemWidthInCSS, furthestPossibleLeftValue, SPEED, delta, speedScaleDifficulty) { //param delta itu kan untuk tau selisih waktu yg diperluin dalam refresh rate,
    //speedScaleDifficulty itu buat nentuin tingkat kecepatan si groundnya
    elemsArr.forEach(el => {
        incrementCustomProperty(el, '--left', delta * speedScaleDifficulty * SPEED * -1)

        if (getCustomProperty(el, '--left') <= -elemWidthInCSS) {
            incrementCustomProperty(el, '--left', furthestPossibleLeftValue)
        }

    })
}