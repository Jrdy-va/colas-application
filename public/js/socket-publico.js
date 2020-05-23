var socket = io()

var lbl1 = $('#lblTicket1') 
var lbl2 = $('#lblTicket2') 
var lbl3 = $('#lblTicket3') 
var lbl4 = $('#lblTicket4') 

var escritorio1 = $('#lblEscritorio1') 
var escritorio2 = $('#lblEscritorio2') 
var escritorio3 = $('#lblEscritorio3') 
var escritorio4 = $('#lblEscritorio4') 

var lblTickets = [lbl1,lbl2,lbl3, lbl4]
var lblEscritorios = [escritorio1, escritorio2, escritorio3, escritorio4]

socket.on('estadoActual', function (data) {
    console.log(data)
    actualizaHTML(data.ultimos4)
})

socket.on('ultimos4', function( data) {
    var audio = new Audio('../audio/new-ticket.mp3')
    audio.play()
    actualizaHTML(data.ultimos4)
})

function actualizaHTML ( ultimos4 ){
    for( var i=0; i<= ultimos4.length -1 ; i++) {
        lblTickets[i].text('Ticket '+ ultimos4[i].numero)
        lblEscritorios[i].text('Escritorio '+ ultimos4[i].escritorio)
    }
}