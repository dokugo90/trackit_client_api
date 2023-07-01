const server = require("../socket/server")
const { Server } = require('socket.io');

const allowedOrigins = ['https://trackit-client.vercel.app', 'http://localhost:3000', "https://tracitit-admin-portal.vercel.app"];

const io = new Server(server, {
    cors: {
      origin: '*'
    }
  }); 

  module.exports = io;