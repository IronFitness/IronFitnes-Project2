const express = require('express');
const router = express.Router();
const Profil = require('../models/Profil');



router.get('/profil', (req, res, next) => {
    Profil.find().then(profils => {
        console.log(profils);
        res.render('profils/index.hbs', { workouts });
    })
        .catch(err => {
            next(err);
        });
});

// router.post('/workouts/new', (req, res, next) => {
//     const { exercise, difficulty, repetitions, muscle, description } = req.body;
//     Workout.create({ exercise, difficulty, repetitions, muscle, description })
//         .then((newWorkout) => {
//             res.redirect(`/workouts/${newWorkout._id}`);
//         })
//         .catch(err => {
//             next(err);
//         })
// })

// router.get('/workouts/:id', (req, res, next) => {
//     Workout.findById(req.params.id)
//         .then(workouts => {
//             res.render('workouts/show.hbs', { workouts });
//         })
//         .catch(err => {
//             next(err);
//         });
// });


// router.get('/new', (req, res, next) => {
//     res.render('workouts/new');
// });




module.exports = router;

