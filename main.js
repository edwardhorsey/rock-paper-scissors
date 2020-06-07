// dom variables

const answerBar = document.getElementById('answer-bar');
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score');
const roundsBar = document.getElementById('rounds');
const messageBar = document.getElementById('message');
const counter = document.getElementById('count');
const body = document.querySelector('body');

// js variables

let playerS = 0;
let computerS = 0;
let rounds = 0;
const threeStates = [
  'Can I take you to Vegas?',
  'It\'s OK to be normal',
  'Tyche can be cruel',
]


// functions


const updateScore = () => {
  roundsBar.innerHTML = rounds;
  playerScore.innerHTML = playerS;
  computerScore.innerHTML = computerS;
  if (rounds > 9) {
    messageBar.style.display = 'block';
  }
  if (playerS > computerS*1.5) {
    messageBar.innerHTML = threeStates[0];
    // happy theme
    body.classList += 'good'
  } else if (playerS < computerS*0.67) {
    messageBar.innerHTML = threeStates[2];
    // normal theme
    body.classList += 'bad'
  } else {
    messageBar.innerHTML = threeStates[1];
    // sad theme
    body.classList += 'normal'
  }
};

const setText = (constant, str) => {
  return constant.innerHTML = str;
};

const countDown = () => {
  setText(counter, '3');
  setTimeout(setText, 800, counter, '2');
  setTimeout(setText, 1600, counter, '1');
  setTimeout(setText, 2400, counter, 'Show');
};

// event listeners

const buttons = Array.from(document.getElementsByTagName('button'));
buttons.forEach(el => {
  el.addEventListener('click', () => {
    answerBar.innerHTML = '';
    rounds++;
    console.log(rounds);
    countDown();
    setTimeout(rpsRun, 2400, el.innerHTML);
  })
})

const rockPaperScissors = (choice) => {

  const options = ["Scissors", "Rock", "Paper"]; 
  const player = choice;
  const computer = options[Math.floor(Math.random() * 3)]
  /* 
  Using the logic that as long as the Player's answer is adjacent on the right side of the Computer's answer, the Player will always win.
                    [ ... < Scissors < Rock < Paper < Scissors < Rock < Paper < ... ]
  */
  const computeAnswer = (a, b) => {
      let p = options.indexOf(a) + 1             // change to normal indexing
      let c = options.indexOf(b) + 1
      if (p === c) { return "Push"; }
      if (p === 1) { p = 4; }                      // if at beginning of list, push to end
      return p - c === 1 ? "Player" : "Computer" ;
      }
  return [computeAnswer(player, computer), computer]; // return array with winner, and computer's hand
}

const rpsRun = (playerChoice) => {
  let arr = rockPaperScissors(playerChoice);
  if (arr[0] === "Push") { 
    answerBar.innerHTML = `Computer has ${arr[1]}. You draw.`;
  } else if (arr[0] === "Computer") {
      answerBar.innerHTML = `Computer has ${arr[1]}. You lose.`;
      computerS++;
  } else {
      answerBar.innerHTML = `Computer has ${arr[1]}. You win.`;
      playerS++;
  }
  return updateScore();
}