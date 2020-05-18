document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');
}, false);
let score=0
//do{
//document.getElementsByClassName("board").innerHTML =``
/*document.getElementsByClassName("board").innerHTML = `
<button type="submit" id="dice">Categoria</button>
<div>
  <h3 id="ShowMe"></h3>
</div>
`
*/

const $canvas = document.getElementById("canvas")
const $trivia= new Trivia($canvas)
const player = new Player($trivia)
keysPressed()
$trivia.displayBoard()
player.printPlayer(this.x,this.y,"pink")

// document.getElementById("gotoyourpage").onclick = function () {
//   location.href = profile.hbs
// };
document.getElementById('dice').addEventListener('click',() => {
  event.preventDefault();
  
  const category_id = Math.floor(Math.random()*24) +9
  let button = document.getElementById('dice')
  button.style.visibility = "hidden"
  button.setAttribute("disabled","true")
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
  let timerQuestion = setTimeout(() => {
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
        //response.setAttribute("disabled","true")                       
        if(response.innerText===correct_answer){                        //Correct answer
          document.querySelectorAll(".response").forEach(option => {
            option.setAttribute("class","response red")                 //All red
            option.setAttribute("disabled","true")                      //prevent multiple clicks
          })
          //response.classList.remove("red")
          response.setAttribute("class","response green")                        //Correct green
          score++;
          document.getElementById("score").innerText=`Score : ${score}`          
        }
        else{                                                           //Wrong asnwer
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
        let cleanScreen = setTimeout(() => {
        console.log(button)
        button.style.visibility = "visible"
        button.removeAttribute("disabled")
        document.getElementById("category").remove()
        document.getElementById("question").remove()
        console.log(document.querySelectorAll(".response"))
        document.querySelectorAll(".response").forEach(response => {
          response.remove()
        })
      },1000)
      })
    })
  }, 1000); 
}).catch(err =>{
  console.log(err)
})
})
//}
//while(score<2)
//document.getElementsByClassName("board").innerHTML= `<h1>Game ended</h1>`
/////////////////////////////////////Auxiliary functions///////////////////////////////////////////////////
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
}

function keysPressed(){
    
  window.addEventListener("keydown", event => {
      if(event.keyCode ===37 ||event.keyCode === 38||event.keyCode === 39||event.keyCode === 40){
        console.log(event.keyCode)
        keysLogic(event.keyCode)
        player.playerIndex(event.keyCode)
        player.playerLocation()
        player.printPlayer()
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