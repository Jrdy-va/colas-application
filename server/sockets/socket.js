const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('nuevoTicket', (data, callback) => {
        let sgte = ticketControl.siguienteTicket()

        callback(sgte)
        //client.emit('nuevoTicket', sgte )
    })

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getTicketsInProcess()
    } )

    client.on('atenderTicket', (data, callback) => {
        
        if( !data.escritorio ) {
            return callback({
                err:true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio )
        callback(atenderTicket)

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getTicketsInProcess()
        })
    })

});