var express = require('express');
var bodyParser = require('body-parser');
var movieService = require('./movieService.js');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('movies', 'test', null, { dialect: 'sqlite', storage: './db.movies.sqlite' });

var movie = sequelize.define('movie', {
  title: Sequelize.STRING,
  uniqueId: Sequelize.INTEGER,
  counter: { type: Sequelize.INTEGER, defaultValue: 1}
});
movie.sync({ force: false }).then(function(err) {
 console.log('table created!', err);
});


var app = express();

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {

});

app.get('/movies', function(req, res) {
  movieService.fetch(function(st) {
    res.status(200).send(st);
  });
});

app.post('/viewMovies', function(req, res) {
  movie.findAll({
    where: { uniqueId: req.body.id},
  }).then(function(result) {
    if (result.length === 0) {
      movie.create({ title: req.body.original_title, uniqueId: req.body.id });
    } else {
      movie.update({counter: result[0].dataValues.counter + 1}, {where: {uniqueId: req.body.id}})
    }
  }).then(function() {
    res.sendStatus(201);
  });

});

app.get('/viewMovies', function(req, res) {
  var data = [];
  movie.findAll({
    order: [
      ['counter', 'DESC']
    ]
  }).then(function(result) {
    console.log('&&&&&&&&', result);
    result.forEach(function(movie) {
      data.push(movie.dataValues);
    });
  }).then(function() {
    res.set({
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    });

    res.status(200).json(data);
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
