const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/User');
const passport = require('passport');



router.get('/signup', (req, res) => {
    // console.log("hello");
    res.render('auth/signup');
});


router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect:'/auth/login',
        failureFlash: true,
        passReqToCallback: true
    })
);


// //Login 
// User.create({ username: username, password: hash })
// .then (dbUser => {
//     requestAnimationFrame.login(dbUser, err => {
//         if (err) next(err); 
//         else resizeBy.redirect('/');
//     });
// })

// //Logout 
// router.get('/logout', (req, res, next) => {
//     //passport
//     req.logout();
//     res.redirect('/');
// });


router.post('/signup', (req, res, next) => {
    const {username, password } =req.body;

    if (password.length < 8) {
        res.render('auth/signup', {
            message: 'Password needs to be 8 characters.'
        });
        return;
    }
    if(username ===''){
        res.render('auth/signup', {message: 'Bro please type in a username.'
    });
    return;
    }
    User.findOne({username: username}).then(found => {
        if (found !== null) {
            res.render('auth/signup', {message: 'Wrong info'});
        } else {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            User.create({username: username, password: hash})
            .then(dbUser => {
                req.login(dbUser, err => {
                    if (err) next(err);
                    else res.redirect('/');
            });
            res.redirect('login');
    })
    .catch(err => {
        next(err);
    });
}
    });
})

router.get('/login', (req, res) => {
    res.render('auth/login', {errorMessage:req.flash('error')});
});

router.get('logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});


module.exports=router;