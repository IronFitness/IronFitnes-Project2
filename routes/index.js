const express = require('express');
const router  = express.Router();
const loginCheck = require('./middleware')

/* GET home page. */
router.get('/', loginCheck(), (req, res, next) => {
  console.log(req.user);
  const user = req.user;
  console.log('req.user:', req.user);
  res.render('index', {user: user});
});



router.get('/private', loginCheck(), (req, res) => {
  res.render('private');
});

router.get('/profile', loginCheck(), (req, res) => {
  res.render('profile');
});


module.exports = router;