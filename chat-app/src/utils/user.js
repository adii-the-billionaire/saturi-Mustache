const users = []


const addUser = ( { id, username, room } ) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    if (!username||!room) {
        return {
            error:'Username and room are required'
        }
    }
    const existingUser = users.find( ( user ) => {
    return user.room === room && user.username === username
    } )
    
    if ( existingUser ) {
        return {
            error:'Username is in use!'
        }
    }
    const user = { id, username, room }
    users.push( user )
    return { user }
}


const removeUser = ( id ) => {
    const profile = users.findIndex( ( user ) => {
        return user.id  === id
    } )
    if ( profile !== -1) {
        return users.splice(profile,1)[0]
    }
}



const getUser = ( id ) => {
    return users.find( (user ) => {
        return user.id === id
    } )
    
}

const getUserInRoom = ( room ) => {
    return users.filter( ( user ) => {
        return user.room ===room
    })
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}