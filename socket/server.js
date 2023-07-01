const app = require("../socket/app");
const http = require('http');
const server = http.createServer(app);

module.exports = server;