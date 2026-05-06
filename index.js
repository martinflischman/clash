document.getElementById("new-deck").addEventListener("click", handleClick);
const drawCardsBtn = document.getElementById("draw-cards");
drawCardsBtn.addEventListener("click", drawCards);
const cardsContainer = document.getElementById("cards-container");
const resultMsg = document.getElementById("result-msg");
const cardsRemaining = document.getElementById("cards-remaining");
const computerScore = document.getElementById("computer-score");
const playerScore = document.getElementById("player-score");

const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];

let deckId;
let cardsLeft = 0;
let playerWins = 0;
let computerWins = 0;
let gameWinner;

function handleClick() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      drawCardsBtn.removeAttribute("disabled");
      cardsRemaining.textContent = `Cards remaining: ${data.remaining}`;
      cardsRemaining.classList.remove("hidden");
    });
}

function drawCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      let cardsHtml = "";

      for (let card of data.cards) {
        cardsHtml += `<img src="${card.image}" alt="${card.value} of ${card.suit}" class="w-auto min-w-24 max-w-48">`;
      }

      if (data.remaining > 0) {
        cardsContainer.innerHTML = cardsHtml;
      }

      const roundWinner = getWinner(data.cards[0], data.cards[1]);
      computerScore.textContent = `Computer score: ${computerWins}`;
      playerScore.textContent = `Player score: ${playerWins}`;

      resultMsg.textContent = roundWinner;

      computerScore.classList.remove("hidden");
      playerScore.classList.remove("hidden");
      cardsLeft = data.remaining;
      cardsRemaining.textContent = `Cards remaining: ${data.remaining}`;

      if (cardsLeft === 0) {
        drawCardsBtn.setAttribute("disabled", true);
        drawCardsBtn.classList.add("disabled");
      }

      if (cardsLeft === 0 && computerWins > playerWins) {
        resultMsg.textContent = `The Computer Won 🤖`;
      } else if (cardsLeft === 0 && computerWins < playerWins) {
        resultMsg.textContent = `You Won! 🎉`;
      } else if (cardsLeft === 0 && computerWins === playerWins) {
        resultMsg.textContent = `It's a Tie 🤝`;
      }
    });
}

function getWinner(card1, card2) {
  const card1Score = cardValues.indexOf(card1.value);
  const card2Score = cardValues.indexOf(card2.value);

  if (card1Score > card2Score) {
    computerWins += 1;
    return "Computer wins round!";
  } else if (card1Score < card2Score) {
    playerWins += 1;
    return "You win round!";
  } else {
    return "War! ⚔️";
  }
}
