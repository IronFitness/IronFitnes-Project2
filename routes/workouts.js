const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

router.get('/workouts', (req, res, next) => {
    Workout.find().then(workouts => {
        console.log(workouts);
        res.render('workouts/index.hbs', { workouts });
    })
        .catch(err => {
            next(err);
        });
});

router.post('/workouts/new', (req, res, next) => {
    const { exercise, difficulty, repetitions, muscle, description } = req.body;
    Workout.create({ exercise, difficulty, repetitions, muscle, description })
        .then((newWorkout) => {
            res.redirect(`/workouts/${newWorkout._id}`);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/workouts/:id', (req, res, next) => {
    Workout.findById(req.params.id)
        .then(workouts => {
            res.render('workouts/show.hbs', { workouts });
        })
        .catch(err => {
            next(err);
        });
});


router.get('/new', (req, res, next) => {
    res.render('workouts/new');
});




module.exports = router;

