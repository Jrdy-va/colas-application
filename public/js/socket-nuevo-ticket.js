var socket = io()

var label = $('#lblNuevoTicket')

socket.on('connect', function(){
    console.log('Usario cliente conectado');
})

socket.on('disconnect', function() {
    console.log('Usuario desconectado');
})

socket.on('estadoActual', function( data ) {
    label.text(data.actual)
})

$('button').on('click', function(){
    
    socket.emit('nuevoTicket', null, function( sgteTicket ) {
        console.log('ticket',sgteTicket);
        label.text(sgteTicket)
    })

})