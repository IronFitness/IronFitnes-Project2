const express = require('express');
const router = express.Router();
const Profil = require('../models/Profil');



router.get('/profil', (req, res, next) => {
    Profil.find().then(profil => {
        console.log(profils);
        res.render('profils/index.hbs', { Profil });
    })
        .catch(err => {
            next(err);
        });
});



module.exports = router;

