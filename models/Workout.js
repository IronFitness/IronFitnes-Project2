const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    exercise: String,
    difficulty: String,
    repetitions: Number,
    muscle: String,
    videoUrl: String,
    description: String,
    voting: Number 
})

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;