require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')
const path = require('path')
const cloudinary = require('cloudinary');

// Configuration 
cloudinary.v2.config({
    cloud_name: "malllik",
    api_key: "966681516551862",
    api_secret: "6o2r2goUHgpapPZekRXVj2Q9F2Q"
  });


const app = express()
app.use(express.json())
app.use(cors({
    origin : 'https://socialllink.netlify.app'
}))
app.use(cookieParser())


// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http ,{
    cors: {
        origin: "https://socialllink.netlify.app",
        methods: ["GET", "POST","PUT","DELETE"]
      }
})

io.on('connection', socket => {
    SocketServer(socket)
})

// Create peer server
ExpressPeerServer(http, { path: '/' })


// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))
app.use('/api', require('./routes/messageRouter'))


const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to mongodb')
    console.log("By malik")
})




const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log('Server is running on port', port)
})