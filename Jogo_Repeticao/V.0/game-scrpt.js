var arrayCaixa =[];     //Elementros colocados na caixa de resposta
var nucleo = [];        //Array para guardar o nucleo
var arrayFiguras = [];  //Array contendo todos os elementos gerados
var tamNucleo;          //Quantos nucleos possui

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
  if (event.currentTarget.id == 'dropBox') {
      arrayCaixa.push(id);
  }
}

function noAllowDrop(ev) {
        ev.stopPropagation();
}  

document.body.onload = game;
function game(){
  
  //const queryString = window.location.search; //guarda tudo apos a ? (incluindo ela)
  //const urlParams = new URLSearchParams(queryString); //processa as variaveis, separando-as
  
  const etapa = 0;  //urlParams.get('etapa');     //pega o valor passado na variavel etapa

  var tamSeq;      //Tamanho da sequência do núcleo
  var tamOpcoes;   //quantidade de opções de resposta
  var i, flag, flag2, j;
  var aux= [];     //auxiliar para evitar repetições

  var fonte='';              //source de cada imagem
  var cor, tipo, tam, cont;  //Atributos de cada imagem (cor, tipo, tamanho e contorno)

  switch (etapa){

    case 0:
      /*Padronizado*/
      tamNucleo = 1;
      tamSeq = 7;
      tamOpcoes = 3;

      var divNucleo = document.getElementById('divSeq');  //div responsável pela sequencia do nucleo

      /*Gera um número aleatório de cor, tipo e grossura do nucleo*/
      cor = Math.floor(Math.random() * 3);
      tipo = Math.floor(Math.random() * 4);
      tam = Math.floor(Math.random() * 4);         //LEMBRAR DE MUDAR PARA 2
      //cont = Math.floor(Math.random() * 2);
      aux[0] = tipo;                             //Formato do elemento do nucleo
  
      /*Concatena para gerar a source e depois coloca-a no nucleo*/
      fonte = 'img/'+ cor.toString() + tipo.toString()+ tam.toString()+'.png';

      for(i=0;i<tamSeq;i++){
        /*cria um elemento imagem e coloca a source do nucleo*/
        nucleo[0] = document.createElement("img");
        nucleo[0].setAttribute('id', (i+1));
        nucleo[0].setAttribute('src', fonte);

        divNucleo.appendChild(nucleo[0]); 
      }
      
      /*Atribui a imagem do núcleo em um local alatório do array*/
      var divFormas = document.getElementById('formas');  
      var indice = Math.floor(Math.random() * tamOpcoes);

      arrayFiguras[indice] = document.createElement("img");
      arrayFiguras[indice].setAttribute('src', fonte);


      for(i=0; i<tamOpcoes; i++){            //Set imagens como opcoes, sendo uma delas o nucleo (arrayFigura[indice])

        if(i!=indice){
          flag=0;
          flag2=0;

          /*cria um elemento imagem e coloca a source*/
          arrayFiguras[i] = document.createElement("img");
          
          /*evitar que repita a imagem do núcleo mais de uma vez*/
          while(flag2==0){

            tipo = Math.floor(Math.random() * 4);

            /*percorre todo o for e incrementa variável caso seja igual a alguma já trabalhada*/
            for(j=0; j< tamOpcoes; j++){
              if(tipo == aux[j]){
                flag++;
              }        
            }
    
            if(flag==0){          //Não possui nenhuma igual sendo trabalhada
              flag2=1;
            }
          }

          /*Concatena para gerar a source e depois coloca-a no elemento*/
          fonte = 'img/'+ cor.toString() + tipo.toString()+ tam.toString()+'.png';
          arrayFiguras[i].setAttribute('src', fonte);
        }

        aux[i+1] = tipo;          //Formato de todas as figuras
        arrayFiguras[i].setAttribute('id', (i+1));
        arrayFiguras[i].setAttribute('draggable','true');
        arrayFiguras[i].setAttribute('droppable','false');
        arrayFiguras[i].setAttribute('ondragstart', 'drag(event)');
        divFormas.appendChild(arrayFiguras[i]); 
      }
      break;

    case 1:
      tamNucleo = 1;
      tamSeq = 7;
      tamOpcoes = 4;

      var divNucleo = document.getElementById('divSeq');  //Cria dinâmicamente uma div formas

      /*Gera um número aleatório de cor, tipo e grossura do nucleo*/
      cor = Math.floor(Math.random() * 3);
      tipo = Math.floor(Math.random() * 4);
      tam = Math.floor(Math.random() * 4);         //LEMBRAR DE MUDAR PARA 2
      //cont = Math.floor(Math.random() * 2);
  
      /*Concatena para gerar a source e depois coloca-a no nucleo*/
      fonte = 'img/'+ cor.toString() + tipo.toString()+ tam.toString()+'.png';

      for(i=0;i<tamSeq;i++){
        /*cria um elemento imagem e coloca a source do nucleo*/
        nucleo[0] = document.createElement("img");
        nucleo[0].setAttribute('id', (i+1));
        nucleo[0].setAttribute('src', fonte);

        divNucleo.appendChild(nucleo[0]); 
      }
      console.log(nucleo[0].getAttribute('src'));
      
      /*Atribui a imagem do núcleo em um local alatório do array*/
      var divFormas = document.getElementById('formas');  
      var indice = Math.floor(Math.random() * tamOpcoes);

      arrayFiguras[indice] = document.createElement("img");
      arrayFiguras[indice].setAttribute('id', (i+1));
      arrayFiguras[indice].setAttribute('src', fonte);

      var cor2 = cor;
      while((cor = Math.floor(Math.random() * 3))==cor2){}

      for(i=0; i<tamOpcoes; i++){            //Set imagens como opcoes, sendo uma delas o nucleo

        if(i!=indice){
          flag=0;
          flag2=0;

          /*cria um elemento imagem e coloca a source*/
          arrayFiguras[i] = document.createElement("img");
          arrayFiguras[i].setAttribute('id', (i+1));
          
          /*evitar que repita a imagem do núcleo mais de uma vez*/
          while(flag2==0){

            tipo = Math.floor(Math.random() * 4);

            /*percorre todo o for e incrementa variável caso seja igual a alguma já trabalhada*/
            for(j=0; j< tamOpcoes; j++){
              if(tipo == aux[j]){
                flag++;
              }        
            }
    
            if(flag==0){          //Não possui nenhuma igual sendo trabalhada
              aux[i] = tipo;
              flag2=1;
            }
          }

          /*Concatena para gerar a source e depois coloca-a no elemento*/
          fonte = 'img/'+ cor.toString() + tipo.toString()+ tam.toString()+'.png';
          arrayFiguras[i].setAttribute('src', fonte);
        }

        arrayFiguras[i].setAttribute('draggable','true');
        arrayFiguras[i].setAttribute('droppable','false');
        arrayFiguras[i].setAttribute('ondragstart', 'drag(event)');
        divFormas.appendChild(arrayFiguras[i]); 
        console.log("gerou Figuras");
      }
      break;
    default:
        console.log("nada aqui");
      break;
  }
}

function check(){          //Verifica se acertou os elementos

    var acerto=0, elemento, i, j;
  
    for(i=0; i<tamNucleo; i++){
      elemento = document.getElementById(arrayCaixa[i]);
        
      if(elemento!=null){
        for(j=0; j<tamNucleo; j++){
            if(elemento.getAttribute('src') == nucleo[j].getAttribute('src')){
            acerto++;
            }
        }
      }
    }
  
    if(acerto == tamNucleo){
      //var texto = document.getElementById('resultado_do_teste');
      //texto.innerText("Você acertou! Fase concluida");
      alert("Você acertou! Fase concluida");
    }
    else{
      //var texto = document.getElementById('resultado_do_teste');
      //texto.innerText("Você acertou! Fase concluida");
      alert("Que pena, tente novamente!");
    }
    alert("sextou");
  }