document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');
}, false);
let score=0
const $canvas = document.getElementById("canvas")
const $trivia= new Trivia($canvas)
const player = new Player($trivia)
const dice = []
let gameStatus = "on"
dice.push(new Dice($trivia,6,800,4))
dice.push(new Dice($trivia,6,900,4))

$trivia.displayBoard()
player.printPlayer(this.x,this.y,"pink")
dice[0].printFace()
dice[1].printFace()

document.getElementById('dice').addEventListener('click',() => {
  event.preventDefault();
  
  
  let button = document.getElementById('dice')
  button.style.visibility = "hidden"
  button.setAttribute("disabled","true")
  let promise = new Promise(function(resolve,reject){
    let timerRoll=setInterval(()=>{
    dice[0].roll()
    dice[0].printFace()
    dice[1].roll()
    dice[1].printFace()
// after 5 seconds stop
setTimeout(() => {clearInterval(timerRoll);resolve();}, 5500);
  },500)
  })
  
promise.then(()=>{
  player.clearOldInfo()
  player.movesAvailable=dice[0].actualFace+dice[1].actualFace
  keysPressed()
  checkMovement() 
}).then(()=>console.log("Sopa"))
})

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function escapeHtml(text) {
  return text
      .replace(/&amp;/g,'&' )
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g,'>')
      .replace(/&quot;/g,'"')
      .replace(/&#039;/g,"'")
      .replace(/&deg;/g,"°")
      .replace(/&ldquo;/g,"“")
      .replace(/&rdquo;/g,"”")
}

function keysPressed(){
    
  let keyDown = window.addEventListener("keydown", function pressed (event){
      if(event.keyCode ===37 ||event.keyCode === 38||event.keyCode === 39||event.keyCode === 40){
        console.log(event.keyCode)
        keysLogic(event.keyCode)
        //$trivia.displayBoard()
        if(player.playerIndex(event.keyCode)===0){
          gameStatus="off"
          $trivia.displayBoard()
          player.printPlayer()
          window.removeEventListener("keydown",pressed)
        }
        //player.playerLocation()
        //player.printPlayer()
      }
  })
  
}

function keysLogic(pressedkey){
  console.log(pressedkey)
  switch(pressedkey){
    case 37:  console.log("Left clicked") ;break;//Left arrow 
    case 38:  console.log("Up clicked");break;//Up arrow
    case 39:  console.log("Right clicked");break;//Righ arrow
    case 40:  console.log("Down clicked");break;//Down arrow
    default: console.log("Ups")
  }

}

function checkMovement(){
  
  let animationId = window.requestAnimationFrame(() => {
    if(gameStatus==="on"){
    //while(player.movesAvailable)
    
    $trivia.displayBoard()
    dice[1].printFace()
    dice[0].printFace()
    //player.playerIndex(event.keyCode)
    //player.playerLocation()
    player.printPlayer()
    checkMovement()
    
    
  }else{
    window.cancelAnimationFrame(animationId);
    gameStatus="on"
setTimeout(() => {
  $canvas.style.display="none"
  const category_id = categoryMapping(player.actualCategory)
  let button = document.getElementById('dice')
  axios
.get(`https://opentdb.com/api.php?amount=1&category=${category_id}`)
.then(response =>{
  console.log(response)
  const category = response.data.results[0].category
  console.log(category)
  const newCharacterHTML= 
  `
    <h3 id="category">${category}</h3>
  `
  document.getElementById('ShowMe').innerHTML += newCharacterHTML;
  //debugger
     setTimeout(() => {
    const question = document.createElement('H4')
    question.setAttribute("id","question")
    const possibleResponses = response.data.results[0].incorrect_answers
    const correct_answer= response.data.results[0].correct_answer
    possibleResponses.push(escapeHtml(correct_answer))
    console.log(possibleResponses)
    shuffle(possibleResponses)
    console.log(possibleResponses)
    console.log(correct_answer)
    question.innerText = escapeHtml(response.data.results[0].question)
    document.getElementById('ShowMe').appendChild(question)
    possibleResponses.forEach(answer => {
      let ele = document.createElement('BUTTON')
      ele.setAttribute("class","response")
      ele.innerText = escapeHtml(answer)
      document.getElementById('ShowMe').appendChild(ele)
    });
    document.querySelectorAll(".response").forEach(response => {
      response.addEventListener('click', event => {
        console.log("Clicked response")
        console.log(response)                    
        if(response.innerText===correct_answer){                        //Correct answer
          document.querySelectorAll(".response").forEach(option => {
            option.setAttribute("class","response red")                 //All red
            option.setAttribute("disabled","true")                      //prevent multiple clicks
          })
          //response.classList.remove("red")
          response.setAttribute("class","response green")               //Correct green
          score++;
          answerMappingPlayer()

          document.getElementById("score").innerText=`Score : ${score}`
          if(player.checkAllTrue())
            {
              
              player.printPlayer()  
              axios.post('http://localhost:3000/main',{score:score})//'https://ih-crud-api.herokuapp.com/characters/${theId}'
              .then(response => console.log("post successful and the response is: ", response))
              .catch(error => console.log("Oh No! Error is: ", error));
              let playAgain = document.createElement('BUTTON')
              playAgain.setAttribute("class","play-again")
              playAgain.innerText = "Play again"
              console.log(document.getElementsByClassName('board')[0])
              document.getElementsByClassName('board')[0].appendChild(playAgain)
              playAgain.addEventListener('click', event => {
                $trivia.displayBoard()
                player.reset()
                player.printPlayer()
                score=0;
                document.getElementById("score").innerText=`Score : ${score}`
                $canvas.style.display="initial"
                playAgain.style.visibility = "hidden"
                button.style.visibility = "hidden"
                console.log(button)
                button.style.visibility = "visible"
                button.removeAttribute("disabled")
                document.getElementById("category").remove()
                document.getElementById("question").remove()
                console.log(document.querySelectorAll(".response"))
                document.querySelectorAll(".response").forEach(response => {
                  response.remove()}
                )
                
              })
            }          
        }
        else{      
          score=score-0.5;                                                     //Wrong asnwer
          document.getElementById("score").innerText=`Score : ${score}`
          document.querySelectorAll(".response").forEach(option => {
            option.setAttribute("class","response red")          
            if(option.innerText===correct_answer){
              //option.classList.remove("red")
              option.setAttribute("class","response green")
              option.setAttribute("disabled","true")
            }
          })
          response.setAttribute("class","response red")
        } 
        setTimeout(() => {
          if(!player.checkAllTrue()){
        console.log(button)
        player.printPlayer()
        button.style.visibility = "visible"
        button.removeAttribute("disabled")
        document.getElementById("category").remove()
        document.getElementById("question").remove()
        $canvas.style.display="initial"
        console.log(document.querySelectorAll(".response"))
        document.querySelectorAll(".response").forEach(response => {
          response.remove()}
        )}
      },1000)
      })
    })
  }, 1000); 
}).catch(err =>{
  console.log("Error getting form the API"+err)
})
},3000)
    
  }
    }) 
} 

function categoryMapping(category){
  
  switch(category){
  case "A":;return 25;break
  case "E":;return Math.floor(Math.random()*6)+10
  case "H": const  history = [20, 22, 23]; return history[Math.floor(Math.random()*2)]
  case "P": return 24;
  case "S":;return Math.floor(Math.random()*3)+17
  case "" : const  noCategory = ["A","E","H","P", "S"]; return categoryMapping(noCategory[Math.floor(Math.random()*4)])
  }
}
function answerMappingPlayer(){
  switch(player.actualCategory){
  case "A":player.categories[4]=true;break
  case "E":player.categories[1]=true;break;
  case "H":player.categories[3]=true;break;
  case "P": player.categories[0]=true;break;
  case "S":player.categories[2]=true;break;
  case "" : break;
  
}
}