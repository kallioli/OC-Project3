let slideIndex = 1;
showSlides(slideIndex);
console.log('tets');
//lancement automatique des slides
setInterval(()=>{
    showSlides(slideIndex);
    slideIndex++;
},5000)

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


//next keyboard 




function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

}