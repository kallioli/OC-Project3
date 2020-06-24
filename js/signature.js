class Signature {

    constructor (div, width, height){
      this.div = document.getElementById(div);
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.div.appendChild(this.canvas);
      this.init();
      this.isDrawing = false;
      this.clearBtn = document.getElementById('sig-clearBtn');

      // Mouse event support
      this.canvas.addEventListener("mousedown", (event)=> {
        this.lastMousePosition.x = event.offsetX;
        this.lastMousePosition.y = event.offsetY;
        this.isDrawing = true;
      })

      this.canvas.addEventListener("mousemove", (event)=> {
        if (this.isDrawing) {
            this.ctx.moveTo(this.lastMousePosition.x, this.lastMousePosition.y);
            this.ctx.lineTo(event.offsetX, event.offsetY);
            this.ctx.stroke();
            this.empty = false;
            this.lastMousePosition.x = event.offsetX;
            this.lastMousePosition.y = event.offsetY;
        }
      })

      window.addEventListener("mouseup", (event)=>{
        this.isDrawing = false;      
      })

      // Touch event support
      this.canvas.addEventListener("touchstart", (event)=> {
        if (event.target == this.canvas) {
            event.preventDefault();
        }
        this.lastMousePosition.x = event.touches[0].pageX - event.target.offsetLeft ;
        this.lastMousePosition.y = event.touches[0].pageY - event.target.offsetTop;
        this.isDrawing = true;
      })

      this.canvas.addEventListener("touchmove", (event)=> {
        if (event.target == this.canvas) {
            event.preventDefault();
        }
        if(this.isDrawing) {
            this.ctx.moveTo(this.lastMousePosition.x, this.lastMousePosition.y);
            this.lastMousePosition.x = event.touches[0].pageX - event.target.offsetLeft;
            this.lastMousePosition.y = event.touches[0].pageY - event.target.offsetTop;
            this.ctx.lineTo(this.lastMousePosition.x, this.lastMousePosition.y);
            this.ctx.stroke();
            this.empty = false;
        }
      })

      this.canvas.addEventListener("touchend", (event)=> {
        if (event.target == this.canvas) {
            event.preventDefault();
        }
        this.isDrawing = false;
      })
    }

    init() {
      this.ctx = this.canvas.getContext("2d");
      this.ctx.strokeStyle = "#222222";
      this.ctx.lineWidth = 1;
      this.lastMousePosition = {
          x: 0,
          y: 0
      };
      this.empty = true;
    }

    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.width = this.canvas.width;
      this.init();
    }

}