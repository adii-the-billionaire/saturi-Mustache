// const socket = io()

// // socket.on( 'countUpdated', (count) => {
// //     console.log( 'the count has been updated perfectely',count )
    
// // } )
// socket.on( 'message', ( message ) => {
//     console.log(message)
// })

// document.querySelector( '#increment' ).addEventListener( 'click', () => {
//     console.log( 'clickeed' )
//     socket.emit('increment')
// } )
// let count = 0
// document.querySelector( '#hi' ).addEventListener( 'click', ( e ) => {
//     e.preventDefault.value
//   console.log('yr buton s clikce' + count++)  
// } )
// document.querySelector( '#mes' ).addEventListener( 'submit', ( e ) => {
//     e.preventDefault()
//     const message = document.querySelector( 'input' ).value
//     socket.emit( 'sendMessage', message )
//     console.log(message)
// })
const socket = io()
//elements
const $messageForm = document.querySelector( '#mes' )
const $messageFormInput = $messageForm.querySelector( 'input' )
const $messageFormButton = $messageForm.querySelector( 'button' )
const $messages = document.querySelector( '#cia' )

//templaltes 
const messageTemplate = document.querySelector('#sia').innerHTML
const locationMessageTemplate = document.querySelector('#tia').innerHTML


socket.on( 'countUpdated', (count) => {
    console.log('the count has been updated', count)
} )
socket.on( 'message', ( message ) => {
    console.log( message )
    const html = Mustache.render( messageTemplate, {
        message: message.text,//here is reference oibject for the templated
        createdAt:moment(message.createdAt).format('h:mm a')
    } )
    $messages.insertAdjacentHTML('beforeend',html)
})
document.querySelector( '#increment' ).addEventListener( 'click', () => {
    console.log( 'clicked' )
    socket.emit('increment')
} )
$messageForm.addEventListener( 'submit', ( e ) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled','disabled')
    // const message = document.querySelector( 'input' ).value
   const message = e.target.elements.mesa.value
    socket.emit( 'mesa', message, ( error ) => {

        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ' '
        $messageFormInput.focus()
        if ( error ) {
            return console.log(error)
        }
        console.log(
            'message is delivered'
        )
    } )
  
})
document.querySelector( '#hi' ).addEventListener( 'click', () => {
    if ( !navigator.geolocation ) {
        return alert('Geolocation is not supported by your browser')
    }
    document.querySelector('#hi').setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition( ( position ) => {
        console.log(position)
        socket.emit( 'sendLocation', {
            latitude: position.coords.latitude,
            longitude:position.coords.longitude
        }, () => {
                document.querySelector('#hi').removeAttribute('disabled')
            console.log('location shared')
        })
    })
} )

socket.on( 'locationMessage', ( message ) => {
    console.log( message )
    const html = Mustache.render( locationMessageTemplate, {
        url: message.url,
        createdAt:moment(message.createdAt).format('h:mm a')
    } )
   $messages.insertAdjacentHTML('beforeend',html)
})