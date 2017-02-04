function updateAssigned(id,newValue){

    $.ajax({
        type:"PUT",
        url:'http://127.0.0.1:3000/api/tickets/'+id,
        dataType:'json',
        data:JSON.stringify({
            "ticketAssigned":newValue
        }),
        contentType:"application/json",
        success: function(data){
            console.log(data);
            setTimeout(function(){
                location.reload();
            }, 100);
            
        },
        error: function(jqXHR,textStatus,error){
            console.log(error);
        }
    });
    
};

