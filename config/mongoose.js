const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/polling_system_api');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting to MongoDB"));

db.once('open', () => {
    console.log("Connected to DataBase :: MongoDB");
});

module.exports = db;