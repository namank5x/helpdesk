const assert = require('assert');
const User = require('../models/users_model');



// Describe Tests

describe('Saving Records', function(){

    //create tests
    it('Saves a record to the database',function(done){
        
        var person = new User({

            name:'John',
            email: 'john@gmail.com'


        });

        person.save().then(function(){
            assert(person.isNew === false);
            done();
        });

    });

    // next test

});