var express = require('express');
var app = express();
var mysql = require('mysql');
var service = require('./softTennisDataService');
var dbConfig = require('./config/mysqlConfig');
var connection = mysql.createConnection(dbConfig);
var bodyParser = require('body-parser');
var _ = require('underscore');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'jade');
app.set('views', __dirname + '/private');

app.get('/', function (req, res) {
  res.render('administration');
});

app.get('/create-new-team', function (req, res) {
    Promise.all([
      service.getAllPrefectures(connection),
      service.getAllTeamDivisions(connection),
    ]).then(function (results) {

      res.render('create-new-team',
        {
          prefectures: results[0],
          divisions: results[1],
        });
    }).catch(function () {
      console.log("catch error");
      res.send("catch error");
    });
});

app.post('/create-new-team', function (req, res) {
  service
    .insertTeam(connection, req.body)
    .then(function () {
      res.redirect('/');
    });
});

app.get('/create-new-player', function (req, res) {
    Promise.all([
      service.getJuniorHighTeams(connection),
      service.getHighSchoolTeams(connection),
      service.getUniversityTeams(connection),
      service.getAllTeams(connection),
      service.getAllGenders(connection)
    ]).then(function (results) {
      res.render('create-new-player',
        {
          juniorHighTeams: results[0],
          highSchoolTeams: results[1],
          universityTeams: results[2],
          allTeams: results[3],
          genders: results[4],
          years: _.range(1960, 2010)
        });
    }).catch(function () {
      console.log("catch error");
      res.send("catch error");
    });
});

app.post('/create-new-player', function (req, res) {

  service
    .insertPlayer(connection, req.body)
    .then(function () {
      res.redirect('/');
    })
    .catch(function () {
      console.log("catch error");
      res.send("catch error");
    });
});

app.get('/create-new-shot-type', function (req, res) {
  res.render('create-new-enumeration-element', {
    title: 'ショット種類作成',
    action: 'create-new-shot-type'
  });
});

app.post('/create-new-shot-type', function (req, res) {
  service
    .insertShotType(connection, req.body)
    .then(function () {
      res.redirect('/');
    });
});

app.get('/create-new-shot-direction', function (req, res) {
  res.render('create-new-enumeration-element', {
    title: 'コース作成',
    action: 'create-new-shot-direction'
  });
});

app.post('/create-new-shot-direction', function (req, res) {
  service
    .insertShotDirection(connection, req.body)
    .then(function () {
      res.redirect('/');
    });
});

app.get('/create-new-competition-tag', function (req, res) {
  res.render('create-new-enumeration-element', {
    title: '大会タグ作成',
    action: 'create-new-competition-tag'
  });
});

app.post('/create-new-competition-tag', function (req, res) {
  service
    .insertCompetitionTag(connection, req.body)
    .then(function () {
      res.redirect('/');
    });
});

app.get('/create-new-match-tag', function (req, res) {
  res.render('create-new-enumeration-element', {
    title: '試合タグ作成',
    action: 'create-new-match-tag'
  });
});

app.post('/create-new-match-tag', function (req, res) {
  service
    .insertMatchTag(connection, req.body)
    .then(function () {
      res.redirect('/');
    });
});

app.get('/create-new-tennis-court', function (req, res) {
  service
    .getAllPrefectures(connection)
    .then(function (prefectures) {
      res.render('create-new-tennis-court', { prefectures: prefectures });
    });
});

app.post('/create-new-tennis-court', function (req, res) {
  service
    .insertTennisCourt(connection, req.body)
    .then(function () {
      res.redirect('/');
    });
});

app.get('/create-new-champion', function (req, res) {

    Promise.all([
      service.getAllPlayers(connection),
      service.getAllCompetitions(connection),
    ]).then(function (results) {
      res.render('create-new-champion',
        {
          players: results[0],
          competitions: results[1]
        });
    }).catch(function () {
      console.log("catch error");
      res.send("catch error");
    });
});

app.post('/create-new-champion', function (req, res) {
  service
    .insertChampion(connection, req.body)
    .then(function () {
      res.redirect('/');
    });
});

app.get('/create-new-competition', function (req, res) {

    Promise.all([
      service.getAllCompetitionTags(connection),
      service.getAllCompetitionTypes(connection),
      service.getAllTennisCourt(connection)
    ]).then(function (results) {
      res.render('create-new-competition',
        {
          competitionTags: results[0],
          competitionTypes: results[1],
          tennisCourts: results[2]
        });
    }).catch(function () {
      console.log("catch error");
      res.send("catch error");
    });
});

app.post('/create-new-competition', function (req, res) {
  service
    .insertCompetition(connection, req.body)
    .then(function () {
      res.redirect('/');
    });
});

app.listen(3000);
