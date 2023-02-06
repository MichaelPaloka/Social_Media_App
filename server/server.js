require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const socket = require('socket.io')
const app = express();
const User = require('./models/user.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(cookieParser())
require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);
require('./routes/comment.routes')(app);
require('./routes/followReq.routes')(app);


const server = app.listen(process.env.MY_PORT, () => {
    console.log("Listening at ", process.env.MY_PORT)
});

const io = socket(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
})

io.on('connection', (socket)=>{
    console.log('socket id:' + socket.id)

    socket.on('acceptFollower', (payload)=>{
        console.log('payload:', payload)
        User.findOneAndUpdate({handle:payload}, {new:true, runValidators: true})
        .then((res)=>{
            io.emit('Follow request accepted', payload)
        }).catch((err)=>{
            console.log(err)
        })
    })

    socket.on('disconnct', (socket)=>{
        console.log('dicsonnect socket id:' + socket.id)
    })
})



