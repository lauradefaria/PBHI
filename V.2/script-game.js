var arrayQuadrado =[];
var arrayTriangulo =[];
let quad=0, tri=0;

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

var arraySource = ["img/quadrado2.png","img/quadrado1.png","img/quadrado3.png","img/triangulo1.png","img/triangulo2.png","img/circulo1.png"];

document.body.onload = adcElemento;
function adcElemento(){ 
      // cria um novo elemento div 
      // e dá à ele conteúdo
      var arrayFiguras = [];
      var divFormas = document.createElement("div");  
      divFormas.setAttribute("id", "formas");

      for(var i=0; i<4; i++){
        var nAleatorio = Math.floor(Math.random() * (5 + 1));
        arrayFiguras[i] = document.createElement("img");
        arrayFiguras[i].setAttribute('src', arraySource[nAleatorio]);
        if(nAleatorio<=2){
          quad++;
        }
        if(nAleatorio>2 && nAleatorio<=4){
          tri++;
        }
        divFormas.appendChild(arrayFiguras[i]);

      }

      // adiciona o novo elemento criado e seu conteúdo ao DOM 
      var divAtual = document.getElementById("div1"); 
      document.body.insertBefore(divFormas, divAtual); 
}

function check(){
  let contQ=0, contT=0, acertos=0;

  /*Adiciona um contador para cada vez que o usuário acerta quadrados*/ 
  for (i = 0; i < 4; i++) {
    if(arrayQuadrado[i] == 'img/quadrado2.png' || arrayQuadrado[i] == 'img/quadrado1.png' || arrayQuadrado[i] == 'img/quadrado3.png'){
      contQ++;
    }
  }

  /*Adiciona um contador para cada vez que o usuário acerta quadrados*/ 
  for(i = 0; i < 4; i++){
    if(arrayTriangulo[i] == 'img/triangulo1.png' || arrayTriangulo[i] == 'img/triangulo2.png'){
      contT++;
    }
  }

  /*Acertos quadrado*/
  if(contQ == quad){
    console.log('Voce acertou os quadrados');
    acertos++;
  }
  else{
    console.log('Voce errou os quadrados');
  }
  
  /*Acertos triangulo*/
  if(contT == tri){
    console.log('Voce acertou os triangulos');
    acertos++;
  }
  else{
    console.log('Voce errou os triangulos');
  }

  alert('Acertos ' + acertos + '/2');
  quad = tri = 0;
}