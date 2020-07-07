
const mongoose = require('mongoose');
const Workout = require('../models/Workout');

mongoose.connect('mongodb://localhost/IRONFIRNES-PROJECT2', {
    useNewUrlParser: true
});


const initialworkouts = [
    {
        exercise: 'Bizeps Curls',
        difficulty: 'easy',
        repetitions: 10,
        muscle: `Bizeps`,
        description: `slow execution`,
    },

    {
        exercise: 'Pull-Up',
        difficulty: 'medium',
        repetitions: 12,
        muscle: `back muscle `,
        description: `slowly down until the arms are stretched out and explosive up again`,
    },

    {    
        exercise: 'Bench Press',
        difficulty: 'hard',
        repetitions: 8,
        muscle: `Pectoral muscle`,
        description: `lead the rod landsam to the chest and push it up again explosively`
    }
]

const initialprofil = [
    {
        name: 'Mx',
        surname: 'Mustermann',
        size: 191,
        weight: 90,
        age: 28
    } 
]


Workout.insertMany(initialprofil)
    .then(profils => {
        console.log(`${profils.length} were inserted to the DB`);
        mongoose.connection.close();
    })
    .catch(err => console.log(err));


Workout.insertMany(initialworkouts)
    .then( workouts => {
        console.log(`${workouts.length} were inserted to the DB`);
        mongoose.connection.close();
    })
    .catch(err => console.log(err));
