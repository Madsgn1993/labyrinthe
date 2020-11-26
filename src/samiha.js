import $ from 'jquery';

const crossing = document.getElementById('croisement');
const quiz = document.getElementById('quiz');
const myQuestions = [
  /*
  {
    question: 'Brendan Eich invented JavaScript?',
    answers: {
      a: 'true',
      b: 'false',
    },
    correctAnswer: 'true',
  },
  {
    question: 'Node.js is a JavaScript package manager?',
    answers: {
      a: 'true',
      b: 'false',
    },
    correctAnswer: 'false',
  },
  {
    question: ' To ensure code quality can you use the tool jQuery?',
    answers: {
      a: 'true',
      b: 'false',
    },
    correctAnswer: 'false',
  },
  {
    question: 'The <body> section is the correct place to insert a JavaScript?',
    answers: {
      a: 'true',
      b: 'false',
    },
    correctAnswer: 'false',
  },
  */
  {
    question: 'Un flamant rose pèse quatre kilogrammes quand il se tient debout sur deux pattes. Combien de kilogrammes pèsera-t-il s\'il lève une patte ?',
    answers: {
      a: '2kg',
      b: '4kg',
    },
    correctAnswer: '4kg',
  },
  {
    question: 'Tu participes à une course cycliste. A un moment donné, tu doubles le deuxième. Tu deviens...',
    answers: {
      a: 'Premier',
      b: 'Deuxième',
    },
    correctAnswer: 'Deuxième',
  },
];

export function buildQuiz() {
  crossing.disabled = true;
  // variable pour stocker le contenu HTML
  const output = [];

  const currentQuestion = myQuestions[Math.floor(Math.random() * myQuestions.length)];
  const answers = [];

  for (const letter in currentQuestion.answers) {
    const isChecked = letter === 'a' ? 'checked' : '';
    // ajouter button en HTML
    answers.push(
      `<label>
        <input name="radio" type="radio" id="radio" value="${currentQuestion.answers[letter]}" ${isChecked}>
            ${letter} :
            ${currentQuestion.answers[letter]}
        </label>&nbsp;&nbsp;&nbsp;&nbsp;`,
      /* `<label>
        <input type="button" id="btn" value="${currentQuestion.answers[letter]}">

        </label>`, */
    );
  }

  output.push(
    `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers" id="answers"> ${answers.join('')} </div>`,
  );

  quiz.innerHTML = output.join('');
  /* const timer = setInterval(() => {
    quiz.innerHTML = '';
  }, 5000); */
  // TIMER
  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      seconds,
    };
  }

  function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      const t = getTimeRemaining(endtime);

      secondsSpan.innerHTML = `0${t.seconds}`.slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  initializeClock('clockdiv', deadline);
  return currentQuestion;
}

function showResults(currentQuestion) {
  const userAnswer = $('input[type=radio]:checked').val();
  const answers = document.getElementById('answers');
  const isCorrect = userAnswer === currentQuestion.correctAnswer;
  if (isCorrect) {
    answers.style.backgroundColor = 'lightgreen';
  } else {
    answers.style.backgroundColor = 'red';
  }
  return isCorrect;
}

crossing.addEventListener('click', () => {
  setTimeout(() => {
    const currentQuestion = buildQuiz();
    const submitButton = $('<button id="submit" class="btn btn-danger">Répondre</button>');
    $('#quiz').append(submitButton);
    /* const btn = document.getElementById('btn'); */
    submitButton.on('click', function () {
      const result = showResults(currentQuestion);
      $(this).remove();
      $('#quiz').append(`Tu as obtenu un <strong>${result.toString().toUpperCase()}</strong>...`);
      setTimeout(() => {
        $('.modal').modal('hide');
        $('#quiz').empty();
        crossing.disabled = false;
      }, 2500);
    });
  }, 500);
});
