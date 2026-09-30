// Encontrar o botão na página
const button = document.querySelector('button');
const inputNome = document.querySelector('[name="nome"]');
const inputTipo = document.querySelector('[name="tipo"]');
const inputEmail = document.querySelector('[name="email"]');
const inputSenha = document.querySelector('[name="senha"]');

// Adicionar escuta do evento de 'click'
button.addEventListener('click', function () {
	const novoUsuario = {
		nome: inputNome.value,
		tipo: inputTipo.value, 
		email: inputEmail.value, 
		senha: inputSenha.value,
	}
	criarUsuario(novoUsuario)
})


function criarUsuario(dadoUsuario) {
	fetch("http://localhost:3000/users", {
		method: "POST",
		body: JSON.stringify(dadoUsuario)
	}).then(function(resposta){
		resposta.json().then(function(data){
		console.log(data)
			reset()
			lerUsuario()
		})
	})
}

function lerUsuario() {
	fetch("http://localhost:3000/users", {
		method: "GET",
	}).then(function(resposta){
		resposta.json().then(function(data){
			for(const usuarios of data){		
				criarHTML(usuarios)
			}
		})
	})
}
function deletarUsuario(dadoUsuario) {
	fetch("http://localhost:3000/users/"+dadoUsuario, {
		method: "Delete"
	}).then(function(resposta){
		resposta.json().then(function(data){
			reset()
			lerUsuario()
		})
	})
}

function criarHTML(usuarios){
	const divResulato = document.querySelector('.resultado')
	const divCriado = document.createElement('div')
	divCriado.classList.add('bloco')
     divCriado.innerHTML=`
	 	<h1>Nome:    ${usuarios.nome}</h1>
        <span>senha: ${usuarios.senha}</span>
        <span>Email: ${usuarios.email}</span>
        <span>tipo:  ${usuarios.tipo}</span>
		<button  id="deletar"> Deletar </button>
	`
	divResulato.append(divCriado)
	const btDeletar = divCriado.querySelector('#deletar');
	btDeletar.addEventListener('click', function(){
	deletarUsuario(usuarios.id)
})
}
function reset(){
	const divResulato = document.querySelector('.resultado')
		divResulato.innerHTML=`
	 	
	`
}

lerUsuario()