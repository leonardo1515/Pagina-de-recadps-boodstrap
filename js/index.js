const dataUser = JSON.parse(localStorage.getItem('task')) || [];
const logged   = (sessionStorage.getItem('logged'));
const eForm    = document.getElementById('enterForm');
const email    = document.getElementById('input-email');
const password = document.getElementById('input-password');

if(logged) {
    window.location.href = 'notes.html'
};

document.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = dataUser.find(users => users.email == email.value);

    if(dataUser == '') {
        alert('Você não possue uma conta.')
        return;
    };

    if(user.email != email.value || user.senha != password.value) {
        alert('E-mail ou senha errado.');
        return;
    };

    sessionStorage.setItem('logged', (email.value))
    window.location.href = 'notes.html'

})