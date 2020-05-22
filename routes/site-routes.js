const express = require('express');
const router  = express.Router();
const User = require("../models/user")
/* GET home page */
router.get('/', (req, res, next) => {
  let currentUser;
  if (req.session) {
    currentUser = req.session.currentUser
  }
  res.render('index', { currentUser });
});
router.use((req, res, next) => {
  if (req.session.currentUser) {
    next(); // ------------------------
  } else {                          // |
    res.redirect('/login');         // |
  }                                 // |
});                                 // |
                                    // |
//-------------------------------------
// |
// |
router.get('/main', (req, res, next) => {
    console.log(req.session.currentUser)
  res.render('auth/main');
});
router.post('/main', (req, res, next) => {
  console.log("I am on post main")
  console.log(req.session.currentUser)
  console.log(req.body.score)
  User.findOne({"username" : req.session.currentUser.username})
  .then(userFound =>{
    if(userFound.highScore<req.body.score){
      User.findOneAndUpdate({username: req.session.currentUser.username},{highScore : req.body.score })
      .then(result => console.log( "Saved on the database",result))
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
  
//res.render('auth/main');
});
router.get('/profile', (req,res,next)=>{
  console.log("teste")
  currentUser = req.session.currentUser
  res.render('auth/profile', {currentUser})
})
router.get('/private', (req, res, next) => {
  res.render('private');
});
router.get('/ranking', (req, res, next) => {
  let ranking;
  User.find({ "highScore": { $gt: -1 }},{"highScore":-1,"username":1}).sort({"highScore":-1})
  .then(highScore =>{
    ranking=highScore
    console.log(ranking[0])
    let index=[]
    ranking.forEach(element => {
      index.push(index.indexOf(element)+1)
    });
    console.log(ranking)
    console.log({ranking :ranking , index: index})
    res.render('ranking',{ranking :ranking , index: index});
  })
  .catch(err => console.log(err))
  
 
});
module.exports = router;