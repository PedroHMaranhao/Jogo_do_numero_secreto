function textoTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute(){
    let chute = document.querySelector('input').value;

    if (chute == secretNumber){
        textoTela ('h1', 'Acertou!! o numero secreto é ' + secretNumber);
        let palavraTentativas = tentativas > 1 ? 'tentativas': 'tentativa';
        textoTela ('p', `Você acertou o número secreto em ${tentativas} ${palavraTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    } else {
        tentativas++;
        if (chute > secretNumber){
            textoTela ('p', 'O número secreto é menor');
        } else {
            textoTela ('p', 'O número secreto é maior');
        }
    }
    console.log('Você chutou: '+chute);
    limparCampo();
}

function randomNumber(){
    let numeroEscolhido = parseInt(Math.random() * maxElements + 1);
    
    if (listaSorteados.includes(numeroEscolhido)){
        return randomNumber();
    } else {
        listaSorteados.push(numeroEscolhido);
        console.log(listaSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    tentativas = 1;
    let quantidadeElementosLista = listaSorteados.length;
    console.log('quantidade de elementos na lista: '+quantidadeElementosLista);
    console.log('maximo de elementos: '+maxElements);
    if (quantidadeElementosLista == maxElements) {
        console.log('Você chegou até o limite dos numeros possíveis, reiniciando numeros...');
        listaSorteados = [];
    }
    secretNumber = randomNumber();
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);


    textoTela ('h1', 'Jogo do número secreto');
    textoTela ('p', 'Escolha um número entre 1 e 10');
    console.log('Numero secreto: '+secretNumber);
}

let tentativas;
let secretNumber;
let maxElements = 10;
let listaSorteados = [];

novoJogo();




