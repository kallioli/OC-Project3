let slideIndex = 1;
showSlides(slideIndex);
let pause=document.getElementById('pause');
//lancement automatique des slides
let slider=setInterval(()=>{
    showSlides(slideIndex);
    slideIndex++;
},5000)

let isPause=false;

pause.addEventListener('click',(e)=>{
  e.preventDefault();
  if(!isPause){
    isPause=true;
    clearInterval(slider);
    document.getElementById("btnPlayPause").className = 'fas fa-play-circle';
    
  }else{
    isPause=false;
    document.getElementById("btnPlayPause").className = 'fas fa-pause-circle';
    slider=setInterval(()=>{
      showSlides(slideIndex);
      slideIndex++;
    },5000)
  }

  
})

//back slide onclick
document.getElementById('prev').addEventListener('click',()=>{
    showSlides(slideIndex);
    slideIndex--;
})

//nextslide onclick
document.getElementById('next').addEventListener('click',()=>{
    showSlides(slideIndex);
    slideIndex++;
})

//back keyboard
document.addEventListener('keydown', function (e) {
  if (e.which === 37 || e.keyCode === 37 ) {
    showSlides(slideIndex);
    slideIndex--;
  }
})

//next keyboard 
document.addEventListener('keydown', function (e) {
  if (e.which === 39 || e.keyCode === 39 ) {
    showSlides(slideIndex);
    slideIndex++;
  }
})



function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
 
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  
  slides[slideIndex-1].style.display = "flex";
}