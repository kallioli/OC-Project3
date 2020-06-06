class Slider {

  constructor() {
    this.slideIndex = 1;
    this.pause = document.getElementById('pause');
    this.isPause = false;
    this.i;
    this.slides = document.getElementsByClassName("slide");

    this.showSlides(this.slideIndex);

    // Launch slides automatically
    this.slider=setInterval(()=>{
      this.next();
    },5000)

    // Play/Pause slider management
    this.pause.addEventListener('click',(e)=>{
      e.preventDefault();
      if(!this.isPause){
        this.isPause=true;
        clearInterval(this.slider);
        document.getElementById("btnPlayPause").className = 'fas fa-play-circle';
        
      }else{
        this.isPause=false;
        document.getElementById("btnPlayPause").className = 'fas fa-pause-circle';
        this.slider=setInterval(()=>{
          this.next();
        },5000)
      }
      
    })

    // previous slide onclick
    document.getElementById('prev').addEventListener('click',()=>{
      this.prev();
    })

    // next slide onclick
    document.getElementById('next').addEventListener('click',()=>{
      this.next();
    })

    // previous slide keyboard
    document.addEventListener('keydown', (e)=> {
    if (e.which === 37 || e.keyCode === 37 ) {
      this.prev();
    }
    })
    
    // next slide keyboard 
    document.addEventListener('keydown', (e)=> {
      if (e.which === 39 || e.keyCode === 39 ) {
        this.next();
      }
    })

  }

  // Display the slider
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = this.slides.length
    }
    for (this.i = 0; this.i < this.slides.length; this.i++) {
      this.slides[this.i].style.display = "none";
    }
    this.slides[this.slideIndex-1].style.display = "flex";
  }

  // Previous slide function
  prev() {
    this.showSlides(this.slideIndex);
    this.slideIndex--;
  }

  // Next slide function
  next() {
    this.showSlides(this.slideIndex);
    this.slideIndex++;
  }
}

let slider2 = new Slider();