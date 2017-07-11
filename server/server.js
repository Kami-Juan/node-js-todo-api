require('./config/config');
const _ = require('lodash');
var { ObjectID } = require('mongodb');
var express = require('express');
var bodyParse = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
var port = process.env.PORT;

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

app.get('/todos', ( req, res ) => {
    Todo.find().then( (todos) =>  {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', ( req, res ) => {
    var id  = req.params.id;
    if( !ObjectID.isValid(id) ){
        return res.status(404).send();
    }

    Todo.findById(id).then( (todo) => {
        if( !todo ){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch( (e) => res.status(400).send());

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if( !ObjectID.isValid(id) ){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then( (todo) => {
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch( (e) => res.status(404).send());
});

app.patch('/todos/:id', ( req, res ) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['texto', 'completado']);

    if( !ObjectID.isValid(id) ){
        return res.status(404).send();
    }

    if( _.isBoolean(body.completado) && body.completado){
        body.completadoAt = new Date().getTime();
    }else{
        body.completado = false;
        body.completadoAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body}, {new: true} ).then( (todo) => {
        if( !todo ){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch( (e) => {
        return res.status(400).send();
    });

});
app.listen( port, () =>  {
    console.log(`Se está iniciando en el puerto ${ port }`);
});

module.exports = { app };