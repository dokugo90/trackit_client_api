require('dotenv').config()

const express = require("express");
var multer = require('multer');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
var upload = multer();
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const signInRoute = require("./routes/sign_in");
const signUpRoute = require("./routes/sign_up");
const userRoute = require("./routes/user.js");

const allowedOrigins = ['http://localhost:3000'];

/*app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is allowed
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);*/

app.use(
  cors({
  origin: '*'
}))

const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });  
  
  
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

  app.post("/test", (req, res) => {
    res.send("Post requests works")
  })

  app.post("/sign_in", signInRoute);
  app.post("/sign_up", signUpRoute);
  app.get("/user", userRoute);


  server.listen(process.env.PORT || 5000, () => {
    console.log('listening on *:5000');
  });

