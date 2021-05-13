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

function cardOpen() {
  openedCards.push(this);
  var num = openedCards.length;
  if(num === 2){
    moveCounter();
    if(openedCards[0].type === openedCards[1].type){
      matched();
    } else {
      unmatched();
    }
  }
}

function matched(){
  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  openedCards = [];
}

function unmatched(){
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove("show", "open", "unmatched");
    openedCards[1].classList.remove("show", "open", "unmatched");
    enable();
    openedCards = [];
  }, 1000);
}

// disable cards temporarily
function disable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.add('disabled');
  });
}

// enable cards and disable matched cards
function enable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');
    for(var i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add("disabled");
    }
  })
}

function moveCounter(){    
  moves++;    
  counter.innerHTML = moves;
}

window.onload = startGame();