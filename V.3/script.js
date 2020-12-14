//import {Draggable} from '@shopify/draggable';
var arrayPrimeira =[];    //Quadrados
var arraySegunda =[];     //Triangulo
var arrayFiguras = [];     //Array contendo todos os elementos gerados

function allowDrop(event){

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
  if (event.currentTarget.id == 'dropBox1') {
      arrayPrimeira.push(id);
  }

  if(event.currentTarget.id == 'dropBox2'){
    arraySegunda.push(id);

  }
}

function noAllowDrop(ev) {
        ev.stopPropagation();
    }

document.body.onload = adcElemento;
function adcElemento(){ 

  var divFormas = document.getElementById('formas');  //Cria dinâmicamente uma div formas

  var fonte='';              //source de cada imagem
  var cor, tipo, tam;  //Atributos de cada imagem
  
  for(var i=0; i<4; i++){            //Prepara as 6 imagens

    /*Gera um número aleatório de cor, tipo e grossura*/
    cor = Math.floor(Math.random() * 3);
    tipo = Math.floor(Math.random() * 4);
    tam = Math.floor(Math.random() * 2);

    /*cria um elemento imagem e coloca a source*/
    arrayFiguras[i] = document.createElement("img");
    arrayFiguras[i].setAttribute('id', (i+1));

    /*Concatena para gerar a source e depois coloca-a no elemento*/
    fonte = 'img/'+ cor.toString() + tipo.toString()+ tam.toString()+'.png';
    arrayFiguras[i].setAttribute('src', fonte);
    console.log(arrayFiguras[i].getAttribute('src'));

    /*Atributo da cor da imagem*/
    switch(cor){
      case 0:
        arrayFiguras[i].setAttribute('data-cor', 'Azul');
        break;
      case 1:
        arrayFiguras[i].setAttribute('data-cor', 'Vermelho');
        break;
      default:
        arrayFiguras[i].setAttribute('data-cor', 'Amarelo');
        break;
    }

    /*Atributo do tipo da imagem*/
    switch(tipo){
      case 0:
        arrayFiguras[i].setAttribute('data-tipo', 'Triangulo');
        break;
      case 1:
        arrayFiguras[i].setAttribute('data-tipo', 'Quadrado');
        break;
      case 2:
        arrayFiguras[i].setAttribute('data-tipo', 'Retangulo');
        break;
      default:
        arrayFiguras[i].setAttribute('data-tipo', 'Circulo');
        break;
    }

    /*Atributo da grossura da imagem*/
    if(tam == 0){
      arrayFiguras[i].setAttribute('data-tamanho', 'Pequena');
    }
    else{
      arrayFiguras[i].setAttribute('data-tamanho', 'Grande');
    }

  /*const lista = document.getElementById('formas');
    const movimentoItem = new draggable.droppable(lista, {
      draggable: 'img',
      dropzone: 'img'
    })*/

    console.log(arrayFiguras[i].getAttribute('data-cor'));
    console.log(arrayFiguras[i].getAttribute('data-tipo'));
    console.log(arrayFiguras[i].getAttribute('data-tamanho'));
    arrayFiguras[i].setAttribute('draggable','true');
    arrayFiguras[i].setAttribute('droppable','false');
    arrayFiguras[i].setAttribute('ondragstart', 'drag(event)');

    arrayFiguras[i].setAttribute('width', '200');
    divFormas.appendChild(arrayFiguras[i]); 
  }
}

function check(){                //Confere se acertou
  let flagQ=0, flagT=0, elemento=0, elemento2=0, acertos=0;

  for(var i=0; i<4; i++){
    /*Adiciona um contador para saber se o usuário acerta quadrados*/ 
    elemento = document.getElementById(arrayPrimeira[i]);
    if(elemento != null){
      if((elemento.getAttribute('data-tipo')) != 'Quadrado'){
        flagQ++;
      }
    }

    /*Adiciona um contador para saber se o usuário acerta triangulos*/ 
    elemento2 = document.getElementById(arraySegunda[i]);
    if(elemento2 != null){
      if((elemento2.getAttribute('data-tipo')) != 'Triangulo'){
        flagT++;
      }
    }
  }

  /*Verifica todas as situações de resposta*/
  if(flagQ != 0 && flagT != 0){
    //var texto = document.getElementById('resultado_do_teste1');
    //texto.innerText('Quadrados e triangulos errados... Tente novamente!');
    alert("Quadrados e triangulos errados... Tente novamente!");
  }
  if(flagQ != 0 && flagT == 0){
    //var texto = document.getElementById('resultado_do_teste2');
    //texto.innerText('Quadrados errados... Tente novamente!');
    alert("Quadrados errados... Tente novamente!");
  }
  if(flagQ == 0 && flagT != 0){
    //var texto = document.getElementById('resultado_do_teste3');
    //texto.innerText('Triangulos errados... Tente novamente!');
    alert("Triangulos errados... Tente novamente!");
  }
  if(flagQ == 0 && flagT == 0){
    //var texto = document.getElementById('resultado_do_teste4');
    //texto.innerText('Todos corretos... Parabéns!');
    alert("Todos corretos... Parabens!");
  }
}
