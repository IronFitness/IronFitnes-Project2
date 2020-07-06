const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    githubId: String,
    role: {
        type: String,
        enum: ['Coach', 'Trainee'],
        default:'Trainee'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

