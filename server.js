'use strict'
var express = require('express');
var path =require('path');
var app = express();
var nunjucks = require('nunjucks');
var env = nunjucks.configure('views', {noCache: true});
var router = require('./routes');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
var models = require('./models');
app.use('/vendor', express.static(path.join(__dirname,'node_modules')));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('method-override')('_method'));   //looks in action for POST for things like ?_method=DELETE

app.use('/', router);
app.use('/wiki', express.static(path.join(__dirname, 'routes/')))
app.use('/',function(req,res,next) {
  console.log(req.url);
  next();
});

app.get('/', function(req, res, next) {
  res.render('index');
})

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
