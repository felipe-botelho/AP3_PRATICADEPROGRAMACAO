const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("resposta"));
const textoPerg = document.getElementById('textoPerg');
const scoreText = document.getElementById('score');
const barraProgresso = document.getElementById("barraProgresso");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

/* Local JSON file : questions.json */
let questions = [
    {
        question: "A COVID-19 é uma família de: ",
        choice1: "Bactérias",
        choice2: "Vírus",
        choice3: "Fungos",
        choice4: "Nenhuma das respostas anteriores",
        answer: 2
    },
    {
        question: "Em que ano ocorreram as primeiras infecções por COVID-19? ",
        choice1: "2018",
        choice2: "2019",
        choice3: "2020",
        choice4: "Nenhuma das respostas anteriores",
        answer: 2
    },
    {
        question: "Qual a maneira MAIS eficaz para realizar limpezas e desinfecção da COVID-19?",
        choice1: "Desinfetantes",
        choice2: "Água e sabão",
        choice3: "Álcool",
        choice4: "Nenhuma das respostas anteriores",
        answer: 2
    },
    {
        question: "Quais destes sintomas NÃO é  um sintoma de COVID-19?",
        choice1: "Falta de ar",
        choice2: "Dor de garganta",
        choice3: "Dor nos olhos",
        choice4: "Nenhuma das respostas anteriores",
        answer: 3
    },
    {
        question: "Quais desses exames NÃO constata a COVID-19?",
        choice1: "RT-PCR",
        choice2: "Exame de sangue",
        choice3: "Sorologia",
        choice4: "Nenhuma das respostas anteriores",
        answer: 2
    },
    {
        question: "Como NÃO ocorre a transmissão pelo COVID-19?",
        choice1: "Pelo espirro",
        choice2: "Pelo ar",
        choice3: "Pela tosse",
        choice4: "Nenhuma das alternativas anteriores",
        answer: 2
    },
    {
        question: "De acordo com a OMS, qual a distância mínima segura para a não transmissão da COVID-19?",
        choice1: "2 metros",
        choice2: "1 metro",
        choice3: "3 metros",
        choice4: "Nenhuma das alternativas anteriores",
        answer: 1
    },
    {
        question: "Depois de contaminado, após quantos dias os primeiros sintomas aparecem?",
        choice1: "De 5 a 10 dias",
        choice2: "De 2 a 10 dias",
        choice3: "De 15 a 20 dias",
        choice4: "Nenhuma das alternativas anteriores",
        answer: 4
    },
    {
        question: "Depois de diagnosticado, qual o tempo mínimo de quarentena para o paciente?",
        choice1: "15 dias",
        choice2: "12 dias",
        choice3: "10 dias",
        choice4: "Nenhuma das alternativas anteriores",
        answer: 3
    },
    {
        question: "De quanto em quanto tempo devemos trocar a máscara de tecido?",
        choice1: "De 1 em 1 hora",
        choice2: "De 2 em 2 horas",
        choice3: "De 3 em 3 horas",
        choice4: "A máscara não precisa ser trocada.",
        answer: 2
    },
    {
        question: "Qual o país com maior número de mortes por COVID-19?",
        choice1: "Estados Unidos",
        choice2: "Índia",
        choice3: "Brasil",
        choice4: "Nenhuma das alternativas anteriores",
        answer: 1
    },
    {
        question: "Qual o único país do mundo que teve menos de 5 infecções por COVID-19 até hoje?",
        choice1: "Saara Ocidental",
        choice2: "Vaticano",
        choice3: "Anguila",
        choice4: "Nenhuma das alternativas anteriores",
        answer: 3
    },
];

const correto_BONUS = 10;
const MAX_QUESTIONS = 12;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
    
        return window.location.assign("fim.html");
    }

    questionCounter++;
    textoPerg.innerHTML = `Pergunta ${questionCounter}/${MAX_QUESTIONS}`;
    
    barraProgresso.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectAnswer = selectedChoice.dataset["number"];

        const classToApply = selectAnswer == currentQuestion.answer ? 'correto' : 'incorreto';

        if (classToApply === "correto") {
            incrementScore(correto_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerHTML = score;
}

startGame();
