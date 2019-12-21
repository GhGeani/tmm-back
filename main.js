const express = require('express');
const Server = require('./src/server');

const server = new Server(express);
server.run(process.env.mode);
