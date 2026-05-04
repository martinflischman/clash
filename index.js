document.getElementById("new-deck").addEventListener("click", handleClick);
const drawCardsBtn = document.getElementById("draw-cards");
drawCardsBtn.addEventListener("click", drawCards);
const cardsContainer = document.getElementById("cards-container");

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
    });
}
