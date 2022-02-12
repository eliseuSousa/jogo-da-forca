var palavraSecreta;
var letrasCorretas = new Map();
var erros = [];
var acertos = [];
var play = true;
var listaDePalavras = ['avestruz','papagaio', 'gato', 'galinha','cachorro', 'morcego', 'tigre', 'elefante'];

// Pega o elemento correspondente ao botão de iniciar a partida 
var buttonStartPlayer = document.querySelector("#iniciar-jogo");

// Pega o elemento body
var body = document.querySelector("body");

// Adicionando o evento click no botão
buttonStartPlayer.addEventListener("click", function (event) {

    event.preventDefault();
    desenhaTabuleiroJogo();
    letrasCorretas.clear();
    erros.length = 0;
    acertos.length = 0;
    palavraSecreta = sortearPalavraSecreta();
    desenhaTracos(palavraSecreta);
    console.log(palavraSecreta);
    window.scroll(0, 500);
});

// Função para sortear a palavra secreta
function sortearPalavraSecreta() {

    var palavraSorteada = Math.floor(Math.random() * listaDePalavras.length);

    return listaDePalavras[palavraSorteada];
}

// Função que verifica se a chave pressionada é uma tecla
body.addEventListener("keypress", function (event) {
    
    event.preventDefault();
    if (play) {

        var caractere = event.key;
    
        if (/[a-z]/.test(caractere)) {

            verificarTeclaPressionada(caractere)
        }
    } else {

        alert("A partida foi concluída. Se quiser continuar jogando clique em INICIAR JOGO.");
    }
    
});

// Função que verifica se a tecla pressionada está na na palavra secreta
function verificarTeclaPressionada(letra) {

    var letrasPressionadas = new Map();
    for (var indice = 0; indice < palavraSecreta.length; indice++) {
        if (letra == palavraSecreta[indice]){
            letrasPressionadas.set(indice, letra);
            letrasCorretas.set(indice, letra);
        }
    }

    if (letrasPressionadas.size > 0) {
         
        if (acertos.includes(letra)){
            
            alert("A letra "+letra.toUpperCase()+" já foi digitada.");
        } else {

            desenhaLetraCorreta(letrasCorretas);
            verificarVencedor(letrasCorretas.size);
        }
        
        acertos.push(letra); 

    } else {

        if (erros.includes(letra)){
            
            alert("A letra "+letra.toUpperCase()+" já foi digitada.");
        } else {

            desenharLetraErrada(letra);
            erros.push(letra);
            desenharForca(erros.length);
            verificarFimDoJogo(erros.length);
        }
    }
}

function verificarFimDoJogo(qtdErros) {

    if (qtdErros == 8) {

        vocePerdeu();
        play = false;
    }
}

function verificarVencedor(qtdAcertos) {

    if (qtdAcertos == parseInt(palavraSecreta.length)) {
    
        voceVenceu();
        play = false;
    }
}

