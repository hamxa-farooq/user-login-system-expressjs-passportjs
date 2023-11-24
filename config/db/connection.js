const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost/nodeauth');

mongoose.connection.on('connecting', () => {
  console.log('making initial connection with mongoDB server');
});

mongoose.connection.on('connected', () => {
  console.log('connection successfull with mongoDB server');
});

mongoose.connection.on('disconnecting', () => {
  console.log('disconnecting mongoDB server upon calling connection.close()');
});


mongoose.connection.on('close', () => {
  console.log('disconnecting mongoDB server upon calling connection.close()');
});


mongoose.connection.on('disconnected', () => {
  console.log('connection to mongoDB server lost due to database server crash, network connectivity issues or explicitly closing connection');
});

mongoose.connection.on('reconnected', () => {
  console.log('mongoDB successfully reconnected after losing connection to mongoDB server');
});

module.exports = connection;


