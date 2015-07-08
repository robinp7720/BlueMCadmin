var socket = io();

socket.on('console',function(msg){
    console.log(msg);
    $('.console').prepend('<span>'+msg+'</span>');
});

$('form#command').on('submit',function(event){
    event.preventDefault();
    socket.emit('command',$('input#command-input').val());
    $('input#command-input').val("");
});