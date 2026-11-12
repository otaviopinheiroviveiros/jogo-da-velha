let vez = "X"
let tabuleiro = ["","","","","","","","",""]

const vitorias = [
    [0,1,2],[3,4,5],[6,7,8], // vitorias em linha
    [0,3,6],[1,4,7],[2,5,8], // vitorias vertical
    [0,4,8],[2,4,6] // vitorias diagonal
]
const quadrados = document.querySelectorAll(".conteiner-jogo button");
const conteiner = document.querySelector(".conteiner")

const  enviarNomesJOGADOREs  = document.getElementById("confirma-nomeJogador")
enviarNomesJOGADOREs.addEventListener("click",salvarNomesJOgadores)

const titulo = document.getElementById("titulo")
const texto = titulo.textContent
titulo.textContent = ""

texto.split("").forEach((letra) => {
    const span = document.createElement("span")
    span.textContent = letra === " " ? "\u00A0" : letra
    titulo.appendChild(span)
})

let jogadas = 0

quadrados.forEach(function (quadrado,indice){
    const jogada = new Audio("sons/jogada.mp3")
    quadrado.addEventListener("click", function () {
        if (quadrado.textContent === "") {
        quadrado.textContent = vez
        tabuleiro[indice] = vez
        jogadas++
        verificarVitoria()
        if(vez === "X"){
            jogada.pause();
            jogada.currentTime = 0;
            jogada.play();
            conteiner.style.background = "rgb(4, 4, 187)"
            vez = "O"
            quadrado.style.background = "rgb(236, 38, 38)"
        }else{
            jogada.pause();
            jogada.currentTime = 0;
            jogada.play();
            vez = "X"
            conteiner.style.background = "rgb(236, 38, 38)"
            quadrado.style.background = "rgb(4, 4, 187)"
        }
        }
    })
})


function verificarVitoria(){
    vitorias.forEach(trio=>{
        const a = trio[0]
        const b = trio[1]
        const c = trio[2]
    
        if(tabuleiro[a] !== "" && tabuleiro[a] === tabuleiro[b] && tabuleiro[b] === tabuleiro[c]){
            ganhador(tabuleiro[a])
        }else if(jogadas === 9){
            empate()
        }
    })
}

const mensagemzomba = document.getElementById("mensagemZombaria")
const divzombar = document.querySelector(".zombaria")
const janela = document.querySelector(".janela")

function ganhador(vencedor){  
    let pontosJogador1 = 0
    let pontosJogador2 = 0

    let placarJogador1 = localStorage.getItem("placarJogador1")
    let placarJogador2 = localStorage.getItem("placarJogador2")
    
    if(placarJogador1 >= 1){
        pontosJogador1 = Number(placarJogador1)
    }
    if(placarJogador2 >= 1){
        pontosJogador2 = Number(placarJogador2)
    }
    if(vencedor === "X"){
        pontosJogador1++
        localStorage.setItem("placarJogador1",pontosJogador1)
    }else if(vencedor === "O"){
        pontosJogador2++
        localStorage.setItem("placarJogador2",pontosJogador2)
    }

    // verifixcar zombaria
    if(pontosJogador1 === 5 && pontosJogador2 < 2){
        const jogador = localStorage.getItem("jogador2")
        const Audiozombaria = new Audio("sons/risadas.mp3")
        Audiozombaria.loop = true
        janela.style.display = "flex"
        Audiozombaria.play()
        divzombar.style.animationPlayState = "running"
        mensagemzomba.textContent = `caramba perdeu mais uma ${jogador}`
        setTimeout(()=>{
            Audiozombaria.pause()
            Audiozombaria.currentTime = 0;
            janela.style.display = "none"
            divzombar.style.animationPlayState = "paused"
        },5000)

    }else if(pontosJogador1 === 10 && pontosJogador2 < 5){
        const jogador = localStorage.getItem("jogador2")
        const Audiozombaria = new Audio("sons/risadaBOA.mp3")
        Audiozombaria.volume = 0.9
        janela.style.display = "flex"
        Audiozombaria.play()
        divzombar.style.animationPlayState = "running"
        mensagemzomba.textContent = `caramba ${jogador} ta perdeendo de ${placarJogador1} a ${placarJogador2}`
        setTimeout(()=>{
            Audiozombaria.pause()
            Audiozombaria.currentTime = 0;
            janela.style.display = "none"
            divzombar.style.animationPlayState = "paused"
        },8000)
    }

    if(pontosJogador2 === 5 && pontosJogador1 < 2){
        const jogador = localStorage.getItem("jogador1")
        const Audiozombaria = new Audio("sons/risadas.mp3")
        Audiozombaria.loop = true
        janela.style.display = "flex"
        Audiozombaria.play()
        divzombar.style.animationPlayState = "running"
        mensagemzomba.textContent = `caramba perdeu mais uma ${jogador}`
        setTimeout(()=>{
            Audiozombaria.pause()
            Audiozombaria.currentTime = 0;
            janela.style.display = "none"
            divzombar.style.animationPlayState = "paused"
        },5000)

    }else if(pontosJogador2 === 10 && pontosJogador1 < 5){
        const jogador = localStorage.getItem("jogador1")
        const Audiozombaria = new Audio("sons/risadaBOA.mp3")
        Audiozombaria.volume = 0.9
        janela.style.display = "flex"
        Audiozombaria.play()
        divzombar.style.animationPlayState = "running"
        mensagemzomba.textContent = `caramba ${jogador} ta perdeendo de ${placarJogador2} a ${placarJogador1}`
        setTimeout(()=>{
            Audiozombaria.pause()
            Audiozombaria.currentTime = 0;
            janela.style.display = "none"
            divzombar.style.animationPlayState = "paused"
        },8000)
    }

    atualizarPlacar();
    atualizarTabuleiro(vencedor);
}

const placarPlayer1 = document.getElementById("placarJOgador1")
const placarPlayer2 = document.getElementById("placarJOgador2")

function atualizarPlacar(){
    let placarJogador1 = localStorage.getItem("placarJogador1")
    let placarJogador2 = localStorage.getItem("placarJogador2")
    if(placarJogador1 === null && placarJogador2 === null){
        placarPlayer1.textContent = 0
        placarPlayer2.textContent = 0
    }else if(placarJogador1 >= 1 && placarJogador2 === null){
        placarPlayer1.textContent = placarJogador1
        placarPlayer2.textContent = 0
    }else if(placarJogador2 >= 1 && placarJogador1 == null){
        placarPlayer2.textContent = placarJogador2
        placarPlayer1.textContent = 0
    }else{
        placarPlayer1.textContent = placarJogador1
        placarPlayer2.textContent = placarJogador2
    }
    
}

function empate(){
    determinarJogadores()
    atualizarTabuleiro()
}

function atualizarTabuleiro(vencedor){
    tabuleiro = ["","","","","","","","",""]   
    jogadas = 0
    const vitoriaSong = new Audio("sons/vitoria-sons.mp3")
    const derrotaSong = new Audio("sons/derrota-son.mp3")
    quadrados.forEach((butao)=>{
        if(vencedor === "X"){
            butao.textContent = "X"
            butao.style.background = "red"
            butao.classList.add("butao-animacao")
            vitoriaSong.play()
            setTimeout(()=>{
                vitoriaSong.pause()
                vitoriaSong.currentTime = 0
                butao.textContent = ""
                butao.style.background = "white"
                butao.classList.remove("butao-animacao")
            },3000)

        }else if(vencedor === "O"){
            butao.textContent = "O"
            butao.style.background = "blue"
            butao.classList.add("butao-animacao")
            vitoriaSong.play()
            setTimeout(()=>{
                vitoriaSong.pause()
                vitoriaSong.currentTime = 0
                butao.textContent = ""
                butao.style.background = "white"
                butao.classList.remove("butao-animacao")
            },3000)
        }else{
            derrotaSong.play()
            butao.classList.add("butao-animacao")
            setTimeout(()=>{
                derrotaSong.pause()
                derrotaSong.currentTime = 0
                butao.textContent = ""
                butao.style.background = "white"
                butao.classList.remove("butao-animacao")
            },4000)
        }
    })

    // determinarJogadores()
}

// array dos dados dos jogadores
// para quando for restaurar tudo usar forEach
// dessa for faco o adventlist da linda 177
const dadosJogadores = ["jogador1","jogador2","placarJogador1","placarJogador2"]


const conteinerNOMEjogador = document.querySelector(".jogadoresNOME")
const conteinerTabuleiro = document.querySelector(".conteiner-jogo")
const divJogadores = document.querySelector(".jogadores")
const cabecalho = document.querySelector(".cabecalho-jogo-daVelha")
const conteinerplacar = document.querySelector(".placarJogadores")
const butaoRestaurar = document.getElementById("restaurarTUDo")

butaoRestaurar.addEventListener("click",()=>{
    dadosJogadores.forEach(dado=>{
        localStorage.removeItem(dado)
    })
    location.reload()
})

let muscicatocou = false
let entrada = null
function determinarJogadores(){
    if(muscicatocou){
        return
    } 
    entrada = new Audio("sons/entrada-jogo.mp3");
    entrada.loop = true
    let jogador1 = localStorage.getItem("jogador1")
    let jogador2 = localStorage.getItem("jogador2")
    if(jogador1 === null && jogador2 === null){
        document.addEventListener("click",()=>{
            entrada.volume = 0.2
            entrada.play()
            muscicatocou = true
        },{once: true})
        
        divJogadores.classList.remove("escondido")
    }else{
        divJogadores.classList.add("escondido")
        cabecalho.classList.remove("cabecalho-jogo-daVelha")
        cabecalho.classList.add("cabecalho-topo")
        conteinerTabuleiro.classList.remove("escondido")
        conteinerplacar.classList.remove("escondido")
        const jogador1nome = document.getElementById("jogador1NOME")
        const jogador2nome = document.getElementById("jogador2NOME")
        jogador1nome.textContent = jogador1
        jogador2nome.textContent = jogador2
    }
}

let time = null

function salvarNomesJOgadores(){
    if(time !== null){
        return
    }
    const card_mensagem = document.querySelector(".mesangemERRO")
    const jogador1 = document.getElementById("jogador1").value
    const jogador2 = document.getElementById("jogador2").value
    if(jogador1 === "" || jogador2 === ""){
        const mensagem = document.createElement("p")
        mensagem.textContent = "Erro: Por favor preencha os campos com os nomes dos jogadores"
        mensagem.className = "mensagem-erro"
        card_mensagem.appendChild(mensagem)
        time = setTimeout(()=>{
            card_mensagem.innerHTML = ""
            time = null
        },2000)
    }else{
        muscicatocou = false
        entrada.pause()
        entrada.currentTime = 0;
        localStorage.setItem("jogador1",jogador1)
        localStorage.setItem("jogador2",jogador2)
    }

    determinarJogadores()
}

atualizarPlacar();
determinarJogadores();