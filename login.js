function handleLogin() {
    let username=document.getElementById("username").value;
    if (!username) {
        alert("masukkan username");
    }
    localStorage.setItem('user', username);
}

