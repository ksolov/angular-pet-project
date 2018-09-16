const path = require('path');
const md5 = require('md5');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const serverSettings = require('./config/settings').server;

app.use(express.static('build'));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send(path.resolve('build/index.html'));
});

app.get(serverSettings.api + '*', function(req, res, next){
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    next();
});

app.post(serverSettings.api + '*', function(req, res, next){
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//check route
app.get(serverSettings.api + 'check', function (req, res){
    res.json({"status" : "ok"});
});

app.post(serverSettings.api + 'registration', async function (req, res) {
    const login = req.body.email || '';
    const password = req.body.password || '';
    const name = req.body.name || '';
    const passwordConfirm = req.body.passwordConfirm || '';
    if(login && password && password === passwordConfirm) {
        try{
            res.status(201).send({ name: name, email: login });
        }
        catch (e) {
            res.status(500).send({ msg: 'Fail from ' + e.source });
        }
    } else {
        res.status(401).send({ msg: 'Error in data'});
    }
});

app.post(serverSettings.api + 'login', async function (req, res) {
    const login = req.body.email || '';
    const password = req.body.password || '';
    if(login && password) {
        try{
            res.status(201).send({ name: 'Vasya Pupkin', email: login });
        }
        catch (e) {
            res.status(500).send({ msg: 'Fail from ' + e.source });
        }
    } else {
        res.status(401).send({ msg: 'Login or password is empty' });
    }
});

app.post(serverSettings.api + 'forgot', async function (req, res) {
    const login = req.body.email || '';
    const pass1 = req.body.pass1 || '';
    const pass2 = req.body.pass2 || '';
    if(login && pass1 && pass2) {
        if (pass1 !== pass2) {
            res.status(404).send({ msg: 'Pass1 and pass2 is not equal' });
        } else {
            res.status(201).send({ status: 'ok' });
        }
    } else {
        res.status(404).send({ msg: 'Login or password is empty' });
    }
});


const server = app.listen(serverSettings.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://', host, port);
});
