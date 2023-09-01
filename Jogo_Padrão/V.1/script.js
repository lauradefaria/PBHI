
var arrayQuadrado =[];
var arrayTriangulo =[];
var arrayCirculo =[];

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
  if (event.currentTarget.id == 'dropBox1') {
      arrayQuadrado.push(id);
  }

  if(event.currentTarget.id == 'dropBox2'){
    arrayTriangulo.push(id);

  }

  if (event.currentTarget.id == 'dropBox3') {
    arrayCirculo.push(id);
  }

}

function noAllowDrop(ev) {
        ev.stopPropagation();
    }

function check(){
  let contQ=0, contT=0, contC=0, acertos=0, elem=0;

  for(var i = 0; i<3; i++){
    if(arrayCirculo[i] != null){
      elem++;
    }
    if(arrayQuadrado[i] != null){
      elem++;
    }
    if(arrayTriangulo[i] != null){
      elem++;
    }
  }
  
  if(elem != 6){  //Caso algum dos elementos esteja fora da caixa
    alert('Coloque todos os elementos');
    return;
  }

  /*Adiciona um contador para cada vez que o usuário acerta quadrados*/ 
  for (i = 0; i < 3; i++) {
    if(arrayQuadrado[i] == 'quadrado1' || arrayQuadrado[i] == 'quadrado2' || arrayQuadrado[i] == 'quadrado3'){
      contQ++;
    }
  }

  /*Adiciona um contador para cada vez que o usuário acerta quadrados*/ 
  for(i = 0; i < 3; i++){
    if(arrayTriangulo[i] == 'triangulo1' || arrayTriangulo[i] == 'triangulo2'){
      contT++;
    }
  }

  /*Acertos quadrado*/
  if(contQ == 3){
    console.log('Voce acertou os quadrados');
    acertos++;
  }
  else{
    console.log('Voce errou os quadrados');
  }
  
  /*Acertos triangulo*/
  if(contT == 2){
    console.log('Voce acertou os triangulos');
    acertos++;
  }
  else{
    console.log('Voce errou os triangulos');
  }
  
  /*Acertos circulo*/
  if(arrayCirculo[0] == 'circulo1' && arrayCirculo[1] == null){
    console.log('Voce acertou os circulos');
    contC++;
    acertos++;
  }
  else{
    console.log('Voce errou os circulos');
  }
  
  alert('Acertos ' + acertos + '/3');

  /*Analisa os acertos e erros*/
  if(contQ == 3 && contT == 2 && contC == 1){
    alert('Voce acertou todos. Parabens!');
  }
  if(contQ != 3 && contT != 2 && contC != 1){
    alert('Voce errou todos. Tente novamente!');
  }

  /*console.log(arrayQuadrado);
  console.log(arrayTriangulo);
  console.log(arrayCirculo);*/
}