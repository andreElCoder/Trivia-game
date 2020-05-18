const express = require('express');
const router  = express.Router();
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
router.get('/profile', (req,res,next)=>{
  console.log("teste")
  currentUser = req.session.currentUser
  res.render('auth/profile', {currentUser})
})
router.get('/private', (req, res, next) => {
  res.render('private');
});
module.exports = router;