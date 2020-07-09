const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    githubId: String,
    weight: Number,
    Size: Number,
    Age: Number,
  
    role: {
        type: String,
        enum: ['Coach', 'Trainee'],
        default:'Trainee'
    },
    list:[
       
        {
            
        }
               
           ],
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;

