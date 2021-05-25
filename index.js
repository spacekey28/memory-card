import './assets/style/main.scss';

let card = document.getElementsByClassName("card");
let cards = [...card];

const cardDeck = document.getElementById("cardDeck");

let moves = 0;
let counter = document.querySelector(".moves");

let matchedCard = document.getElementsByClassName("match");

var openedCards = [];

document.getElementById("restartGame").addEventListener("click", startGame);

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

window.onload = startGame();

function startGame() {
  openedCards = [];

  cards = shuffle(cards);
  for (var i=0; i < cards.length; i++) {
    cardDeck.innerHTML = "";
    [].forEach.call(cards, function(item){
      cardDeck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }

  moves = 0;
  counter.innerHTML = moves+" moves";

  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
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
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

function unmatched(){
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
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


var second = 0, minute = 0, hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute+"mins "+second+"secs";
    second++;
    if (second == 60){
      minute++;
      second = 0;
    }
    if (minute == 60){
      hour++;
      minute=0;
    }
  }, 1000);
}

function moveCounter(){
  moves++;
  counter.innerHTML = moves + " moves";
  if(moves == 1){
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}


let modal = document.getElementById("popup");
let closeIcon = document.querySelector(".close");

function congrats(){
  if(matchedCard.length == 16){
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // show modal congrats
    modal.classList.add("show");
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;

    closeModal();
  }
}

function closeModal(){
  closeIcon.addEventListener("click", function(e){
    modal.classList.remove("show");
    startGame();
  });
}

function startAgain(){
  modal.classList.remove("show");
  startGame();
}

for (var i=0; i < cards.length; i++) {
  let card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congrats);
};

