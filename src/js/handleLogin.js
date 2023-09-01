import { setCloud, updateCloud } from '../js/cloud.js'
// import { showModal } from './components/modal.js'

const loginForm = document.querySelector('[data-login-form]')

const handleLogin = (inputValue) => {
   let msg
   switch (true) {
      case !inputValue:
      case typeof inputValue !== 'string':
         msg = 'isi namanya yang bener dong bro'
         break
      case inputValue.length < 3:
         msg = 'username minimal 3 karakter!'
         break
      default:
         break
   }
   if (msg){ alert(msg)} else {

       localStorage.setItem('username', inputValue)
       location.href = './src/pages/mainGame.html'
       console.log('masoek')
   }

}

loginForm.addEventListener('submit', (e) => {
   e.preventDefault()
   handleLogin(e.target[0].value)
})

setCloud()

let lastTime = null

function update(time) {
   if (!lastTime) {
      //ini biar pas call di call pertama kali variabel lastTime ngga kosong..
      lastTime = time
      window.requestAnimationFrame(update)
      return
   }
   const delta = time - lastTime

   updateCloud(delta)
   lastTime = time
   window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)
