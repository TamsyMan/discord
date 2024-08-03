const prismaClient = require('@prisma/client')

const prisma = new prismaClient.PrismaClient();

const io = require('socket.io')(8080, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

io.on('connection', socket => {
    console.log('New connection', socket.id)

    socket.on('join-channel', channelId => {
        socket.join(channelId)
    })

    socket.on('serverMessage', (message, channelId, user, now) => {
        console.log("Server received a new message", message)
        socket.to(channelId).emit('serverMessage', message, user, now)
        addServerMessage(message, channelId, user, now)

    })

    socket.on('dmMessage', (message, DirectChannelId, user, now) => {
        console.log("Server received a new message", message)
        socket.to(DirectChannelId).emit('dmMessage', message, user, now)
        addDirectMessage(message, DirectChannelId, user, now)
    })
})

async function addServerMessage(message, channelId, user) {
    const newMessage = await prisma.message.create({
        data: {
            content: message,
            channelId: channelId,
            userId: user.id,
        }
    })
    console.log('Added server message.')
}

async function addDirectMessage(message, DirectChannelId, user) {
    const newMessage = await prisma.message.create({
        data: {
            content: message,
            directChannelId: DirectChannelId,
            userId: user.id,
        }
    })
    console.log('Added direct message.')
}