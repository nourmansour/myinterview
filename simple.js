/*
-------------------------------------------------------------------------
Interview Game
-------------------------------------------------------------------------
Purpose of this game:
- represents what user would imagine a job interview to be like

How the game will work: 
- interviewer asks questions about set of skills
- if interviewee answers correctly, stress level decreases by 15 points and interviewer appreciation level increases by 15 pts
- opposite is true for wrong answers
- game ends when questions run out or when score reaches 0 or 100

--------------------------------------------------------------------------
*/

var program, docList, interviewer, interviewee, randomQuesType, randomQuestion, progAnswer, docAnswer, qID, aID, gamPlaying, x, y, z;


interviewer = {
  title: "engineer",// Future idea: include different titles for interviewer and vary stress level penalty for answering wrongly
  appreciation: 50
};

interviewee = {
  stressLevel: 50,
  catPowerup: false// Future idea: provide ability to reduce stress level by clicking on button after multiple correct answers
};

// Event listeners for the two main game buttons
document.querySelector(".start-game").addEventListener('click', init);
document.querySelector(".submit-answer").addEventListener('click', submitAnswer);

// Initialization function; it sets all game elements to starting values and starts the game by printing the first randomized question 
// When the game ends, it resets all game elements to starting conditions
function init() {
program = ["Do your current work responsibilities require you to use programming?", "Do you have web development experience?", "What programming skills do you have?", "Do you understand the basic fundamentals of programming, e.g. if/else, loops?"];
docList = ["Why is documentation important?", "What is one of the first steps in code documentation?", "How do you figure out which components of code to document?", "Where is the best to keep code documentation?"];
progAnswer = ["Yes, I have had to use R and SPSS syntax to run data analysis for several projects.", "I have used my basic knowledge of Javascript, HTML, and CSS to develop an interview web app. You should try it :)", "I have basic knowledge in Javascript, Python, and R, and I am in the process of learning node.js and Java", "Yes, the skills I've learned in Python helped me build a good foundation to create a small interview website in Javascript! Hope this message doesn't repeat, repeat, repeat... :)"];
docAnswer = ["Whether you are looking back on code you wrote months ago, or you are trying to relate the purpose of your code to others, documentation provides the 'why' behind your code.", "Keep things simple and concise. Focus on documenting the purpose of code.", "It is important to document components of code that would not make sense without explaining the context. Documentation should guide us on where future extensions or fixes may be needed.", "Documentation is best kept with the source code because as code changes, it gets harder to keep external documentation up to date."];
  interviewee.stressLevel = 50;
  interviewer.appreciation = 50;
  document.getElementById("current-0").textContent = interviewee.stressLevel;
  document.getElementById("current-1").textContent = interviewer.appreciation;
  document.querySelector(".welcome-message").style.display = "none";
  document.querySelector(".question").style.display = "inline";
  document.querySelector(".submit-answer").style.display = "inline";
  document.querySelector(".radio-answer").style.display = "inline";
  document.querySelector(".cat-powerup").style.display = "none";
  document.querySelector(".start-game").style.display = "none";
  document.getElementById("name-0").style.visibility = "visible";
  document.getElementById("name-1").style.visibility = "visible";
  document.querySelector(".nour-pic").style.display = "block";
  document.querySelector(".interviewer-pic").style.display = "block";
  document.querySelector(".player-current-box").style.visibility = "visible";
  document.querySelector(".interviewer-current-box").style.visibility = "visible";
  document.querySelector(".win").style.display = "none";
  document.querySelector(".lose").style.display = "none";
  document.querySelector(".almost").style.display = "none";
  document.querySelector(".win-pic").style.display = "none";
  document.querySelector(".lose-pic").style.display = "none";
  document.querySelector(".almost-pic").style.display = "none";
  document.querySelector(".spirent-pic").style.display = "none";
  
// Get questions
  randomQuesType = randomQuesTypeFunc();
  randomQuestion = questionFunc(randomQuesType);
  document.querySelector(".question").textContent = randomQuestion;
// Match question with answer
  document.getElementById("AnswerP").firstChild.nodeValue = progAnswer[qID];
  document.getElementById("AnswerD").firstChild.nodeValue = docAnswer[qID];
  
}

// Used to randomize question type
function randomQuesTypeFunc() {
  return Math.round(Math.random());
}

// Used to randomize question for the corresponding question type
function questionFunc(qtype) {
  if (qtype === 0) {
    qID = Math.round(Math.random() * (program.length - 1));
    return program[qID];
  } else {
    qID = Math.round(Math.random() * (docList.length - 1));
    return docList[qID];
  }
}
/*
---------------------------------------------------------------------------------------------------------------
submitAnswer() 
---------------------------------------------------------------------------------------------------------------
Core function in the game:
- First, gets the user input and validates that answer is correct, thus awarding or deducting points
- Then, removes the previously asked question from the question list to avoid repeats
- Next, it checks length of question list and scores to decide win/lose/stalemate or continue to next question
---------------------------------------------------------------------------------------------------------------

*/

function submitAnswer() {
// x,y,z represent the input radio buttons
  
  x = document.getElementById("P-answer");
  y = document.getElementById("D-answer");
  z = document.getElementById("N-answer");
  
// Matching answer with question and updating scores
  
  if (x.checked) {
    if (randomQuesType === 0) {
      goodAnswer(15);
    } else {
      badAnswer(15);
    }
  }
  if (y.checked) {
    if (randomQuesType === 1) {
      goodAnswer(15);
    } else {
      badAnswer(15);
    }
  }
  if (z.checked) {
    badAnswer(15);
  }
  
// Remove question and answer from list to avoid repeat
  program.splice(qID, 1);
  docList.splice(qID, 1);
  progAnswer.splice(qID, 1);
  docAnswer.splice(qID, 1);
  
// Check length of question list and win/lose/stalemate
  
  if (program.length === 0) {
    if (interviewer.appreciation >= 80) {
      endGame();
      document.querySelector(".win").style.display = "block";
      document.querySelector(".win").textContent = "You scored " + interviewer.appreciation + " appreciation points. This means that we impressed the interviewer and I might become part of Spirent family!";
      document.querySelector(".win-pic").style.display = "block";
      document.querySelector(".spirent-pic").style.display = "block";
      resetRadio();
    } else if (interviewer.appreciation <= 10) {
      endGame();
      document.querySelector(".lose").style.display = "block";
      document.querySelector(".lose").textContent = "You scored " + interviewer.appreciation + " appreciation points. Unfortunately we panicked and it looks like we couldn't impress the interviewer this time! Let's try again and see if we can do better!";
      document.querySelector(".lose-pic").style.display = "block";
      resetRadio();
    } else {
      endGame();
      document.querySelector(".almost").style.display = "block";
      document.querySelector(".almost").textContent = "You scored " + interviewer.appreciation + " appreciation points. Not sure we impressed the interviewer enough! Let's try again and see if we can do better!";
      document.querySelector(".almost-pic").style.display = "block";
      resetRadio();
    }

  } else {
    if (interviewer.appreciation >= 100) {
      endGame();
      document.querySelector(".win").style.display = "block";
      document.querySelector(".win").textContent = "You scored " + interviewer.appreciation + " appreciation points. This means that we impressed the interviewer and I might become part of Spirent family!";
      document.querySelector(".win-pic").style.display = "block";
      document.querySelector(".spirent-pic").style.display = "block";
      resetRadio();
    } else if (interviewer.appreciation <= 0) {
      endGame();
      document.querySelector(".lose").style.display = "block";
      document.querySelector(".lose").textContent = "You scored " + interviewer.appreciation + " appreciation points. Unfortunately we panicked and it looks like we couldn't impress the interviewer this time! Let's try again and see if we can do better!";
      document.querySelector(".lose-pic").style.display = "block";
      resetRadio();
    } else {
// Move to next question
      randomQuesType = randomQuesTypeFunc();
      randomQuestion = questionFunc(randomQuesType);
      document.querySelector(".question").textContent = randomQuestion;
      document.getElementById("AnswerP").firstChild.nodeValue = progAnswer[qID];
      document.getElementById("AnswerD").firstChild.nodeValue = docAnswer[qID];
      resetRadio();
    }
  
  }
}

// Score updating functions
function goodAnswer(num) {
    interviewer.appreciation += num;
    interviewee.stressLevel -= num;
    document.getElementById("current-0").textContent = interviewee.stressLevel;
    document.getElementById("current-1").textContent = interviewer.appreciation;
}
function badAnswer(num) {
  interviewer.appreciation -= num;
  interviewee.stressLevel += num;
  document.getElementById("current-0").textContent = interviewee.stressLevel;
  document.getElementById("current-1").textContent = interviewer.appreciation;
}

// Radio button resetting function
function resetRadio() {   
  x.checked = false;
  y.checked = false;
  z.checked = false;
}

// Used to reset display properties when the game ends
function endGame() {
      document.querySelector(".question").style.display = "none";
      document.querySelector(".submit-answer").style.display = "none";
      document.querySelector(".radio-answer").style.display = "none";
      document.querySelector(".cat-powerup").style.display = "none";
      document.querySelector(".start-game").style.display = "block";
      document.getElementById("name-0").style.visibility = "hidden";
      document.getElementById("name-1").style.visibility = "hidden";
      document.querySelector(".nour-pic").style.display = "none";
      document.querySelector(".interviewer-pic").style.display = "none";
      document.querySelector(".player-current-box").style.visibility = "hidden";
      document.querySelector(".interviewer-current-box").style.visibility = "hidden";
      document.querySelector(".welcome-message").style.display = "hidden";
}