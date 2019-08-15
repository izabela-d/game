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
var playerResult = 0;
var computerResult = 0;
var rounds = 0;

//zmiennna blokująca grę(przyciski)
var gameEnd = false;

//fukcjna rozpoczynająca nową grę
var newGame = function() {
  playerResult = 0;  //ustawianie początkowyh wartości przy klikaniu nowa gra
  computerResult = 0;
  rounds = 0;
  gameEnd = false;
  rounds = window.prompt('Podaj liczbę rund');
  rounds = parseInt(rounds);
  
  if (!isNaN(rounds)) {
    numberRounds.innerHTML = 'Wybrana ilość rund: ' + rounds;
  }
  else if (isNaN(rounds)) {
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
  resultDiv.innerHTML = 'Wynik gracza: ' + playerResult + '<br>';
  resultDiv.innerHTML += 'Wynik komputera: ' + computerResult;
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
    playerResult++;
  } 
  
  else if (playerMove === computerMove) {
    result = 'Remis!' + '<br>';
  }  
  else {
    computerResult++;
  } 
        
  if (playerResult > 0 && playerResult >= rounds) {
    displayOutput ('Wygrałeś całą grę !!!')
    gameEnd = true;
  }
  else if (computerResult > 0 && computerResult >= rounds){
    displayOutput ('Przegrałeś całą grę :( ')  
    gameEnd = true;
  }
  else {
    displayOutput (result + '<br>' + ' Twój ruch: ' + playerMove + '<br>' + ' Ruch komputera: ' + computerMove + '<br>')
  }
  
  displayResult(playerResult, computerResult);  
   
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

for (var i=0; i > allBtn.length; i++) {
  var dataMove = allBtn.getAttribute('data-move');
  allBtn[i].addEventListener('click', function(){
    playerMove(dataMove);
  })
};

