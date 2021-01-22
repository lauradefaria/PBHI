/** CONSTANTES DO SCRIPT **/

// IDs dos containers
const divOpcoes = 'container-formas';
const divCaixa = 'container1';
const divCaixa2 = 'container2';

const coresEnum = Object.freeze({
	"azul": 0,
	"vermelho": 1,
	"amarelo": 2
});
const formasEnum = Object.freeze({
	"triangulo": 0,
	"quadrado": 1,
	"retangulo": 2,
	"circulo": 3
});
const tamanhoEnum = Object.freeze({
	"grande": 0,
	"pequeno": 1
});
const contornoEnum = Object.freeze({
	"comContorno": 0,
	"semContorno": 1
});
/** FIM CONSTANTES */

/** FUNÇÕES DE APOIO */
function allowDrop(event) {

	if (event.target.getAttribute("droppable") == "false"){
                    event.dataTransfer.dropEffect = "none"; // dropping is not allowed
                                      event.preventDefault();
                }
    else{
        event.dataTransfer.dropEffect = "all"; // drop it like it's hot
                          event.preventDefault();
    }

  	event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  var id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  if (event.currentTarget.src == 'dropBox1') {
      arrayQuadrado.push(src);
  }

  if(event.currentTarget.id == 'dropBox2'){
    arrayTriangulo.push(src);

  }
}

function noAllowDrop(ev) {
        ev.stopPropagation();
}
/** FIM FUNÇÕES DE APOIO */


/** VARIAVEIS GLOBAIS COMPARTILHADAS ENTRE AS FUNCOES */
var arrayPrimeira = []; //Elementos colocados na caixa de resposta
var arraySegunda = []; //Elementos colocados na caixa de resposta 2
var arrayOpcoes = []; //Array contendo todos os elementos gerados nas opcoes
var etapaAtual;       //Etapa do jogo
var restricao1 = [];   //Restriçoes da primeira caixa
var restricao2 = [];   //Restriçoes da segunda caixa
var tamRestricoes = 0;
/** FIM VARIAVEIS */

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** FUNCOES DO JOGO */
function getImgScr(forma, cor, tamanho, contorno) {
	var src = './img/';

	switch (forma) {
		case formasEnum.triangulo:
			src += 'T';
			break;
		case formasEnum.retangulo:
			src += 'R';
			break;
		case formasEnum.circulo:
			src += 'C';
			break;
		case formasEnum.quadrado:
			src += 'Q';
			break;
	}

	switch (cor) {
		case coresEnum.azul:
			src += 'Z';
			break;
		case coresEnum.amarelo:
			src += 'A';
			break;
		case coresEnum.vermelho:
			src += 'V';
			break;
	}

	switch (tamanho) {
		case tamanhoEnum.grande:
			src += 'G';
			break;
		case tamanhoEnum.pequeno:
			src += 'P';
			break;
	}

	switch (contorno) {
		case contornoEnum.comContorno:
			src += 'C';
			break;
		case contornoEnum.semContorno:
			src += 'S';
			break;
	}

	src += '.png';

	return src;
}

/*function removeChildElementsByTag(parent, tag) {
	var parentDom = document.getElementById(parent);
	var elements = parentDom.getElementsByTagName(tag);
	var i;

	console.log('parent ' + parentDom.getAttribute('id') + ' tem ' + elements.length + ' childs.');
	for (i = elements.length - 1; i >= 0; i--) {
		console.log('removendo ' + elements[i].getAttribute('id') + '/' + elements[i].parentNode.getAttribute('id'));
		//parentDom.removeChild(elements[i]);
		elements[i].remove();
	}

}*/

function novaImgBlocoLogicoComRestricoes(arrayPecasExistentes, maxCores, maxFormas, maxTamanhos, maxContornos) {
	var novaImg = document.createElement("img");
	var i, cor, tipo, tam, cont, arq;
	var corUsada = [0, 0, 0],
		formaUsada = [0, 0, 0, 0],
		tamanhoUsado = [0, 0],
		contornoUsado = [0, 0];
	var coresUsadas = 0,
		formasUsadas = 0,
		tamanhosUsados = 0,
		contornosUsados = 0;

	if (arrayPecasExistentes.length != 0) {
		//preencher caracteristicas usadas
		console.log('verificar caracteristicas usadas');
		for (i = 0; i < arrayPecasExistentes.length; i++) {
			if (arrayPecasExistentes[i] == null)
				continue;
			coresUsadas += corUsada[arrayPecasExistentes[i].getAttribute('data-cor')] == 1 ? 0 : 1;
			corUsada[arrayPecasExistentes[i].getAttribute('data-cor')] = 1;
			formasUsadas += formaUsada[arrayPecasExistentes[i].getAttribute('data-tipo')] == 1 ? 0 : 1;
			formaUsada[arrayPecasExistentes[i].getAttribute('data-tipo')] = 1;
			tamanhosUsados += tamanhoUsado[arrayPecasExistentes[i].getAttribute('data-tam')] == 1 ? 0 : 1;
			tamanhoUsado[arrayPecasExistentes[i].getAttribute('data-tam')] = 1;
			contornosUsados += contornoUsado[arrayPecasExistentes[i].getAttribute('data-cont')] == 1 ? 0 : 1;
			contornoUsado[arrayPecasExistentes[i].getAttribute('data-cont')] = 1;
			console.log('peca verificada');
		}

		//escolher cor
		console.log('cores usadas = ' + coresUsadas);
		for (i = 0; i < corUsada.length; i++) {
			console.log(i + ' = ' + corUsada[i]);
		}
		while (1) {
			cor = getRandomIntInclusive(0, 2);
			if (coresUsadas < maxCores && !corUsada[cor]) {
				//se ainda nao escolheu todas as cores e eh  uma nova cor
				break;
			}
			if (coresUsadas >= maxCores && corUsada[cor]) {
				//se ja escolheu todas as cores e eh cor ja usada
				break;
			}
		}
		//escolher forma
		console.log('escolher nova forma');
		while (1) {
			tipo = getRandomIntInclusive(0, 3);
			if (formasUsadas < maxFormas && !formaUsada[tipo]) {
				break;
			}
			if (formasUsadas >= maxFormas && formaUsada[tipo]) {
				break;
			}
		}
		//escolher tamanho
		console.log('escolher novo tamanho');
		while (1) {
			tam = getRandomIntInclusive(0, 1);
			console.log('tam escolhido = ' + tam + ' tamanhoUsado = ' + tamanhoUsado);
			if (tamanhosUsados < maxTamanhos && !tamanhoUsado[tam]) {
				break;
			}
			if (tamanhosUsados >= maxTamanhos && tamanhoUsado[tam]) {
				break;
			}
		}
		//escolher contorno
		console.log('escolher novo contorno');
		while (1) {
			cont = getRandomIntInclusive(0, 1);
			if (contornosUsados < maxContornos && !contornoUsado[cont]) {
				break;
			}
			if (contornosUsados >= maxContornos && contornoUsado[cont]) {
				break;
			}
		}
	} else {
		//array vazio
		console.log('array de imgs estava vazio');
		cor = getRandomIntInclusive(0, 2);
		tipo = getRandomIntInclusive(0, 3);
		tam = getRandomIntInclusive(0, 1);
		cont = getRandomIntInclusive(0, 1);
	}
	
	arq = getImgScr(tipo, cor, tam, cont);
	novaImg.setAttribute('src', arq);
	novaImg.setAttribute('data-cor', cor);
	novaImg.setAttribute('data-tipo', tipo);
	novaImg.setAttribute('data-tam', tam);
	novaImg.setAttribute('data-cont', cont);
	novaImg.setAttribute('draggable','true');
    novaImg.setAttribute('droppable','false');
    novaImg.setAttribute('ondragstart', 'drag(event)');
    novaImg.setAttribute('width', '200');
	novaImg.classList.add('game-img');

	console.log('novaimg: tipo=' + tipo + ', cor=' + novaImg.getAttribute('cor') + ', tam=' + tam + ', contorno=' + cont + ', src=' + arq);

	return novaImg;
}

/*function reset() {
	removeChildElementsByTag(divOpcoes, 'img');
	removeChildElementsByTag(divCaixa, 'img');

	arrayPrimeira = [];
	arraySegunda = []
    arrayOpcoes = [];
    tamRestricoes = 0;
    restricao1 = [];
    restricao2 = [];
}*/

endGame = false;

function game(etapa) {
	//reset();
	
	//iniciar variaveis de controle
    var tamOpcoes = 0; //quantidade de opções de resposta
	var coresDistintas = 0; //quantidade de cores distintas possiveis nas opcoes
	var formasDistintas = 0; //quantidade de formas distintas possiveis nas opcoes
	var tamanhosDistintos = 0; //quantidade de tamanhos distintas possiveis nas opcoes
	var contornosDistintos = 0; //quantidade de contornos distintas possiveis nas opcoes
	var i, j, escolhido, achouIgual;

	var fonte = ''; //source de cada imagem	
	var cor, tipo, tam, cont, arq; //Atributos de cada imagem (cor, tipo, tamanho e contorno)

	//setar os valores das variaveis de controle de acordo com a etapa/fase
	etapaAtual = etapa;
	switch (etapa){
    	case 0:
            //Padronizado
            tamOpcoes = 3;
            resposta1[0] = 'quadrado';
            resposta2[0] = 'triangulo';
      		coresDistintas = 1;
      		formasDistintas = 3;
      		tamanhosDistintos = 1;
      		contornosDistintos = 1;
      		break;
      	case 1:     		
      		tamOpcoes = 4;
      		coresDistintas = 1;
      		formasDistintas = 4;
      		tamanhosDistintos = 2;
      		contornosDistintos = 1;
      		break;
      	case 2:     		
      		tamOpcoes = 3;
      		coresDistintas = 3;
      		formasDistintas = 1;
      		tamanhosDistintos = 1;
      		contornosDistintos = 1;
			break;
		case 3:     		
      		tamOpcoes = 4;
      		coresDistintas = 1;
      		formasDistintas = 4;
      		tamanhosDistintos = 1;
      		contornosDistintos = 1;
			break;   
		case 4: 		
      		tamOpcoes = 5;
      		coresDistintas = 1;
      		formasDistintas = 3;
      		tamanhosDistintos = 1;
      		contornosDistintos = 2;
			break;
		case 5: 		
      		tamOpcoes = 5;
      		coresDistintas = 2;
      		formasDistintas = 2;
      		tamanhosDistintos = 1;
      		contornosDistintos = 2;
			break;
		case 6: 		
      		tamOpcoes = 5;
      		coresDistintas = 1;
      		formasDistintas = 3;
      		tamanhosDistintos = 2;
      		contornosDistintos = 1;
			break;
		case 7: 		
      		tamOpcoes = 6;
      		coresDistintas = 3;
      		formasDistintas = 3;
      		tamanhosDistintos = 1;
      		contornosDistintos = 1;
			break;
		case 8: 		
			tamOpcoes = 6;
			coresDistintas = 2;
			formasDistintas = 2;
			tamanhosDistintos = 1;
			contornosDistintos = 2;
			endGame= true;
		  	break;
      	default:
			alert("Fim do Jogo! Parabens!");
			break;
    }

	/*escolheras opções de resposta*/
    var divOps = document.getElementById(divOpcoes);
    
	console.log('escolher opcoes');
	for (i = 0; i < tamOpcoes; i++) { //Set imagens como opcoes, sendo uma delas o nucleo (arrayFigura[indice])
		if (arrayOpcoes[i] == null) {
			/*cria um elemento imagem e coloca a source*/
			var ehNovo = 0;
			while (!ehNovo) {
				ehNovo = 1;
				var novaOpcao = novaImgBlocoLogicoComRestricoes(arrayOpcoes, coresDistintas, formasDistintas, tamanhosDistintos, contornosDistintos);
				for (j = 0; j < tamOpcoes; j++) {
					if (arrayOpcoes[j] != null && novaOpcao.getAttribute('src') == arrayOpcoes[j].getAttribute('src')) {
						ehNovo = 0;
						break;
					}
				}
			}
			arrayOpcoes[i] = novaOpcao;
			console.log('Adicionado forma/opcao #' + i + ': src=' + arrayOpcoes[i].getAttribute("src"));
		}

		arrayOpcoes[i].setAttribute('id', 'opcao' + (i + 1)); //lincoln: diferenciando ID
		divOps.appendChild(arrayOpcoes[i]);
		console.log('Adicionado forma/opcao parte2 #' + i + ': id=' + arrayOpcoes[i].getAttribute("id") + ', src=' + arrayOpcoes[i].getAttribute("src"));
	}
}

function check() { //Verifica se acertou os elementos
	var arrayPrimeira= document.getElementById(divCaixa).getElementsByTagName('img');
	var arraySegunda= document.getElementById(divCaixa2).getElementsByTagName('img');
	var exibeResultado = document.getElementById('resultado-jogo');
	var i, j;
	var correto1 = 1, correto2 = 1;

	for(i=0; i< arrayPrimeira.length; i++){
		if(restricao1[0]!=null && arrayPrimeira[i].getAttribute('data-tipo') != restricao1[0]){
			correto1 = 0;
		}

		if(restricao1[1]!=null && arrayPrimeira[i].getAttribute('data-cor') != restricao1[1]){
			correto1 = 0;
		}

		if(restricao1[2]!=null && arrayPrimeira[i].getAttribute('data-tam') != restricao1[2]){
			correto1 = 0;
		}

		if(restricao1[3]!=null && arrayPrimeira[i].getAttribute('data-cont') != restricao1[3]){
			correto1 = 0;
		}
	}

	for(i=0; i< arrayPrimeira.length; i++){
		if(restricao2[0]!=null && arraySegunda[i].getAttribute('data-tipo') != restricao2[0]){
			correto2 = 0;
		}

		if(restricao2[1]!=null && arraySegunda[i].getAttribute('data-cor') != restricao2[1]){
			correto2 = 0;
		}

		if(restricao2[2]!=null && arraySegunda[i].getAttribute('data-tam') != restricao2[2]){
			correto2 = 0;
		}

		if(restricao2[3]!=null && arraySegunda[i].getAttribute('data-cont') != restricao2[3]){
			correto2 = 0;
		}
	}

	if(endGame == false) {

		if (correto) {
			exibeResultado.innerText = "Você acertou! Fase concluida"
			game(etapaAtual + 1)
		} else {
			exibeResultado.innerText = "Que pena, tente novamente!";
		}

	} else {

		exibeResultado.innerText = "Você concluiu o jogo! Parabens!";
	}
}
/** FIM FUNCOES DO JOGO */

document.addEventListener('load', game(0));
var botaoResultado = document.getElementById('botao-resultado');
botaoResultado.addEventListener('click', check); //lincoln: adicionado
//botaoResultado.onclick = check(); //lincoln: removido