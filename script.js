
var startQuiz = document.getElementById("start_button");
var currentQuestion = document.getElementById("question_rendered");
var initialPageBtn = document.getElementById("initial_page_btn");
var clearScores = document.getElementById("clear_highscores_btn");
var timeEl = document.getElementById("clock");
var questionEl = document.getElementById("question_rendered");
var quizPage = document.getElementById("question_section");
var ansLi = document.getElementById("answers_list");
var grade = document.getElementById("feedback");

//list of questions to loop through
var questions = [
    {
        question: "in Street fighter (videogame) which is the nationality of the character named Ryu?",
        answers: ["Brazil", "Japan", "USA", "Thailand"],
        correctIndex: 1
    },{
        question: "In Super Mario Bros released in 1983, What is the name of the main villain?",
        answers:["luigi","Koopa Troopa","Toad","bowser"],
        correctIndex:3
    },{
        question:"In the videogame Super Mario Kart, what is the name of the very last race track?",
        answers:["I5","luigi raceway","Rainbow road"],
        correctIndex:3
    },{
        question:"In Street fighter II, what is the name of the final boss?",
        answers:["Akuma","Blanca","Bison","Guile"],
        correctIndex:2
    },{
        question:"what is the name of the composer of Super Mario Bross soundtrakcs?",
        answers:["Koji Kondo","Shigeru Miyamoto","Alex D","John Smith"],
        correctIndex:0
    }

]
console.log(questions);

var initialTime = 120;
var questionIndex = 0;
var score = 0;




// to load the quiz content and render the initial question
function runQuiz(){
    startQuiz.addEventListener("click", function(event){
    event.preventDefault();
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

//this block of code allows to display and move through the array of questions and answers
function renderQuestions(){
    if(quizPage.className === "hidden_Q"){
        quizPage.classList.remove("hidden_Q");
    } else{
        quizPage.classList.add("hidden_Q")
    }
 currentQuestion.textContent = questions[questionIndex].question;
 for(i = 0; i < questions[questionIndex].answers.length; i++){
    var li = document.createElement("li")
    li.innerHTML = "<button>" + questions[questionIndex].answers[i] +"</button>";
    li.listIndex = i;
    ansLi.append(li);
 }

}
//this function checks if the answer clicked is correct and allows to move to the next question

function moveToNextQuestion(event){
    
        if (event.target.matches("button")){
            event.preventDefault();
        };
        /* if (questionIndex === questions.length-1){
            
        } */    

        var index = parseInt(event.target.parentElement.listIndex);
        
        compareAns(ansLi);
        hideQuestions();
        questionIndex++;
        renderQuestions();
 

function hideQuestions(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);;
    }
}

function compareAns(index){
    if(index === questions[questionIndex].correctIndex){
        var pEl = document.createElement("p");
        pEl.textContent = "Correct!"
        grade.appendChild(pEl);
        score++;
        
    } else {
        pEl.textContent = "Wrong!"
        initialTime = initialTime - 20;
    }
}
function hideQuestions(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);;
    }
}
ansLi.addEventListener("click",(moveToNextQuestion))

// moveToNextQuestion();
// renderQuestions();

}
runQuiz();