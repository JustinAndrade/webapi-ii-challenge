const express = require('express');

const Router = require('./data/router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', Router);

server.get('/', (req, res) => {
	res.send(`
    <h2> Lambda Posts</h2>
    `);
});

module.exports = server;
