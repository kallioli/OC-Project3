class Canvas {

	constructor(){
		console.log('constructeurCanvas');
		
		this.clickX = new Array();
		this.clickY = new Array();
		this.clickDrag = new Array();
		this.paint;
		this.nom = 'sig-canvas';
		
		this.strokeStyle="#222222";
		this.lineWidth=1;
		
		 this.sigText = document.getElementById("sig-dataUrl");
    this.sigImage = document.getElementById("sig-image");
    this.clearBtn = document.getElementById("sig-clearBtn");
    this.submitBtn = document.getElementById("sig-submitBtn");
	
	} 

	getCoordX(){
		
	}
	getCoordY(){
		
	}

	initCanvas() {
		var canvas_item = document.getElementById(this.nom);
		
		this.context = document.getElementById(this.nom).getContext("2d");
		
		this.context.strokeStyle = this.strokeStyle;
		this.context.lineWidth = this.lineWidth;

		canvas_item.addEventListener('mousedown',(e) => {
			
			this.paint = true;
			var mouseX = e.pageX - canvas_item.offsetLeft;
			var mouseY = e.pageY - canvas_item.offsetTop;
			console.log('mousedown'+canvas_item.offsetLeft);
			this.addClick(mouseX, mouseY);
		this.redraw();
		},false);
		
		
		canvas_item.addEventListener('mousemove',(e) => {
		  if(this.paint){
				var mouseX = e.pageX - canvas_item.offsetLeft;
				var mouseY = e.pageY - canvas_item.offsetTop;
				this.addClick(mouseX, mouseY,true);
		this.redraw();
		  }
		},false);
		
		canvas_item.addEventListener('mouseup',(e) => {
			this.paint = false;
		},false);

		canvas_item.addEventListener('mouseleave',(e) => {
			this.paint = false;
		},false);
		
		
		this.clearBtn.addEventListener('clic',(e) => {
			this.clear();
		});
	}
		
		
  /*
  However IE doesn't know what the canvas tag means, and if we used that in our markup, IE would serve us an entrée of error. Instead we create a canvas element in JavaScript and append it to our div we called canvasDiv
  var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");
*/

	
	addClick(x, y, dragging)
	{
		this.clickX.push(x);
		this.clickY.push(y);
		console.log('nom_item_addclick'+this.nom);
		console.log('x_y_add_client'+x+'-'+y);
		this.clickDrag.push(dragging);
	};
	
	redraw(){
		console.log('fonction_redraw'+this.nom)
		  this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
		  
		/*  this.context.strokeStyle = "#df4b26";
		  this.context.lineJoin = "round";
		  this.context.lineWidth = 5;
			*/		
		  for(var i=0; i < this.clickX.length; i++) {		
			this.context.beginPath();
			if(this.clickDrag[i] && i){
			  this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
			 }else{
			   this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
			 }
			 this.context.lineTo(this.clickX[i], this.clickY[i]);
			 this.context.closePath();
			 this.context.stroke();
		  };
	};	
	
	clear(){
		console.log('fonction_clear'+this.nom)
		this.clickX = new Array();
		this.clickY = new Array();
		this.clickDrag = new Array();
		this.paint = false;
	}



  
}		
	
var canvas2 = new Canvas();
console.log("nomglobal"+canvas2.nom);
canvas2.initCanvas();
	

