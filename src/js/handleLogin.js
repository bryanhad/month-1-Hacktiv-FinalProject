import { showModal } from "./components/modal.js"

const loginForm = document.querySelector('[data-login-form]')
console.log(loginForm)

const handleLogin = (inputValue) => {
    let msg
    switch (true) {
        case !inputValue:
        case typeof inputValue !== 'string': msg = 'isi namanya yang bener dong bro'; break
        case inputValue.length < 3: msg = 'username minimal 3 karakter!'; break
        default: break;
    }
    if (msg) showModal(msg)

    location.href = 'mainGame.html'
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    handleLogin(e.target[0].value)
})