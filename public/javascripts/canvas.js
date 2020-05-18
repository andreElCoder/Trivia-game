class Trivia{
  constructor(canvas){
    this.canvas=canvas
    this.ctx=canvas.getContext("2d")
    this.height= this.canvas.height
    this.width = this.canvas.width
    this.categories = this.categoriesFill(5,37)
    this.colors=['red', 'blue', 'gray', 'orange','purple', 'red', 'blue', 'gray', 'orange','purple', 'red', 'blue', 'gray','orange','purple']
  }

categoriesFill(numberOfCategories,numberOfSpots){
      let myBoardGame = []
      for(let i=0;i<numberOfSpots;i++){
        if(i===0){}
      myBoardGame.push(Math.floor(Math.random()*numberOfCategories))

    }
      return myBoardGame
}

printCategories(){
  this.ctx.beginPath()
  this.ctx.lineWidth = 2
  this.ctx.strokeStyle ="black"
  this.ctx.font = "30px Arial";
  //////////////////Upper arc////////////////////////
  this.ctx.strokeText("E", 440, 50)
  this.ctx.strokeText("S", 540, 50)
  this.ctx.strokeText("H", 610, 80)
  this.ctx.strokeText("P", 370, 80)
  this.ctx.strokeText("A", 309, 140)
  this.ctx.strokeText("A", 670, 140)
  this.ctx.strokeText("H", 280, 210)
  this.ctx.strokeText("P", 700, 210)
//////////////////Lower arc////////////////////////

  this.ctx.strokeText("A", 440, 475)
  this.ctx.strokeText("H", 540, 475)
  this.ctx.strokeText("S", 610, 445)
  this.ctx.strokeText("P", 370, 445)
  this.ctx.strokeText("E", 309, 390)
  this.ctx.strokeText("E", 670, 390)
  this.ctx.strokeText("S", 280, 310)
  this.ctx.strokeText("P", 700, 310)

  ///////////// Horizontal
  this.ctx.strokeText("P", 324,260 )
  this.ctx.strokeText("E", 365,260 )
  this.ctx.strokeText("S", 406,260 )
  this.ctx.strokeText("H", 447,260 )

  this.ctx.strokeText("S", 530,260 )
  this.ctx.strokeText("H", 572,260 )
  this.ctx.strokeText("A", 614,260 )
  this.ctx.strokeText("P", 656,260 )
  //////////////////Vertical////////////////////////

  this.ctx.strokeText("E", 490,95 )
  this.ctx.strokeText("S", 490,136 )
  this.ctx.strokeText("H", 490,177 )
  this.ctx.strokeText("A", 490,218 )
  this.ctx.strokeText("E", 490,300 )
  this.ctx.strokeText("S", 490,341 )
  this.ctx.strokeText("H", 489,382 )
  this.ctx.strokeText("A", 490,423 )

  this.ctx.closePath()

  }

circle (x,y,radius,color,radians){
    this.ctx.beginPath();
    //this.ctx.arc()
    this.ctx.beginPath();
    this.ctx.arc(100, 75, 50, 0, 2 * radians);
    this.ctx.fillStyle=color
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(x,y ,radius, 0, radians , true);
    this.ctx.fill();
    this.ctx.closePath()
}
drawPie(){

// List of Angles
let angles = [Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8, Math.PI /8];

// Temporary variables, to store each arc angles
let beginAngle = 0;
let endAngle = 0;

// Iterate through the angles
for(let i = 0; i < angles.length; i = i + 1) {
  // Begin where we left off
  beginAngle = endAngle;
  // End Angle
  endAngle = endAngle + angles[i];
  
  this.ctx.beginPath();
  // Fill color
  this.ctx.fillStyle = this.colors[i % this.colors.length];
  
  // Same code as before
  this.ctx.moveTo(this.width/2, this.height/2);
  this.ctx.arc(this.width/2, this.height/2, this.height/2, beginAngle, endAngle);
  
  this.ctx.lineTo(this.width/2, this.height/2);
  this.ctx.stroke();
  
  // Fill
  this.ctx.fill();
}
}
line(x,y,xFinal,yFinal,color,lineWidth){
  this.ctx.beginPath()
  this.ctx.strokeStyle=color
  this.ctx.moveTo(x,y)
  this.ctx.lineTo(xFinal,yFinal)
  this.ctx.lineWidth = lineWidth
  this.ctx.stroke()
  this.ctx.closePath()
}
displayBoard(){  
  //Circle outer
  this.drawPie()

  //Circle inner 

  this.circle(this.width/2,this.height/2,this.height/2 - this.height/8,"white",2*Math.PI)

  // Lines

  //Vertical

  this.line(this.width/2,this.height/2,this.width/2,this.height/2+this.height/2,"yellow",45)
  this.line(this.width/2,this.height/2,this.width/2,this.height/2-this.height/2,"yellow",45)
  this.line(this.width/2 ,0,this.width/2,63.5,"black",45)
  this.line(this.width/2 ,this.height,this.width/2,this.height-63.5,"black",45)
  //Horizontal
  this.line(this.width/2,this.height/2,this.width/2+this.height/2,this.height/2,"yellow",45)
  this.line(this.width/2,this.height/2,this.width/2-this.height/2,this.height/2,"yellow",45)
  this.line(this.width/4 ,this.height/2,this.width/4 +62.5,this.height/2,"black",45)
  this.line(this.width -250 ,this.height/2,this.width-314.5,this.height/2,"black",45)
  //Horizontal divisions
for(let i=0, j=1;i<this.height/2-48;i=i+(((this.height/2-24)-(this.height/2-188))/4),j++){
 
  this.line(this.width/2-22,this.height/2-164+i,this.width/2+22,this.height/2-164+i,this.colors[j],40)
}
for(let i=0,j=0;i<this.height/2-48;i=i+(((this.height/2+188)-(this.height/2+24))/4),j++){

  this.line(this.width/2-22,(this.height/2)+i,this.width/2+22,(this.height/2)+i,this.colors[j],40)
  //this.line(this.width/2-22,this.height/2-164+i,this.width/2+22,this.height/2-164+i,this.colors[j],40)
}

// Vertical divisions

for(let i=0,j=0;i<this.width/8+40;i=i+(((this.width/2-24)-(this.width/2-188))/4),j++){

  this.line(this.width/2-166+i,this.height/2-22,this.width/2-166+i,this.height/2+22,this.colors[j],40)

}
for(let i=this.width/2-288 ,j=1;i<this.width/8+288;i=i+(((this.width/2-24)-(this.width/2-188))/4),j++){
  if(j==1){
    this.line(this.width/2-212+i,this.height/2-22,this.width/2-212+i,this.height/2+22,"black",42)
  }
  else{this.line(this.width/2-212+i,this.height/2-22,this.width/2-212+i,this.height/2+22,this.colors[j],40)}
  
}

this.printCategories()
}

coordinatesY(x,radius){
  return Math.pow(Math.pow(radius,2)-Math.pow(x,2),0.5)
}
}