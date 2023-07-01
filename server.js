require('dotenv').config()

const express = require("express");
var multer = require('multer');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
var upload = multer();
const app = require("./socket/app");
const server = require("./socket/server")
/*const http = require('http');
const server = http.createServer(app);*/
//const { Server } = require('socket.io');
const io = require("./socket/socket")
const signInRoute = require("./routes/sign_in");
const signUpRoute = require("./routes/sign_up");
const userRoute = require("./routes/user.js");
//const adminSignUpRoute = require("./routes/admin_sign_up");
const adminSignInRoute = require("./routes/admin_sign_in");
const usersRoutes = require("./routes/allUsers");
const getUserInfoRoute = require("./routes/getUserInfo");
const getAdmin = require("./routes/adminUser");
const getAdminMessagesList = require("./routes/admin_messageList");
const getAllChats = require("./routes/allChats");
const sendMessage = require("./routes/sendMessage");
const getChat = require("./routes/getChat")
const getMessages = require("./routes/getMessages")

const apiKey = 'TEST_MfuPZDLn67liPCK3Z76CjWcf7pb+32o2vVdnhB2I7/Q';

const allowedOrigins = ['http://localhost:3000/', 'https://trackit-client.vercel.app/', "https://www.thunderclient.com/", "https://tracitit-admin-portal.vercel.app/"];

var corsOptions = {
  origin: ['https://trackit-client.vercel.app', 'http://localhost:3000', "https://tracitit-admin-portal.vercel.app" /* "https://www.thunderclient.com/" */],
};


app.use(
  cors({ origin: '*' })
);

/*app.use(
  cors({
  origin: '*'
}))*/

/* "https://www.thunderclient.com/" */ /// Include in origin options when in development.
/*const io = new Server(server, {
    cors: {
      origin: ['https://trackit-client.vercel.app', 'http://localhost:3000', "https://tracitit-admin-portal.vercel.app" ]
    }
  });*/
  
  
  app.use(bodyParser.json()); 
  
  // for parsing application/xwww-
  app.use(bodyParser.urlencoded({ extended: true })); 
  //form-urlencoded
  
  // for parsing multipart/form-data
  app.use(upload.array()); 
  app.use(express.static('public'));
  //app.use(flash())
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();});
  
    mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}Trackit`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then((_) => {
    console.log("Connected to MongoDb Trackit database");
  }).catch((err) => {
    console.log(err);
  })

  app.get("/", (req, res) => {
    res.send("Welcome to the TrackIt client API.");
  })

  app.post("/sign_in", signInRoute);
  app.post("/sign_up", signUpRoute);
  app.get("/user", userRoute);
  app.get("/admin", getAdmin)
  app.post("/admin_sign_in", adminSignInRoute);
  app.get("/users", usersRoutes)
  app.post("/userInfo", getUserInfoRoute)
  app.post("/adminMessagesList", getAdminMessagesList);
  app.get("/chats", getAllChats);
  app.post("/sendMessage", sendMessage);
  app.post("/getChat", getChat);
  app.post("/getMessages", getMessages)
  //app.post("/admin_sign_up_private_2343_access=false", adminSignUpRoute)


  server.listen(process.env.PORT || 5000, () => {
    console.log('listening on *:5000');
  });



