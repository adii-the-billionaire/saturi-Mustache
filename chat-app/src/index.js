// const path = require( 'path' )
// const http = require('http')
// const express = require( 'express' )
// const socketio  = require('socket.io')
// const app = express()
// const server = http.createServer( app )
// const io  = socketio(server)
// const port = process.env.PORT || 3000
// const publicDirectoryPath = path.join( __dirname, '../public' )
// app.use( express.static( publicDirectoryPath ) )

// // let count = 0

// io.on( 'connection', (socket) => {
//     console.log( 'new websocket connection' )
//     // socket.emit( 'countUpdated', count )
//     socket.emit('message','Welcome!')
//     // socket.on( 'increment', () => {
//     //     count++
//     //     // socket.emit('countUpdated',count)
//     //     io.emit('countUpdated',count)
//     // })
//     socket.on( 'sendMessage', (message) =>{
//         io.emit('message',message)
//     })
// })

// server.listen( port, () => {
//     console.log('Server is up on port ' + port)
// })
const path = require( 'path' )
const express = require( 'express' )
const http = require( 'http' )
const socketio = require( 'socket.io' )
const Filter = require('bad-words')
const app = express()
const server =http.createServer(app)
const io = socketio( server )
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join( __dirname, '../public' )
app.use( express.static( publicDirectoryPath ) )
let count = 0
io.on( 'connection', (socket) => {
    console.log( 'new  websocket connection' ) 
  socket.emit('countUpdated',count)
  socket.on( 'increment', () => {
    count++
    io.emit('countUpdated',count)
  } )
  socket.emit( 'message', 'welcome our new user' )
  socket.broadcast.emit('message','A new user is joined')
  socket.on( 'mesa', (mes,callback) => {
    console.log( mes )
    const filter = new Filter()
    if ( filter.isProfane( mes ) ) {
      return callback('Profanity is not allowed')
    }
    io.emit( 'message', mes )
    callback()
  } ) 
  socket.on( 'disconnect', () => {
    io.emit('message','a user is left')
  } )
  socket.on( 'sendLocation', ( coords,callback ) => {
    io.emit( 'message', `https://google.com/maps?q=${ coords.latitude },${ coords.longitude }` )
    callback()
  })
})

server.listen( port, () => {
  console.log( `hi baby server is up on the ${ port }` )
} )

 //back on forth event types socket.io
 //sharing ur location to fetch the longitude lattitude