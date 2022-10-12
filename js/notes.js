const noteUs      = JSON.parse(localStorage.getItem('task'));
const loggedUser  = (sessionStorage.getItem('logged'));
        // checa se esta logado
if(!loggedUser) {
    window.location.href = 'createAccount.html'
};
const nameScreen = document.getElementById('nameOnTheScreen');
const comForm   = document.getElementById('notesForm');
const mensagem  = document.getElementById('notes');
const descri    = document.getElementById('complement');
const bodyTable = document.getElementById('tBody');

            // pega o usuario logado no momento
let userData = noteUs.find((usuario) => {
    return usuario.email ==loggedUser
});
nameScreen.innerText = userData.nome

             // load da pagina
window.addEventListener('load', () => {
    let tableLoad = userData.data.forEach(item => {
        let data = {
            id: item.id,
            mensagems: item.mensagems,
            descricao: item.descricao,
        };

        let nnn =  newRow(data)

    });
});

            // arra falso para não quebarar o codigo
function getDefaulNotes () {
    return {
        data: []
    }
}

            // criando a tabela
document.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!userData) {
        noteUs = getDefaulNotes()
    }

    const data = {
        id:  Math.floor(Date.now() / 1000),
        mensagems: mensagem.value,
        descricao: descri.value,
    };

    if(mensagem.value == '' || descri.value == '') {
        alert('Preencha os campos para proseguir.');
        return;
    };

    userData.data.push(data)
    noteUs.forEach((item) => {
        if(item.email == loggedUser) {
            item.data = userData.data
        };
    });

    localStorage.setItem('task', JSON.stringify(noteUs))
    let nnn =  newRow(data)

    mensagem.value = ''
    descri.value   = ''
    mensagem.focus()
});

function newRow (data) {
   
    // bodyTable.innerHTML += `
    //     <tr>
    //         <td>${data.mensagems}</td>
    //         <td>${data.descricao}</td>
    //         <td>
    //             <button type="button" class="btn btn-danger" id="btnApaga"
    //                 onclick="excluir(${data.id})">Excluir
    //             </button>  
    //             <button type="button" class="btn btn-primary" data-bs-toggle="modal" 
    //                 data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="preparaEditar(${data.id})">Editar
    //             </button>
    //         </td>
    //     </tr>    
    // `

    bodyTable.innerHTML += `
    <tr>
        <td>${data.mensagems}</td>
        <td>${data.descricao}</td>
        <td>
            <button type="button" class="btn btn-danger ocult" id="btnApaga"
                onclick="excluir(${data.id})">Excluir
            </button>
                
            <button type="button" class="btn btn-primary ocult" data-bs-toggle="modal" 
                data-bs-target="#exampleModal" data-bs-whatever="@mdo"
                 onclick="preparaEditar(${data.id})">Editar
            </button>
               

            <div class="dropdown drop">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ações
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                 <li> 
                    <button type="button" class="btn btn-danger" id="btnApaga"
                    onclick="excluir(${data.id})">Excluir</button>
                 </li>
                 <li>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" 
                    data-bs-target="#exampleModal" data-bs-whatever="@mdo" 
                    onclick="preparaEditar(${data.id})">Editar</button
                 </li>
                </ul>
            </div>
        </td>
    </tr>    
`

};
            // gerador de ID
const generateId = (gerar) => {
    let nextId = gerar.length + 1;

    let index = gerar.findIndex((gera) => gera.id === nextId);

    while (index >=0) {
        nextId++;
        index = gera.findIndex((gera) => gera.id === nextId);
    }
    return nextId;
}

            // excluir linha
function excluir(id) {
    let noteUs  = JSON.parse(localStorage.getItem('task')) || getDefaulNotes();

    const confirmExcluir = confirm('Tem certeza que quer excluir esta nota ?');
    if(!confirmExcluir) {
        return;
    };

    let idLinha = userData.data.findIndex((item) => item.id == id);
    if(idLinha >= 0) {
        userData.data.splice(idLinha, 1);
    };

    noteUs.forEach((item) => {
    if(item.email == loggedUser) {
        item.data = userData.data
        };
    });
    localStorage.setItem('task', JSON.stringify(noteUs));
    location.reload();
    mensagem.focus();
    alert('Nota excluida com sucesso.')
};


            // preparalção para ediatr
let expo = 0
function preparaEditar (id) {
    let noteUs  = JSON.parse(localStorage.getItem('task')) || getDefaulNotes();
    let modalMendsag = document.getElementById('edit-mensage');
    let modalDescripition = document.getElementById('edit-descripition');

    let idLinha = userData.data.findIndex((item) => item.id == id);

    modalMendsag.value = userData.data[idLinha].mensagems;
    modalDescripition.value = userData.data[idLinha].descricao;

    expo = idLinha
    modalMendsag.focus();    
};

            // editar linha
function editar (index) {
   let noteUs  = JSON.parse(localStorage.getItem('task')) || getDefaulNotes();
   let modalMendsag = document.getElementById('edit-mensage');
   let modalDescripition = document.getElementById('edit-descripition');

   const confirmEdit = confirm('Tem certeza que deseja editar esta nota ?');
   if(!confirmEdit){
    return;
   };

    if(modalMendsag.value == '' || modalDescripition.value == '') {
        alert('Porfavor preecha os campos para proseguir.');
        return;
    };

    userData.data[index].mensagems = modalMendsag.value;
    userData.data[index].descricao = modalDescripition.value;
      
    noteUs.forEach((item) => {
        if(item.email == loggedUser) {
            item.data = userData.data
            };
        });
    localStorage.setItem('task', JSON.stringify(noteUs));
    location.reload();

};

            // sair da pagina recados
function exit () {
    sessionStorage.removeItem('logged');
    window.location.href = 'index.html';
};