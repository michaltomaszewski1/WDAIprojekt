let quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('quiz_results');
let correct = 0;
let answered = [];

let questionList = [
  {
    question: "test1",
    answers: ['a', 'b', 'c'],
    correctAnswerID: 0
  },
  {
    question: "test2",
    answers: ['a', 'b', 'c'],
    correctAnswerID: 1
  }
]
function showQuestions(questions, quizContainer) {
  let output =[];
  let answers;

  for (let i = 0; i < questions.length; i++) {
    answers = [];
    for (let j = 0; j < questions[i].answers.length; j++) {
      answers.push(
        '<button class="quizanswer" id="answer_' + i + '_' + j + '">'
        + questions[i].answers[j] + '</button>'
      );
    }
    output.push(
      '<div class="question">' + questions[i].question + '</div>'
      + '<div class="answers">' + answers.join('') + '</div>'
    );
  }
  quizContainer.innerHTML = output.join('');
}


function validate(answerString, questions) {
  let answerID = answerString.split('_');
  console.log(answerID);
  if (answerID[1] in answered) {
    return;
  }
  let selectedAnswer = document.getElementById(answerString);
  // if (questionList[answerID[1]].correctAnswerID.toString() === answerID[2]) {
  //   correct++;
  //   selectedAnswer.classList.add('correct_answer');
  // }
  // else {
  //   selectedAnswer.classList.add('wrong_answer');
  // }
  if (questionList[answerID[1]].correctAnswerID.toString() === answerID[2]) {
    correct++;
  }
  selectedAnswer.classList.add('selected_answer');
  colorAnswers(answerID[1],questions);
  answered.push(answerID[1]);
  if (answered.length === questionList.length) {
    showResults(resultsContainer)
  }
}
function colorAnswers(questionID, questions) {
  for (let i = 0; i < questions[questionID].answers.length; i++) {
    let toColor = document.getElementById(`answer_${questionID}_${i}`);
    if (questions[questionID].correctAnswerID === i) {
      toColor.classList.add('correct_answer');
    } else {
      toColor.classList.add('wrong_answer');
    }
  }
}
function showResults(resultsContainer) {
  resultsContainer.innerHTML = `twój wynik to: ${correct}/${questionList.length}`;
}

const questionAnswered = e => {
  const isButton = e.target.nodeName === "BUTTON";

  if(!isButton) {
    return;
  }
  validate(e.target.id, questionList);
}

showQuestions(questionList,quizContainer);
quizContainer.addEventListener("click", questionAnswered);
