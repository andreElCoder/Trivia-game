class Dice{
  constructor(game,numFaces){
    this.game=game
    this.ctx=this.game.ctx
    this.numFaces=numFaces
    this.actualFace=6
  }
  roll(){
    this.actualFace=Math.Floor(Math.random()*6)+1
  }
  printFace(){
    this.ctx.beginPath() 
    this.roundRect(this.ctx,0,0,80,80)
    this.fillColor="black"
    this.printNumber()
    this.ctx.closePath()
  }
 
roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }        
}
printNumber(){
  this.ctx.fillStyle="black"
  this.ctx.beginPath()
  switch (this.actualFace){
    case 0 : {break}
    case 1 : {this.ctx.beginPath();this.ctx.arc(35, 35, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();break}
    case 2 : {this.ctx.beginPath();this.ctx.arc(20, 20, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();this.ctx.beginPath();this.ctx.arc(60, 60, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();break}
    case 3 : {this.ctx.beginPath();this.ctx.arc(20, 20, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();this.ctx.beginPath();this.ctx.arc(60, 60, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();this.ctx.beginPath();this.ctx.arc(40, 40, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();break}
    case 4 : {
      this.ctx.beginPath();
      this.ctx.arc(20, 20, 10, 0, 2 * Math.PI);
      this.ctx.fill();this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(20, 60, 10, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(60, 20, 10, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(60, 60, 10, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      break;
    }
    case 5 : {
      this.ctx.beginPath();
      this.ctx.arc(20, 20, 10, 0, 2 * Math.PI);
      this.ctx.fill();this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(20, 60, 10, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(60, 20, 10, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(60, 60, 10, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(40, 40, 10, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      break;
    }
    case 6 : {
      this.ctx.beginPath();this.ctx.arc(20, 15, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();this.ctx.beginPath();this.ctx.arc(20, 40, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();this.ctx.beginPath();this.ctx.arc(20, 65, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();
      this.ctx.beginPath();this.ctx.arc(60, 15, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();this.ctx.beginPath();this.ctx.arc(60, 40, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();this.ctx.beginPath();this.ctx.arc(60, 65, 10, 0, 2 * Math.PI);this.ctx.fill();this.ctx.closePath();break
    }
    }
    this.ctx.fillStyle="black"

    this.ctx.beginPath()
  
}
}
