const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const User= require("../models/User")
const { default: Axios } = require('axios');
const loginCheck = require('./middleware')


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
            console.log(newWorkout);
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
    const user = req.user;
    res.render('workouts/new' , {user});
});

//List of exercises for workout get request
// router.get("/workouts" /*was macht das?*/, (req, res) => {
//     console.log("hello")
//     const workoutList = req.user.workouts;

//     const user=req.user; 
//   Workout.findOne({exercise
//     :
//     "Bizeps Curls"
//     }).then(response=>{
//         console.log("this is a workout!!!!!!!!",response,"this is a workout!!!!!")
//     }).catch(err=>{
//         console.log("this is an error!!!",err)
//     })

//      res.render('workouts' , {workoutList, user: user})
//   }); 

router.post("/workouts", loginCheck(), (req, res) => {
   
   let exercise= req.body
 let user=req.user._id
 

 console.log("HOla Luisito")

User.findByIdAndUpdate(user, {$push:{list: exercise.id}}).then(
    
    userFound => {console.log("user founded luisito")
     console.log(userFound)
    res.redirect("/")
    //   res.render('workoutList',{workoutList, user: user})
    }).catch(err => {
      
      //  console.log(err)
    })
  });


// <!-- routes or Workout voting --> 

router.post("/vote/:id", (req, res) => {

    res.send(req.params.something)
    // console.log("+1")
    // console.log(req.params.id)
    Workout.findByIdAndUpdate(req.params.id, { $inc: { voting : 1 } } ,{new:true}).then( (post) => { 
    
     console.log("post", post);

     })
  })
  router.post("/vote/:id", (req, res) => {
      res.send(req.params.something)
    Workout.findByIdAndUpdate(req.params.id, { $inc: { score: -1 } }, { new: true }).then(post => {
      
        console.log("post", post);
    })
  })
  
router.delete("/deleteExercise/:id",(req,res)=>{
    const userId=req.user._id
    console.log(req.params.id)
    User.findByIdAndUpdate(req.user._id,{$pull:{list:req.params.id}}).then(responseDB=>{
        console.log("done",responseDB)
    }).catch(err=>{
        console.log("mistakes were made",err)
    })
})

  module.exports = router;