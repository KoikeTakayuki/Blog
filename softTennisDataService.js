var service = {};

var createQueryPromise = function(query, data, getOnlyFirst) {

    return function(connection) {
        return new Promise(function(success, failure) {

            var callback = function(err, result) {

                if (err) {
                  throw err;
                    failure(err);
                } else if (getOnlyFirst) {
                    if (result[0]) {
                        success(result[0]);
                    } else {
                        success(null);
                    }
                } else {
                    success(result);
                }
            };

            if (!data) {
                connection.query(query, callback);
            } else {
                connection.query(query, data, callback);
            }
        });
    };
};

var insertRecord = function(tableName, isViebleFieldNotExists) {

    var trimObject = function(o) {
        var result = {};
        Object.keys(o).forEach(function(k) {
            var val = o[k];

            if (val !== '' && val !== null && val !== undefined) {
                result[k] = val;
            }
        });
        return result;
    };

    return function(connection, data) {
        if (!isViebleFieldNotExists) {
            data.is_visible = true;
        }

        data = trimObject(data);

        return createQueryPromise('INSERT INTO ' + tableName + ' SET ?', data)(connection);
    };
};

var getPlayerById = function(connection, id) {
    return createQueryPromise('SELECT * FROM player WHERE ?', { id: id }, true)(connection);
};

var getRoundById = function(connection, id) {
    return createQueryPromise('SELECT * FROM round WHERE ?', { id: id }, true)(connection);
};

var getCompetitionByCompetitionId = function(connection, competitionId) {
    return createQueryPromise('SELECT * FROM competition WHERE ?', { id: competitionId }, true)(connection);
};

service.getMatchById = function(connection, id) {
    return createQueryPromise('SELECT * FROM soft_tennis_match WHERE ?', { id: id }, true)(connection);
};

service.getGamesByMatchId = function(connection, matchId) {
    return createQueryPromise('SELECT * FROM game WHERE ?', { match_id: matchId })(connection);
};

service.getGameById = function(connection, id) {
    return createQueryPromise('SELECT * FROM game INNER JOIN soft_tennis_match ON soft_tennis_match.id = game.match_id WHERE ? ', { "game.id": id }, true)(connection);
};

service.getPointsByGameId = function(connection, gameId) {
    return createQueryPromise('SELECT * FROM point WHERE ?', { game_id: gameId })(connection);
};

service.getPointById = function (connection, id) {
  return createQueryPromise('SELECT * FROM point INNER JOIN soft_tennis_match ON soft_tennis_match.id = point.match_id INNER JOIN game ON game.id = point.game_id WHERE ? ', { "point.id": id }, true)(connection);
};

service.getPlayersByMatchId = function (connection, matchId) {
  return createQueryPromise('SELECT * FROM player INNER JOIN soft_tennis_match ON player.id = soft_tennis_match.player1_id OR player.id = soft_tennis_match.player2_id OR player.id = soft_tennis_match.player3_id OR player.id = soft_tennis_match.player4_id WHERE ?', { "soft_tennis_match.id": matchId })(connection);
};

service.getLarryCountByPointId = function (connection, pointId) {
    return createQueryPromise('SELECT COUNT(*) FROM shot WHERE ?', { point_id: pointId }, true)(connection);
};



service.insertCompetitionTag = insertRecord('competition_tag');
service.insertPlayer = insertRecord('player');
service.insertShotType = insertRecord('shot_type');
service.insertTeam = insertRecord('team');
service.insertTennisCourt = insertRecord('tennis_court');
service.insertChampion = insertRecord('champion');
service.insertShotDirection = insertRecord('shot_direction');
service.insertOtherShotProperty = insertRecord('other_shot_property');
service.insertGame = insertRecord('game', true);
service.insertPoint = insertRecord('point', true);
service.insertShot = insertRecord('shot', true);

service.insertCompetition = function(connection, data) {
    var date = new Date(data.date_year, data.date_month - 1, data.date_day);
    return insertRecord('competition')(connection, {
        date: date,
        name: data.name,
        tennis_court_id: data.tennis_court_id,
        description: data.description,
        duration: data.duration,
        competition_type_id: data.competition_type
    }).then(function(insertResult) {
        var competitionId = insertResult.insertId;

        if (!data.competition) {
            return Promise.resolve();
        }

        var promises = data.competition_tag_ids.map(function(tagId) {
            insertRecord('competition_tags')(connection, {
                competition_id: competitionId,
                competition_tag_id: tagId
            });
        });

        return Promise.all(promises);
    });
};

service.insertMatch = function(connection, data) {
    var date = new Date(data.date_year, data.date_month - 1, data.date_day);
    var competitionId = data.competition_id;
    var matchId;
    var gameId;


    return Promise.all([
        getCompetitionByCompetitionId(connection, competitionId),
        getRoundById(connection, data.round_id),
        getPlayerById(connection, data.player1_id),
        getPlayerById(connection, data.player2_id),
        getPlayerById(connection, data.player3_id),
        getPlayerById(connection, data.player4_id)
    ]).then(function(results) {
        var competitionContainer = results[0];
        var roundName = results[1].name;
        var nameContainer = results.slice(2, 6);

        var names = nameContainer.map(function(e) {
            return e.name;
        });

        var tennisCourtId = competitionContainer ? competitionContainer.tennis_court_id : null;
        var competitionName = competitionContainer ? competitionContainer.name : null;
        var title = competitionName + ' ' + roundName + ' ' + names[0] + '・' + names[1] + ' 対 ' + names[2] + '・' + names[3];

        return insertRecord('soft_tennis_match')(connection, {
            player1_id: data.player1_id,
            player2_id: data.player2_id,
            player3_id: data.player3_id,
            player4_id: data.player4_id,
            title: title,
            url: data.url,
            date: date,
            max_game_count: data.max_game_count,
            round_id: data.round_id,
            competition_id: data.competition_id,
            is_singles: (data.is_singles === "true"),
            tennis_court_id: tennisCourtId
        });
    }).then(function(insertResult) {
        matchId = insertResult.insertId;

        return service.insertGame(connection, {
            total_game_count: 1,
            game_count_a: 0,
            game_count_b: 0,
            is_final_game: false,
            match_id: matchId
        });
    }).then(function(insertResult) {
        gameId = insertResult.insertId;

        return service.insertPoint(connection, {
            game_id: gameId,
            match_id: matchId,
            total_count: 1,
            count_a: 0,
            count_b: 0,
            is_game_point_for_a: false,
            is_game_point_for_b: false,
            is_match_point_for_a: false,
            is_match_point_for_b: false,
        });
    });
};

service.getAllPrefectures = createQueryPromise('SELECT id, name FROM prefecture');
service.getAllTeamDivisions = createQueryPromise('SELECT id, name FROM team_division');
service.getAllTeams = createQueryPromise('SELECT id, name FROM team');
service.getJuniorHighTeams = createQueryPromise('SELECT id, name FROM team WHERE team_division_id = "2"');
service.getHighSchoolTeams = createQueryPromise('SELECT id, name FROM team WHERE team_division_id = "3"');
service.getUniversityTeams = createQueryPromise('SELECT id, name FROM team WHERE team_division_id = "4"');
service.getAllGenders = createQueryPromise('SELECT id, name FROM gender');
service.getAllPlayers = createQueryPromise('SELECT id, name FROM player');
service.getAllCompetitions = createQueryPromise('SELECT id, name FROM competition');
service.getAllCompetitionTypes = createQueryPromise('SELECT id, name FROM competition_type');
service.getAllCompetitionTags = createQueryPromise('SELECT id, name FROM competition_tag');
service.getAllTennisCourt = createQueryPromise('SELECT id, name FROM tennis_court');
service.getAllRounds = createQueryPromise('SELECT id, name FROM round');
service.getAllSurfaces = createQueryPromise('SELECT id, name FROM court_surface');
service.getAllGames = createQueryPromise('SELECT * FROM game');
service.getAllMatches = createQueryPromise('SELECT * FROM soft_tennis_match');

service.getAllShotTypes = createQueryPromise('SELECT * FROM shot_type');
service.getAllShotDirections = createQueryPromise('SELECT * FROM shot_direction');
service.getAllOtherShotProperties = createQueryPromise('SELECT * FROM other_shot_property');

service.getAllWinnerTypes = createQueryPromise('SELECT * FROM winner_type');
service.getAllErrorTypes = createQueryPromise('SELECT * FROM error_type');

module.exports = service;
