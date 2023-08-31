
let dummyData = [
    {tanggal:'31-08-2023', waktuSelesai:'2:38', name:'elsa', score:128},
    {tanggal:'31-08-2023', waktuSelesai:'2:38', name:'elsa1', score:128},
    {tanggal:'31-08-2023', waktuSelesai:'2:38', name:'elsa2', score:128},
    {tanggal:'31-08-2023', waktuSelesai:'2:38', name:'elsa3', score:128},
]

let dataContainer = document.querySelector("#dataContainer")

let groupLiStr = ''


function renderData() {
    if (!dummyData) return
    if (!dummyData.length) return
    for (let i = 1; i <= dummyData.length; i++) {
        // console.log(iterator);
        console.log(i);
    
    
    const {
        tanggal,
        waktuSelesai,
        name,
        score
    } = dummyData[i-1]
    
    console.log(tanggal);
    
    let template = `
    <li class="listini">
    <p>${i}</p>
    <p>${name}</p>
    <p>${tanggal}</p>
    <p>${waktuSelesai}</p>
    <div class="scoreContainer">
    <i style="size: 700px; color: rgb(110, 100, 172)" class="fa-solid fa-trophy"></i>
    <p>${score}</p>
    </div>
    </li>
    `
    groupLiStr += template
    
    
    }
    
    dataContainer.innerHTML = groupLiStr

}
renderData()



let resetBtn = document.querySelector('#resetBtn')
// console.log(resetBtn);
resetBtn.addEventListener('click', () => {
    // console.log('hehe')

    // return renderData()
    // dummyData = undefined
    dataContainer.innerHTML = ""
})