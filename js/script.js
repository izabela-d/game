'use strict';

var paperMove = 'papier';
var stoneMove = 'kamien';
var scissorsMove = 'nozyce';

//Powiązanie przysików i div
var paperBtn = document.getElementById('paperButton');
var stoneBtn = document.getElementById('stoneButton');
var scissorsBtn = document.getElementById('scissorsButton');
var outputDiv = document.getElementById('output');
var resultDiv = document.getElementById('result');
var newGameBtn = document.getElementById('newGameButton');
var numberRounds = document.getElementById('numberOfRounds'); 


//Zmienne-wyniki graczy i liczba rund
var params = {
  playerResult: 0,
  computerResult: 0,
  rounds: 0
};


//zmiennna blokująca grę(przyciski)
var gameEnd = false;

//fukcjna rozpoczynająca nową grę
var newGame = function() {
  params.playerResult = 0;  //ustawianie początkowyh wartości przy klikaniu nowa gra
  params.computerResult = 0;
  params.rounds = 0;
  gameEnd = false;
  params.rounds = window.prompt('Podaj liczbę rund');
  params.rounds = parseInt(params.rounds);
  
  if (!isNaN(params.rounds)) {
    numberRounds.innerHTML = 'Wybrana ilość rund: ' + params.rounds;
  }
  else if (isNaN(params.rounds)) {
      numberRounds.innerHTML = 'Wpisano niepoprawną liczbę';
  }
  
}

// losowa liczba z zakresu 0 .. 1 pomnożona razy 3 i zaokrąglona w góre
var randomMove = function () {
  var moveNumber = Math.ceil(Math.random() * 3);
  
  if (moveNumber === 1) {
    return paperMove;
  }

  if (moveNumber === 2) {
    return stoneMove;
  }
  
  return scissorsMove;
  
}

//Funkcja wyświetlająca wygraną/przegraną/remis oraz ruchy graczy
var displayOutput = function(output) {
  outputDiv.innerHTML = output;
}

//Funkcja wyświetlająca wyniki graczy (po każdej rundzie)
var displayResult = function(playerResult, computerResult) { 
  resultDiv.innerHTML = 'Wynik gracza: ' + params.playerResult + '<br>';
  resultDiv.innerHTML += 'Wynik komputera: ' + params.computerResult;
  //Jeżeli wygrano/przegrano nie wyświetlaj wyników
  if (gameEnd) {
    resultDiv.innerHTML = '';
  }
  
};

//Fukcja playerMove- ruchy gracza i komptera
var playerMove = function(playerMove) {
  
  if (gameEnd) {    //Jeżeli koniec gry wyświetl komunikat
    displayOutput ('Koniec gry, proszę nacisnąć Nowa gra');
    playerMove.stopPropagation();
  }
  
  var computerMove = randomMove();
  var result = 'Przegrana :(' + '<br>';

  // wygrana gracza, który zagrał papier, jeśli drugi gracz zagrał kamień,
  // wygrana gracza, który zagrał kamień, jeśli drugi gracz zagrał nożyce,
  // wygrana gracza, który zagrał nożyce, jeśli drugi gracz zagrał papier.
  if ((playerMove === paperMove && computerMove === stoneMove)
     ||  (playerMove === stoneMove && computerMove === scissorsMove)
     ||  (playerMove === scissorsMove && computerMove === paperMove)) {
    result = 'Wygrales!' + '<br>';
    params.playerResult++;
  } 
  
  else if (playerMove === computerMove) {
    result = 'Remis!' + '<br>';
  }  
  else {
    params.computerResult++;
  } 
        
  if (params.playerResult > 0 && params.playerResult >= params.rounds) {
    displayOutput ('Wygrałeś całą grę !!!')
    gameEnd = true;
    showModal();
  }
  else if (params.computerResult > 0 && params.computerResult >= params.rounds){
    displayOutput ('Przegrałeś całą grę :( ')  
    gameEnd = true;
    showModal();
  }
  else {
    displayOutput (result + '<br>' + ' Twój ruch: ' + playerMove + '<br>' + ' Ruch komputera: ' + computerMove + '<br>')
  }
  
  displayResult(params.playerResult, params.computerResult);  //a tu coś zmienić?
   
}

//Słuchacz nowa gra
newGameBtn.addEventListener('click', function () {
    newGame() 
});

// paperMove, stoneMove, scissorsMove
/*paperBtn.addEventListener('click', function () {
  playerMove(paperMove) // paperMove = 1
}); 

stoneBtn.addEventListener('click', function () {
  playerMove(stoneMove)  // stoneMove = 2
});

scissorsBtn.addEventListener('click', function () {
  playerMove(scissorsMove)  // scissorsMove = 3
});*/

//pętla dla playerMove-etap2 zadania 13.3
var allBtn = document.querySelectorAll('.player-move');

for (var i=0; i < allBtn.length; i++) {
  var dataMove = allBtn[i].getAttribute('data-move');
  allBtn[i].addEventListener('click', function(){
    playerMove(dataMove);
  })
};


//modal  
var showModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.add('show');
};

// Mimo, że obecnie mamy tylko jeden link, stosujemy kod dla wielu linków. W ten sposób nie będzie trzeba go zmieniać, kiedy zechcemy mieć więcej linków lub guzików otwierających modale

/*var modalLinks = document.querySelectorAll('.show-modal');

for(var i = 0; i < modalLinks.length; i++){
  modalLinks[i].addEventListener('click', showModal);
}*/

// Dodajemy też funkcję zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close". 

var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}

// Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

// Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 

var modals = document.querySelectorAll('.modal');

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}


