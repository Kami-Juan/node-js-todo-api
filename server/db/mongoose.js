var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp' || 'mongodb://juanganzo69:Watusi04@ds153412.mlab.com:53412/node-api-todo', { useMongoClient: true });
// mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });

module.exports = { mongoose };