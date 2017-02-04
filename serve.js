//dependencies

var express = require('express')
var hbs = require('express-handlebars');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
const User = require('./models/users_model');
const Issue = require('./models/issues_model');
var request = require('request');

// Using middleware

var urlencodedParser = bodyParser.urlencoded({ extended: true }) //accepting forms
var myParser = bodyParser.json({extended: false});

// ES6 Promises

mongoose.Promise = global.Promise;

// setup express

var server = express();
server.listen(3000);

console.log("listening on port 3000");

// setup mongoose


mongoose.connect('mongodb://localhost/users');
mongoose.connection.once('open',function(){

    console.log('successfully connected to the database')
    module.exports.dbConnection = function(){

        return true;
    }

 });


//setup view engine

server.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout', layoutsDir: __dirname + '/views/layouts'}));
server.set('view engine','hbs');
server.set('views', __dirname + '/views')

// setup middlewares

server.use('/', express.static('static'));
server.use('/tickets/', express.static('static')); 
server.use('/ticketsfor/', express.static('static')); 


// setup routes

server.get('/', function(req,res){

    res.render('index', {title: 'Your website'});
    

});

//=======================================
//              APIs 
//=======================================

// Fetching Tickets API

server.get('/api/tickets',function(req,res){

    Issue.getIssues(function(err,result){

        if(err){
            throw err
        }
        res.json(result);
    });

});

// Fetching Tickets API by Id

server.get('/api/tickets/:id',function(req,res){

    Issue.getIssueById(req.params.id,function(err,result){

        if(err){
            throw err
        }
        res.json(result);
    });

});

// Fetching Tickets API by Assigned 

server.get('/api/ticketsfor/:assigned',function(req,res){
    var assignedTo = {ticketAssigned:req.params.assigned}
    Issue.getIssueByAssigned(assignedTo,function(err,result){

        if(err){
            throw err
        }
        res.json(result);
    });

});

// Adding Tickets 

server.post('/api/tickets',myParser, function(req,res){
    var issue = req.body;
    
    Issue.addIssue(issue,function(err,issue){

        if(err){
            throw err
        }
        res.json(issue);
    });
})

// Updating Tickets

server.put('/api/tickets/:id',myParser,function(req,res){
    var issue = req.body;
    var id = req.params.id;
    console.log(issue)
    Issue.updateIssue(id,issue,{},function(err,result){

        if(err){
            throw err
        }
        res.json(result);
    });

});

//==========================================
//              GET Requests
//==========================================

// Fetching all Tickets

server.get('/tickets',function(req,res){
    
    
    request('http://127.0.0.1:3000/api/tickets',function(error,response,body){

        if(!error && response.statusCode == 200){
            var info = JSON.parse(body);
            res.render('tickets',{title:'tickets admin page',infoArr: info})
        } else {console.log(error)};

    });
        
});

// Fetching tickets by Id

server.get('/tickets/:id',function(req,res){
        
        
        request('http://127.0.0.1:3000/api/tickets/'+req.params.id,function(error,response,body){

            if(!error && response.statusCode == 200) {
                var newInfo = JSON.parse(body)  
            res.render('each',{title:req.params.id,IssueHeading:newInfo.ticketHeading,IssueId:newInfo.ticketId,IssueEmail:newInfo.ticketEmail,IssueDescription:newInfo.ticketDescription,IssueStatus:newInfo.ticketStatus,IssueAssigned:newInfo.ticketAssigned,IssueDate:newInfo.ticketDate});

            };
        });
    
});

// Fetching Tickets by Assigned to

server.get('/ticketsfor/:assigned',function(req,res){
        
        
        request('http://127.0.0.1:3000/api/ticketsfor/'+req.params.assigned,function(error,response,body){

            if(!error && response.statusCode == 200) {
                var ticketsByInfo = JSON.parse(body)  
                res.render('tickets',{title:'tickets for' + req.params.assigned,infoArr:ticketsByInfo})

            };
        });
    
});


//==========================================
//              POST Requests
//==========================================

server.post('/', urlencodedParser, function(req,res){

   var x = function genRand() {
      return Math.floor(Math.random()*89999+10000);
   }

     y = x();
    console.log(req.body);
    console.log(y);

    var newIssue = function(){

        var issue = new Issue.IssueModel({

            ticketId:y,
            ticketEmail:req.body.email,
            ticketHeading:req.body.title,
            ticketDescription:req.body.description  
        });

        issue.save().then(function(){
            if (issue.isNew == false){
                console.log(req.body.title + " by " + req.body.email + " is saved to the database")
            };
        });
       
    };

    newIssue();

    res.render('index',{title:'Thank You', ticket: y})
});

//==========================================
//              Update Requests
//==========================================

