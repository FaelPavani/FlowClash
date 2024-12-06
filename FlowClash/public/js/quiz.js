
const $startGameButton = document.querySelector(".start-quiz"); 
const $questionsContainer = document.querySelector(".question-container");
const $answersContainer = document.querySelector(".answers-conteiner"); 
const $questionText = document.querySelector(".question"); 
const $nextQuestionButton = document.querySelector(".next-question"); 

$startGameButton.addEventListener("click", startGame); 
$nextQuestionButton.addEventListener("click", displayNextQuestion); 


let currentQuestionIndex = 0; 
let totalCorrect = 0; 


function startGame() {
    $startGameButton.classList.add("hide"); 
    $questionsContainer.classList.remove("hide"); 
    displayNextQuestion(); 
}


function displayNextQuestion() {
    resetState(); 

   
    if (question.length === currentQuestionIndex) {
        return finishGame(); 
    }

 
    $questionText.textContent = question[currentQuestionIndex].question;

    
    question[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button"); 
        newAnswer.classList.add("button", "answer"); 
        newAnswer.textContent = answer.text; 

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct;
        }
        $answersContainer.appendChild(newAnswer); 

       
        newAnswer.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild); 
    }
    $nextQuestionButton.classList.add("hide"); 
}


function selectAnswer(event) {
    const answerClicked = event.target; 

    
    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect"); 
        }
        button.disabled = true; 
    });

    
    if (answerClicked.dataset.correct === "true") {
        totalCorrect++;
    }

    $nextQuestionButton.classList.remove("hide"); 
    currentQuestionIndex++; 
}


function finishGame() {
    const totalQuestions = question.length; 
    let qtd_corretas = totalCorrect; 

   
    fetch("/quiz/inserir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_usuario: sessionStorage.getItem("ID_USUARIO"),
            qtd_corretas: qtd_corretas,
            qtd_total: totalQuestions
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);



        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                alert(`voce está inserindo os campos errados ou nao possui cadastro`)
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })




    let message = '';
    message = `<span class = 'nomeDoUsuario'>Parabéns por completar o quiz ${sessionStorage.getItem('NOME_USUARIO')}!!</span> <br>
                `
    $questionsContainer.innerHTML = message
    setTimeout(function() {
        window.location.href = 'dashboard.html';
      }, 2000); 
}



const question = [
    {
        question: "Qual é o nome da batalha de rima mais famosa de São Paulo?",
        answers: [
            { text: "Batalha do Real", correct: false },
            { text: "Batalha da Aldeia", correct: true },
            { text: "Batalha do Museu", correct: false },
            { text: "Batalha da Matriz", correct: false }
        ]
    },
    {
        question: "Qual elemento do hip-hop é essencial em batalhas de rima?",
        answers: [
            { text: "Breaking", correct: false },
            { text: "DJing", correct: false },
            { text: "MCing", correct: true },
            { text: "Graffiti", correct: false }
        ]
    },
    {
        question: "Qual é o formato mais comum das batalhas de rima?",
        answers: [
            { text: "Roda de free dance", correct: false },
            { text: "Disputa 1v1", correct: true },
            { text: "Coral de improviso", correct: false },
            { text: "Rima em grupo", correct: false }
        ]
    },
    {
        question: "O que significa o termo 'punchline' em uma batalha de rima?",
        answers: [
            { text: "A rima que finaliza uma batalha", correct: false },
            { text: "Uma rima com impacto forte", correct: true },
            { text: "Um erro de improviso", correct: false },
            { text: "O início do beat", correct: false }
        ]
    },
    {
        question: "Qual plataforma digital ajudou a popularizar as batalhas de rima?",
        answers: [
            { text: "Twitch", correct: false },
            { text: "YouTube", correct: true },
            { text: "Spotify", correct: false },
            { text: "TikTok", correct: false }
        ]
    },
    {
        question: "Qual MC ficou famoso por suas participações na Batalha da Aldeia?",
        answers: [
            { text: "Mano Brown", correct: false },
            { text: "Kant", correct: true },
            { text: "Rashid", correct: false },
            { text: "Rincon Sapiência", correct: false }
        ]
    },
    {
        question: "Qual é a principal característica das batalhas de rima freestyle?",
        answers: [
            { text: "Coreografias sincronizadas", correct: false },
            { text: "Improviso", correct: true },
            { text: "Rimas previamente escritas", correct: false },
            { text: "Instrumentos ao vivo", correct: false }
        ]
    },
    {
        question: "Qual evento anual reúne MCs para uma competição nacional?",
        answers: [
            { text: "Festival Hip-Hop SP", correct: false },
            { text: "Duelo Nacional de MCs", correct: true },
            { text: "Encontro de Aldeias", correct: false },
            { text: "RapFest", correct: false }
        ]
    },
    {
        question: "O que é o 'beat' em uma batalha de rima?",
        answers: [
            { text: "A base musical usada na disputa", correct: true },
            { text: "O intervalo entre rounds", correct: false },
            { text: "O jurado principal", correct: false },
            { text: "O MC que inicia a batalha", correct: false }
        ]
    },
    {
        question: "Quem geralmente avalia os MCs em batalhas de rima?",
        answers: [
            { text: "DJs", correct: false },
            { text: "Jurados", correct: true },
            { text: "Produtores", correct: false },
            { text: "Rappers famosos", correct: false }
        ]
    },
    {
        question: "Qual técnica de improviso é usada para responder o adversário diretamente?",
        answers: [
            { text: "Crossfit", correct: false },
            { text: "Rebuttal", correct: true },
            { text: "Flow invertido", correct: false },
            { text: "Freesync", correct: false }
        ]
    },
    {
        question: "Como um MC pode ser eliminado em uma batalha?",
        answers: [
            { text: "Perder o ritmo", correct: false },
            { text: "Receber menos votos", correct: true },
            { text: "Errar o tema", correct: false },
            { text: "Improvisar frases longas", correct: false }
        ]
    },
    {
        question: "Qual rapper nacional é conhecido por apoiar batalhas de rima?",
        answers: [
            { text: "Emicida", correct: true },
            { text: "Criolo", correct: false },
            { text: "Sabotage", correct: false },
            { text: "Djonga", correct: false }
        ]
    },
    {
        question: "Qual é o objetivo principal de uma batalha de rima?",
        answers: [
            { text: "Entreter o público", correct: false },
            { text: "Superar o adversário com criatividade", correct: true },
            { text: "Mostrar conhecimento teórico", correct: false },
            { text: "Ganhar prêmios em dinheiro", correct: false }
        ]
    },
    {
        question: "Qual cidade tem uma das cenas de batalhas de rima mais ativas do Brasil?",
        answers: [
            { text: "Recife", correct: false },
            { text: "São Paulo", correct: true },
            { text: "Manaus", correct: false },
            { text: "Curitiba", correct: false }
        ]
    },
    {
        question: "Qual é o significado de 'flow' nas batalhas de rima?",
        answers: [
            { text: "Volume da voz", correct: false },
            { text: "Forma como o MC entrega a rima", correct: true },
            { text: "Tempo de improvisação", correct: false },
            { text: "Ritmo do beat", correct: false }
        ]
    },
    {
        question: "Qual MC é famoso pelo uso de humor em suas batalhas?",
        answers: [
            { text: "Orochi", correct: false },
            { text: "Spinardi", correct: false },
            { text: "Sant", correct: true },
            { text: "Baco Exu do Blues", correct: false }
        ]
    },
    {
        question: "Qual termo é usado quando um MC rima algo muito criativo e impressiona o público?",
        answers: [
            { text: "Drop", correct: false },
            { text: "Hit", correct: false },
            { text: "Punch", correct: true },
            { text: "Freestyle", correct: false }
        ]
    },
    {
        question: "Qual é a regra básica das batalhas de rima?",
        answers: [
            { text: "Não usar palavras difíceis", correct: false },
            { text: "Improvisar sobre o tema dado", correct: true },
            { text: "Evitar atacar o adversário", correct: false },
            { text: "Sempre rimar frases longas", correct: false }
        ]
    },
    {
        question: "Qual rapper internacional é uma grande influência nas batalhas no Brasil?",
        answers: [
            { text: "Jay-Z", correct: false },
            { text: "Tupac", correct: false },
            { text: "Eminem", correct: true },
            { text: "Nas", correct: false }
        ]
    }
];
