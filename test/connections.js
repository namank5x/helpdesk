const mongoose = require('mongoose');
const assert = require('assert');
var serve = require('../serve')

// ES6 Promises

mongoose.Promise = global.Promise;


// Check Database connection

describe('checking connections to database', function(){

    it('checks if we are connected to mongodb', function(){

            assert(serve.dbConnection() == true);
    });
    

})

// 


