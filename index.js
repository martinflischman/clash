document.getElementById("new-deck").addEventListener("click", handleClick);
const drawCardsBtn = document.getElementById("draw-cards");
drawCardsBtn.addEventListener("click", drawCards);
const cardsContainer = document.getElementById("cards-container");

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

function handleClick() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      drawCardsBtn.removeAttribute("disabled");
    });
}

function drawCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      let cardsHtml = "";

      for (let card of data.cards) {
        cardsHtml += `<img src="${card.image}" class="w-auto min-w-24 max-w-48">`;
      }

      cardsContainer.innerHTML = cardsHtml;

      getWinner(data.cards[0], data.cards[1]);
    });
}

function getWinner(card1, card2) {
  const card1Score = cardValues.indexOf(card1.value);
  const card2Score = cardValues.indexOf(card2.value);

  if (card1Score > card2Score) {
    console.log("Card 1 wins");
  } else if (card1Score < card2Score) {
    console.log("Card 2 wins");
  } else {
    console.log("It's a tie!");
  }
}
