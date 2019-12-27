const express = require('express');
const mongoose = require('mongoose');
const Server = require('./src/server');
const Database = require('./src/database');

const server = new Server(express, process.env.NODE_ENV);
const db = new Database(mongoose, process.env.NODE_ENV);

db.connect(() => {
  server.run();
});
