const express = require('express');
const http = require('http');
const db = require('./db');
const initializeWebSocket = require('./websocket');
const playerRoutes = require('./db_players');
const roomRoutes = require('./room');
const path = require('path-browserify');
const app = express();
const port = 3001;

// CORS config
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../Game')));

// use route
app.use(playerRoutes);
app.use(roomRoutes);

// create HTTP server
const server = http.createServer(app);

// init WebSocket
initializeWebSocket(server);

// Start server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
