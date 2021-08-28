var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }

  slides[slideIndex-1].style.display = "block";  
}

// game crsl
var gameIndex = 1;
showGame(gameIndex);

function plusGames(n){
  showGame(gameIndex+=n);
}

function currentGame(n){
  showGame(gameIndex=n);
}

function showGame(n){
  var i;
  var slides = document.getElementsByClassName("game");
  if (n > slides.length) {gameIndex = 1}
  if (n < 1) {gameIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slides[gameIndex-1].style.display = "block";
  dots[gameIndex-1].className += " active";
}