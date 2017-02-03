var request = require('request');

var del = document.getElementById('delete')

del.addEventListener('click',function(){

    var options = {
        url: 'http://127.0.0.1:3000/tickets',
        'method':'delete'
    }
});