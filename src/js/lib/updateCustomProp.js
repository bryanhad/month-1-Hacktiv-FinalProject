export function getCustomProperty(elem, prop) {
    return parseFloat(window.getComputedStyle(elem).getPropertyValue(prop)) || 0 //ini bakal ngasih string si cssnya

    /*window.getComputedStyle itu ngomong..
    "woi! kasih gw css dari si element yang ada di masukin di argumen gue!"

    nah itukan dimasukin elem, nah abis itu */
}

export function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value) //ini buat ngeset property cssnya
    // misal ya propertynya itu --left, terus valuenya 10
    // jadi ntar di cssnya si elemnya punya --left: 10
}

export function incrementCustomProperty(elem, prop, incAmount) {
    const valueBaruUntukPropertyCSS = getCustomProperty(elem, prop) + incAmount
    //jadi getcustomProperty kan ngasih sekarang value dari si property cssnya itu berapa,
    //nah pas udah dapet dia bakal ditambahin dengan param incAmount.. dapet deh itu di variabel valueBaruUntukPropertyCSS

    //nah itu dimasukin di setCustomProperty, yang bakal ngeupdate property css yang dimaksud dengan value barunya!

    setCustomProperty(elem, prop, valueBaruUntukPropertyCSS)
}