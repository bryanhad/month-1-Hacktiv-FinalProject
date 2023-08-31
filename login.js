top.username=document.getElementById("username").value;
localStorage.setItem('user', top.username);

const userNameInpput = document.querySelector('#username')
let namaUser

userNameInpput.addEventListener('input', (e) => {
namaUser = e.target.value
})
let btn = document.querySelector(".button")
btn.addEventListener("click", () => {
    


console.log(namaUser);
})

