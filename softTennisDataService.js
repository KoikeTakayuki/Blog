
var service = {};

var createQueryPromise = function (query, data) {

	return function (connection) {
		return new Promise(function (success, failure) {

			var callback = function (err, result) {
				return err ? failure() : success(result);
			};

			if (!data) {
				connection.query(query, callback);
			} else {
				connection.query(query, data, callback);
			}
	});
    };
};

var insertRecord = function (tableName) {

  var trimObject = function (o) {
    var result = {};
    Object.keys(o).forEach(function (k) {
      var val = o[k];
      if (val !== '') {
        result[k] = val;
      }
    });
    return result;
  };

  return function (connection, data) {
    data.is_visible = true;
    return createQueryPromise('INSERT INTO ' + tableName + ' SET ?', trimObject(data))(connection);
  };
};

service.insertMatchTag = insertRecord('match_tag');
service.insertCompetitionTag = insertRecord('competition_tag');
service.insertPlayer = insertRecord('player');
service.insertShotType = insertRecord('shot_type');
service.insertTeam = insertRecord('team');
service.insertTennisCourt = insertRecord('tennis_court');
service.insertChampion = insertRecord('champion');
service.insertShotDirection = insertRecord('shot_direction');


service.insertCompetition = function (connection, data) {
  console.log(data);
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
module.exports = service;
