let quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('quiz_results');
let correct = 0;
let answered = [];

let questionList = [
  {
    question: 'Czy picie alkoholu jest zdrowe?',
    answers: ['Tak', 'Nie', 'Nie wiem'],
    correctAnswerID: 1
  },
  {
    question: 'Ile procent ma Romper Extreme?',
    answers: ['6%', '8,3%', '12%', '13,5%'],
    correctAnswerID: 2
  },
  {
    question: 'Wolisz Perłę Eksport czy Chmielową?',
    answers: ['Eksport', 'Chmielowa', 'Bez różnicy'],
    correctAnswerID: 1
  },
  {
    question: 'Czy każde piwo jest smakowe?',
    answers: ['Tak', 'Nie'],
    correctAnswerID: 0
  },
  {
    question: 'Co widnieje w logo Żubra?',
    answers: ['Piwo', 'Koza', 'Janosik', 'Tancerz', 'Żubr'],
    correctAnswerID: 4
  },
  {
    question: 'Ile kosztuje czteropak Kustosza?',
    answers: ['8zł', '10zł', '12zł', '16zł'],
    correctAnswerID: 0
  },
  {
    question: 'Podobał ci się quiz?',
    answers: ['Tak', 'Nie'],
    correctAnswerID: 0
  },
]
function showQuestions(questions, quizContainer) {
  let output =[];
  let answers;

  for (let i = 0; i < questions.length; i++) {
    answers = [];
    for (let j = 0; j < questions[i].answers.length; j++) {
      answers.push(
        '<button id="answer_' + i + '_' + j + '">'
        + questions[i].answers[j] + '</button>'
      );
    }
    output.push(
      '<div class="question_wrapper">' +
      '<div class="question">' + questions[i].question + '</div>' +
      '<div class="answers">' + answers.join('') + '</div>' +
      '</div>'
    );
  }
  quizContainer.innerHTML = output.join('');
}


function validate(answerString, questions) {
  let answerID = answerString.split('_');
  // console.log(answerID);
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
  let resultMessages = [
    `Wow! Uzyskałeś aż ${correct}/${questionList.length} punktów!<br>
    Jesteś prawdziwym smakoszem`,
    `Zdobyłeś ${correct}/${questionList.length} punktów!<br>
    Całkiem niezły wynik`,
    `Tylko ${correct}/${questionList.length} punktów?<br>
    Nie jesteś prawdziwym smakoszem`
  ]
  // let output = [];
  if (correct/questionList.length === 1) {
    resultsContainer.innerHTML = '<p>' + resultMessages[0] + '</p>';
  } else if (correct/questionList.length >= 0.7) {
    resultsContainer.innerHTML = '<p>' + resultMessages[1] + '</p>';
  }else {
    resultsContainer.innerHTML = '<p>' + resultMessages[2] + '</p>';
  }
  resultsContainer.scrollIntoView();
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
