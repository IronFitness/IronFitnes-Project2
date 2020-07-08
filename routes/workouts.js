const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

router.get('/workouts', (req, res, next) => {
    console.log("workouts user", req.user);
    const user = req.user;
    Workout.find().then(workouts => {
        // console.log(workouts);
        res.render('workouts/index.hbs', { workouts, user });
    })
        .catch(err => {
            next(err);
        });
});

router.post('/workouts/new', (req, res, next) => {
    const { exercise, difficulty, repetitions, muscle, description } = req.body;
    Workout.create({ exercise, difficulty, repetitions, muscle, description, voting: 0 })
        .then((newWorkout) => {
            res.redirect(`/workouts/${newWorkout._id}`);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/workouts/:id', (req, res, next) => {
    console.log("workouts user", req.user);
    const user = req.user;
    Workout.findById(req.params.id)
        .then(workouts => {
            res.render('workouts/show.hbs', { workouts, user });
        })
        .catch(err => {
            next(err);
        });
});

router.get('/workouts/:id/edit', (req, res, next) => {
    console.log("edit user!!!!!! ", req.user);
    const user = req.user;
    Workout.findById(req.params.id)
        .then(workouts => res.render('workouts/edit', {workouts, user }))
        .catch(error => next())
})

router.post('/workouts/delete/:id', (req, res, next) => {
    console.log("step one");
    Workout.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect('/workouts');
        })
        .catch(err => {
            next(err);
        })
});


router.get('/new', (req, res, next) => {
    console.log("edit user!!!!!! ", req.user);
    const user = req.usçer;
    res.render('workouts/new' , {user});
});

// <!-- routes or Worout voting --> 


module.exports = router;

