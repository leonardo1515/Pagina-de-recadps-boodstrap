const form           = document.getElementById('createForm');
// para por nome na tela
// const nome           = document.getElementById('name');
const createEmail    = document.getElementById('creat-email');
const createPassword = document.getElementById('creat-password');
const user           = JSON.parse(localStorage.getItem('task')) || []

document.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(createEmail.value == '' || createPassword.value == '') {
        alert('Por favor preençã os campos corretamente para proseguir');
        return;
    };

    if(createEmail.value.length < 9 || createPassword.value.length < 4) {
        alert('Por favor preençã os campos corretamente para proseguir');
        return;
    };

    if(user.find(usuario => usuario.email == createEmail.value)) {
        alert('Este émail já tem um cadastro');
        return;
    }
 
    const dataUser = {
        email: createEmail.value,
        senha: createPassword.value,
        data: newNotes = [],
    };
    // para por nome na tela
    // const dataUser = {
    //     nome:  nome.value,
    //     email: createEmail.value,
    //     senha: createPassword.value,
    //     data:  newNotes = [],
    // };

    user.push(dataUser);

    localStorage.setItem('task', JSON.stringify(user));
    window.location.href = 'index.html';
});