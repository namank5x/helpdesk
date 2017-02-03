const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create schema and model

const UsersSchema = new Schema({

    name: String,
    email: String

});

const User = mongoose.model('users',UsersSchema);

module.exports = User;