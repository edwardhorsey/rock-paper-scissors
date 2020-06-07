// dom variables

const answerBar = document.getElementById('answer-bar');
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score');
const roundsBar = document.getElementById('rounds')
const messageBar = document.getElementById('message')

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
  } else if (playerS < computerS*0.67) {
    messageBar.innerHTML = threeStates[2];
  } else {
    messageBar.innerHTML = threeStates[1];
  }
};

// event listeners

const buttons = Array.from(document.getElementsByTagName('button'));
buttons.forEach(el => {
  el.addEventListener('click', () => {
    rpsRun(el.innerHTML);
  })
})

const rockPaperScissors = (choice) => {

  const options = ["Scissors", "Rock", "Paper"]; 
  const player = choice;
  const computer = options[Math.floor(Math.random() * 3)]
  /* 
  Using the logic that as long as the Player's answer is on the right hand side of the Computer's answer, the Player will always win.
                    [ ... < Scissors < Rock < Paper < Scissors < Rock < Paper < ... ]
  */
  const computeAnswer = (a, b) => {
      let p = options.indexOf(a) + 1       // change to normal indexing
      let c = options.indexOf(b) + 1
      if (p === c) { return "Push"; }
      if (p === 1) { p = 4; }             // if at beginning of list, push to end
      return p - c === 1 ? "Player" : "Computer" ;
      }
  return [computeAnswer(player, computer), computer];
}

const rpsRun = (playerChoice) => {
  answerBar.innerHTML = '';
  rounds++;
  console.log(rounds);
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