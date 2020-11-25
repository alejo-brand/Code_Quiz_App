//declare our needed elements and store them variables
var startQuiz = document.getElementById("start_button");
var currentQuestion = document.getElementById("question_rendered");
var initialPageBtn = document.getElementById("initial_page_btn");
var clearScores = document.getElementById("clear_highscores_btn");
var timeEl = document.getElementById("clock");
var questionEl = document.getElementById("question_rendered");
var quizPage = document.getElementById("question_section");
var ansLi = document.getElementById("answers_list");
var grade = document.getElementById("feedback");
var final = document.getElementById("ending_page");
var timer;
var highscoresJSON = localStorage.getItem("highscore");
var highscores;
var submit = document.getElementById("submit_button")
var initials = document.getElementById("user_initials");
var highscoresPage = document.getElementById("highscore_page")
var score = document.getElementById("score");
var highscoreValue =  document.getElementById("highscores");


if (highscoresJSON){
    highscores = JSON.parse(highscoresJSON);
    
}else{
    highscores=[];


}



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
        answers:["I5","luigi raceway","Royal Raceway","Rainbow road"],
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
// var score = 0;




// to load the quiz content and render the initial question
function runQuiz(){
    startQuiz.addEventListener("click", function(event){
    event.preventDefault();
    runTimer();
    renderQuestions()
    });
    
}
//this function starts the timer when the user clicks start, and also calls the final score function if the time is up;
function runTimer(){
    
    timeEl.textContent = initialTime;
    
    
    timer = setInterval(function() {
            initialTime--
        
            if (initialTime <= 0) {
                finalScore()
               
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
    };
    currentQuestion.textContent = questions[questionIndex].question;

    for(i = 0; i < questions[questionIndex].answers.length; i++){
        
        var li = document.createElement("li")
        
        li.innerHTML = `<button data-index="${i}"> ${ questions[questionIndex].answers[i] }</button>`;
        li.className = "listBtns"
        
        li.listIndex = i;
        ansLi.append(li);
        console.log(ansLi);
    }

}
ansLi.addEventListener("click",(moveToNextQuestion))
//this function checks if the answer clicked is correct and allows to move to the next question

function moveToNextQuestion(event){

    event.preventDefault();
    if (event.target.matches("button")){
        var index = parseInt(event.target.dataset.index);
        console.log(index);
        
        compareAns(index);
        hideQuestions(ansLi);
        if (questionIndex === questions.length-1){
            
            finalScore();
            
        }else{   
        
            questionIndex++;
            console.log(questionIndex)
            renderQuestions();
        }
        
    };
}
//this function removes the parent elements from the DOM
function hideQuestions(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);;
    }
}
//here we check if the answer is correct 
function compareAns(index){
    var pEl = document.createElement("p");
    if(index === questions[questionIndex].correctIndex){
        console.log(pEl)
        pEl.textContent = "Correct!"
        // score++;
        
    } else {
        pEl.textContent = "Wrong!"
        initialTime = initialTime - 20;
    }
    grade.appendChild(pEl);
}


// in this annonymous function we listen to the click of the button submit and send the values entered by the user into a localStorage using the JSON.stringify method;
submit.addEventListener("click",function(){
    
    highscores.push({
        initials:initials.value,
        score:initialTime
    })
    localStorage.setItem("highscore",JSON.stringify(highscores))
    showHighscores();
})
//displays thie final score and stops the timer from running after the user finished the quiz or ran out of time
function finalScore(){
    if (final.className === "hidden"){
        final.classList.remove("hidden");
    }
    clearInterval(timer)
    score.textContent = initialTime;
}
// displays the highscores and get the values from localStorage using the JSON. parse method to then render them into the page
function showHighscores(){
    if (highscoresPage.className === "hidden"){
        highscoresPage.classList.remove("hidden");
    }
    var final = JSON.parse(localStorage.getItem("highscore"))||[]; 
    console.log(final);
    for (i = 0; i < final.length; i++ ){
        var pointsEl = document.createElement("p");
        pointsEl.innerHTML = final[i].initials + ": " + final[i].score
        highscoreValue.append(pointsEl);
    };
};
//allows the user to clear their score
clearScores.addEventListener("click",function(event){
    window.localStorage.clear();
    hideQuestions(highscoreValue);

});
//allows the user to play the game again
initialPageBtn.addEventListener("click",function(event){
    location.reload();
});

runQuiz();