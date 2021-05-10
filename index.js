import './assets/style/main.scss';

let card = document.getElementsByClassName("card");
let cards = [...card];
for (var i=0; i < cards.length; i++) {
  cards[i].addEventListener("click", displayCard);
};

var displayCard = function(){
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
}

// Fisher-Yates Shuffle
function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const cardDeck = document.querySelector(".cards");
function startGame() {
  var shuffledCards = shuffle(cards);
  for (var i=0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function(item){
      cardDeck.appendChild(item);
    });
  }
}

window.onload = startGame();