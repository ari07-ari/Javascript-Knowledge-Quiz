//selects element by id, the start button
var start = document.querySelector('#Start');
//selects element by id, the question.
var displayQue = document.querySelector("#que");

//this variable stores an array which stores objects with keys for each question, choice and the answer.
var questions = [{quest:'Commonly used data types DO NOT include:', choices:['strings', 'booleans', 'alerts', 'numbers'], ans:'booleans'},
                {quest:'The condition in an if/else statement is enclosed within___:', choices:['quotes', 'curly brackets', 'parenthesis', 'square brackets'], ans:'parenthesis' }, 
                {quest:'Arrays in JavaScript can be used to store', choices:['numbers and strings', 'other arrays', 'booleans', 'all of the above'], ans:'all of the above'},
                {quest:'String values must be enclosed within ___ when being assigned to variables.', choices:['commas', 'curly brackets', 'quotes', 'parenthesis'], ans:'curly brackets'},
                {quest:'A very useful tool used during development and debugging for printing content to the debugger is:', choices:['JavaScript', 'terminal/bash', 'for loops', 'console log'], ans:'for loops'}];
var index = 0;

//selects element by class, the card div
var card1EL = document.querySelector(".card1");
//selects element by id, the display of right/wrong answer
var correcttEl = document.querySelector("#correct");
//selects the element by class, the time div
var timeEl = document.querySelector(".time");
var mainEl = document.querySelector('#main');
//selects the element by class, the div class buttonopt
var buttonopt = document.querySelector('.buttonopt');
//selects the element by class, the selector class buttonopt
var box1 = document.querySelector('.box1');

//elements for the final form
var end = document.querySelector('.end');
var text = document.querySelector('#text');
var initials = document.querySelector('.initials');

//display functions elements
var input = document.querySelector('#input-task');
var submit= document.querySelector('#submit');
var hide = document.querySelector('.hide');

//highscore function elemenst
var highscoreEl = document.querySelector('.highscore');
var highscorelist = document.querySelector('#highscorelist');
var back = document.querySelector('#back')
var clear = document.querySelector('#clear')






//sets the background colour to white
box1.style.backgroundColor = '#eff5f8';




//when you click the start button, the question will be displayed
start.addEventListener('click', function(){
    index=0;
    buttonopt.setAttribute('class', 'buttonopt hidden');
    buttonopt.style.backgroundColor = '#eff5f8';
    //calls the displayquestion function
    displayQuestion();
    //calls the deductime function
    deductime(); 

})



//a function that displays the questions and the options
function displayQuestion (){
   
    box1.style.backgroundColor = '#e1e2bc';
    card1EL.innerHTML=""; //clears (all elevents in children from card1El)
    
    //in the question array at the given index, display the question
    displayQue.textContent=questions[index].quest;
    console.log("hello", index);
    console.log(questions[index]);

    // inside the array, it will call the key for choices and then create buttons
        for (let i = 0; i < questions[index].choices.length; i++) {
            
            var button = document.createElement('button');
            console.log(button);
            button.textContent=questions[index].choices[i];
            card1EL.appendChild(button);

            //a button when they click on one of the options
            button.addEventListener('click', function(){

                // and if stament if the users picks one of the options(buttons), then increase index and it will jump to the
                //next question, and display if it's correct or incorrect. As well as showing the time
                if (questions[index].choices[i] === questions[index].ans) {
                    correcttEl.textContent='Correct!';
                    ++index;
                    displayQuestion();
                    
                }
                else {
                    correcttEl.textContent='Incorrect!';
                    ++index;

                    timeEl.textContent = "Time: " + secondsLeft + " seconds left."; 
                    displayQuestion();
                    
                }    
                 
            })
            
        }
        
        
}

//time (works but idk how to reduct time)
var secondsLeft = 60;

//a function deductime that will countdown the time starting at 60 seconds.
function deductime (){
    //sets an interval
    var timerInterval = setInterval(function() {
        //reduce secondsleft
        secondsLeft--;

        //displays the time with the seconds left
        timeEl.textContent = "Time: " + secondsLeft + " seconds left.";
    
        //if time is 0 then clear time and move to final score
        if(secondsLeft === 0 || index > 4)  {
            timeEl.textContent = "";
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          displayform();
        }  
      }, 1000); 
}


//it transfers the functions from the displayed questions to the final score
function next(){
    displayQuestion();
    displayform(); 
}


// this functions displays the final score, and it creates a button to submit the input
function displayform() {
//create title
box1.style.backgroundColor = '#eff5f8';
box1.setAttribute('class', "box1 hidden"); //clears (all elevents in children from card1El)
end.setAttribute('class',"end")

//display final score
text.textContent = "Your final score is " + secondsLeft + " points.";

//button submit to submit the input value to the high score list function
     submit.addEventListener('click', function(e){
        e.preventDefault();
      highscore();
    })

    
    
}



//funtion that creates a list and displays the initials input with the final score
function highscore(){
    end.setAttribute('class', 'hide')
    hide.setAttribute('class', "hide")
    highscoreEl.setAttribute('class',"highscore")

    //creates a list
    var li = document.createElement('li');

    //the text is the input value + the score
    var inputTask = input.value
    li.textContent= inputTask + "-" + secondsLeft;  
    highscorelist.appendChild(li);

    
    //this button clears the list score created
    clear.addEventListener('click', function(){
        highscorelist.textContent='';
    })

    //this button goes back to the initial point (start) and is able to repeat the quiz.
    back.addEventListener('click', function(){
        highscoreEl.setAttribute('class', 'highscore hidden');
        buttonopt.setAttribute('class', 'buttonopt');
        box1.setAttribute('class', "box1");
        correcttEl.textContent="";
        displayQue.textContent="";
        buttonopt.style.backgroundColor = '#e1e2bc';
    });
}

