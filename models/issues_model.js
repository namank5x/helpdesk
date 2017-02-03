const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.promise;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = dd+'/'+mm+'/'+yyyy;


// Create schema and model

const IssueSchema = new Schema({

    ticketId: Number,
    ticketEmail:String,
    ticketHeading:{
        type: String,
        default:'No Heading'
    },
    ticketDescription:{
        type: String,
        default:'No Description'
    },
    ticketStatus:{
        type: String,
        default:'pending'
    },
    ticketAssigned:{
        type: String,
        default:'Admin'
    },
    ticketDate:{
        type: String,
        default: today

    }

});

var IssueModel = module.exports.IssueModel = mongoose.model('issue',IssueSchema);


// Get issues

module.exports.getIssues = function(callback,limit){

    IssueModel.find(callback).limit(limit)

};

// Get Issue by Id

module.exports.getIssueById = function(id,callback){

    IssueModel.findOne({ticketId:id},callback)
};

// Update Issue

module.exports.updateIssue = function(id,change,options,callback){
    var query = {ticketId:id};
    var update = {
        
    }

    IssueModel.findOneAndUpdate(query,update,options,callback);
};