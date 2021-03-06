const fs = require('fs')

class Ticket {
    constructor (numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {


    constructor() {
        
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4 = []

        let data = require('../data/data.json')
        
        if ( data.hoy === this.hoy ) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4
        } else {
            this.reiniciarConteo()
        }
    }


    siguienteTicket() {

        this.ultimo += 1
        let ticket = new Ticket( this.ultimo, null)
        this.tickets.push(ticket)
        this.saveFile()
        return `Ticket ${ this.ultimo }`
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`
    }

    getTicketsInProcess(){
        return this.ultimos4
    }

    reiniciarConteo() {
      
        this.ultimo = 0
        this.tickets = []
        this.ultimos4 = []
        this.saveFile()
    }

    atenderTicket( escritorio ) {
        
        if ( this.tickets.length === 0 ) {
            return `No hay tickets`
        }
        
        let numeroTicket = this.tickets[0].numero
        this.tickets.shift()  //elimina la primera posicion del arreglo

        let atenderTicket = new Ticket( numeroTicket , escritorio )
        console.log('ultimos4',this.ultimos4)
        this.ultimos4.unshift(atenderTicket) //agrega al inicio

        if( this.ultimos4.length > 4 ){
            this.ultimos4.splice( -1,1 ) //borra el ultimo
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.saveFile()

        return atenderTicket
        
    }

    saveFile() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData)
        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }
}

module.exports = {
    TicketControl
}