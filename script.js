
var startQuiz = document.getElementById("start_button");
var currentQuestion = document.getElementById("question_rendered");
var initialPageBtn = document.getElementById("initial_page_btn");
var clearScores = document.getElementById("clear_highscores_btn");
var timeEl = document.getElementById("clock");
var questionEl = document.getElementById("question_rendered");


//list of questions to loop through
var questions = [
    {
        question1: "in Street fighter (videogame) which is the nationality of the character named Ryu?",
        answers1: ["Brazil", "Japan", "USA", "Thailand"],
        correctIndex: 1
    },{
        question2: "In Super Mario Bros released in 1983, What is the name of the main villain?",
        answers2:["luigi","Koopa Troopa","Toad","bowser"],
        correctIndex:3
    },{
        question3:"In the videogame Super Mario Kart, what is the name of the very last race track?",
        answers3:["I5","luigi raceway","Rainbow road"],
        correctIndex:3
    },{
        question4:"In Street fighter II, what is the name of the final boss?",
        answers4:["Akuma","Blanca","Bison","Guile"],
        correctIndex:2
    },{
        question5:"what is the name of the composer of Super Mario Bross soundtrakcs?",
        answers5:["Koji Kondo","Shigeru Miyamoto","Alex D","John Smith"],
        correctIndex:0
    }

]
console.log(questions);

var initialTime = 120;




// to load the quiz content and render the initial question
function runQuiz(){
    startQuiz.addEventListener("click", function(event){
    event.preventDefault()
    runTimer();
    renderQuestions()
    });
    
}

function runTimer(){
    
    timeEl.textContent = initialTime;
    
    
var timer = setInterval(function() {
        initialTime--
    
        if (initialTime <= 0) {
            clearInterval(timer)
            /* displayGetNamePage() */
        } else {
            timeEl.textContent = initialTime;
        }
    
    }, 1000)
}
runQuiz();

function renderQuestions(){
    if(questionEl.className = "hidden_Q"){
        questionEl.classList.remove("hidden_Q");
    } else{
        questionEl.classList.add("hidden_Q")
    }
 currentQuestion.innerHTML = questions.question1;

}