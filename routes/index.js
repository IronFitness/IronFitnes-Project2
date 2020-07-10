const express = require('express');
const router  = express.Router();
const loginCheck = require('./middleware')
const User=require("../models/User")
/* GET home page. */


router.get('/', loginCheck(), (req, res, next) => {
  console.log("hola")
  console.log(req.user);
  const user = req.user;
  console.log('req.user:', req.user);
  User.findById(req.user._id).populate("list").then(user=>{
    res.render('index', {user: user})
  }).catch(err=>{
    console.log(err)
  })

  ;
});



router.get('/private', loginCheck(), (req, res) => {
  res.render('private');
});

router.get('/profile', loginCheck(), (req, res) => {
  res.render('profile');
});


module.exports = router;