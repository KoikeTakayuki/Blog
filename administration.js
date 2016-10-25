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
      service.getAllTeams(connection)
    ]).then(function (results) {

      res.render('create-new-team',
        {
          prefectures: results[0],
          divisions: results[1],
          teams: results[2]
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

app.get('/create-new-other-shot-property', function (req, res) {
  res.render('create-new-enumeration-element', {
    title: 'その他のショットの性質作成',
    action: 'create-new-other-shot-property'
  });
});

app.post('/create-new-other-shot-property', function (req, res) {
  service
    .insertOtherShotProperty(connection, req.body)
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

app.get('/create-new-tennis-court', function (req, res) {

  Promise.all([
    service.getAllPrefectures(connection),
    service.getAllSurfaces(connection)
  ]).then(function (results) {
    res.render('create-new-tennis-court', {
      prefectures: results[0],
      surfaces: results[1]
    });
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
    }).catch(function (e) {

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
          tennisCourts: results[2],
          years: _.range(2000, 2021),
          months: _.range(1, 13),
          days: _.range(1, 32)
        });
    }).catch(function (err) {
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

app.get('/create-new-match', function (req, res) {

    Promise.all([
      service.getAllCompetitions(connection),
      service.getAllPlayers(connection),
      service.getAllRounds(connection)
    ]).then(function (results) {
      res.render('create-new-match',
        {
          competitions: results[0],
          players: results[1],
          rounds: results[2],
          maxGameCounts: [9, 7, 5],
          years: _.range(2000, 2021),
          months: _.range(1, 13),
          days: _.range(1, 32)
        });
    }).catch(function () {
      console.log("catch error");
      res.send("catch error");
    });
});

app.post('/create-new-match', function (req, res) {
  service
    .insertMatch(connection, req.body)
    .then(function () {
       res.redirect('/');
    });
});

app.get('/match', function (req, res) {

  service
    .getAllMatches(connection)
    .then(function (matches) {
      res.render('match', { matches: matches });
    });
});

app.get('/match/:matchId/games', function (req, res) {
  var matchId = req.params.matchId;

  Promise.all([
    service.getMatchById(connection, matchId),
    service.getGamesByMatchId(connection, matchId)
  ]).then(function (results) {
    var match = results[0];
    var games = results[1];

    res.render('match-games', {
      match: match,
      games: games
    });
  });
});

app.get('/game/:gameId/points', function (req, res) {
  var gameId = req.params.gameId;

  Promise.all([
    service.getGameById(connection, gameId),
    service.getPointsByGameId(connection, gameId)
  ]).then(function (results) {
    var game = results[0];
    var points = results[1];

    res.render('game-points', {
      game: game,
      points: points
    });
  });
});

app.get('/point/:pointId/create-new-shot', function (req, res) {
  var pointId = req.params.pointId;
  var thisPoint;

  service
    .getPointById(connection, pointId)
    .then(function (point) {
      thisPoint = point;

      return Promise.all([
        service.getPlayersByMatchId(connection, point.match_id),
        service.getLarryCountByPointId(connection, point.id),
        service.getAllShotTypes(connection),
        service.getAllShotDirections(connection),
        service.getAllOtherShotProperties(connection),
        service.getAllWinnerTypes(connection),
        service.getAllErrorTypes(connection)
      ]);
    }).then(function (results) {
      var players = results[0];
      var larryCount = results[1]["COUNT(*)"] + 1;
      var shotTypes = results[2];
      var shotDirections = results[3];
      var ohterShotProperties = results[4];
      var winnerTypes = results[5];
      var errorTypes = results[6];

      res.render('create-new-shot', {
        point: thisPoint,
        players: players,
        larryCount: larryCount,
        shotTypes: shotTypes,
        shotDirections: shotDirections,
        otherShotProperties: ohterShotProperties,
        winnerTypes: winnerTypes,
        errorTypes: errorTypes
      });
    });
});

app.post('/point/:pointId/create-new-shot', function (req, res) {
  var data = req.body;
  var pointId = req.params.pointId;
  data.is_winner = data.is_winner === "true";
  data.is_error = data.is_error === "true";


  if (data.is_winner || data.is_error) {

      service
        .insertShot(connection, data)
        .updatePoint()

  } else {

    service
      .insertShot(connection, data)
      .then(function () {
        res.redirect('/point/' + pointId + '/create-new-shot');
      });
  }

});

app.listen(3000);
