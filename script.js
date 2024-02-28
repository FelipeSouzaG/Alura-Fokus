const html = document.querySelector('html');
const foco = document.querySelector('.app__card-button--foco');
const shortRest = document.querySelector('.app__card-button--curto');
const longRest = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const textTitle = document.querySelector('.app__title');
const startPauseButton = document.querySelector('#start-pause');
const altButton = document.querySelectorAll('.app__card-button');
const musicFoco = document.querySelector('#alternar-musica');
const music = new Audio('/sons/luna-rise-part-one.mp3');
music.loop = true;
const screenTime = document.getElementById('timer');
const musicIni = new Audio ('/sons/play.wav');
const musicPause = new Audio ('/sons/pause.mp3');
const musicEnd = new Audio ('/sons/beep.mp3');

let elapsedTime = 1500;
let interId = null;

musicFoco.addEventListener('change', () => {
    if(music.paused){
        music.play();
    }else{
        music.pause();
    }
})

foco.addEventListener('click', () => {
    if(interId){
        zerar();
        startPauseButton.innerHTML = '<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="Botão começar"><span>Começar</span>'
    }   
    elapsedTime = 1500;
    altContext('foco');
    foco.classList.add('active');
})

shortRest.addEventListener('click', () => {
    if(interId){
        zerar();
        startPauseButton.innerHTML = '<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="Botão começar"><span>Começar</span>'
    }
    elapsedTime = 300;
    altContext('descanso-curto');
    shortRest.classList.add('active');
    
})

longRest.addEventListener('click', () => {
    if(interId){
        zerar();
        startPauseButton.innerHTML = '<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="Botão começar"><span>Começar</span>'
    }
    elapsedTime = 900;
    altContext('descanso-longo');
    longRest.classList.add('active');
})

function altContext(context){
    mostrarTempo();
    altButton.forEach(function(context) {
        context.classList.remove('active');
    })
    html.setAttribute('data-contexto', context);
    banner.setAttribute('src', `/imagens/${context}.png`);
    switch (context) {
        case 'foco':
            textTitle.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;

        case 'descanso-curto':
            textTitle.innerHTML = `Que tal dar uma respirada,<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
        break;
        
        case 'descanso-longo':
            textTitle.innerHTML = `Hora de voltar a superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        break;
    
        default:
        break;
    }
}

const countdown = () => {
    if(elapsedTime <= 0){
        musicEnd.play();
        alert('Tempo finalizado');

        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo){
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        }
        
        zerar();
        return
    }
    elapsedTime -= 1;
    mostrarTempo();
} 

startPauseButton.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(interId){
        musicPause.play();
        zerar();
        return
    }
    musicIni.play();
    interId = setInterval (countdown, 1000);
    startPauseButton.innerHTML = '<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="Botão pausar"><span>Pausar</span>'
}

function zerar (){
    clearInterval(interId);
    startPauseButton.innerHTML = '<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="Botão começar"><span>Começar</span>'
    interId = null;
}

function mostrarTempo() {
    const temp = new Date(elapsedTime * 1000);
    const tempFormat = temp.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    screenTime.innerHTML = `${tempFormat}`;
}

mostrarTempo();
