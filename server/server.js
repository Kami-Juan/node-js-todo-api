var express = require('express');
var bodyParse = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParse.json());

app.post('/todos', ( req, res ) => {
    var todo = new Todo({
        texto: req.body.texto
    });

    todo.save().then( (doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000');
});

module.exports = { app };