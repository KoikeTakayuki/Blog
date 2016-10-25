var mysql      = require('mysql');
var dbConfig = require('../config/mysqlConfig');
var DB_NAME = dbConfig.database;
var connection = mysql.createConnection(dbConfig, function (err) {
    if (err) {
	throw err;
    }
});

var PREFECTURES = [
    { name: '北海道', urlString: 'hokkaido'},
    { name: '青森県', urlString: 'aomori' },
    { name: '岩手県', urlString: 'iwate' },
    { name: '宮城県', urlString: 'miyagi' },
    { name: '秋田県', urlString: 'akita' },
    { name: '山形県', urlString: 'yamagata' },
    { name: '福島県', urlString: 'fukushima' },
    { name: '茨城県', urlString: 'ibaragi' },
    { name: '栃木県', urlString: 'tochigi' },
    { name: '群馬県', urlString: 'gunma' },
    { name: '埼玉県', urlString: 'saitama' },
    { name: '千葉県', urlString: 'chiba' },
    { name: '東京都', urlString: 'tokyo' },
    { name: '神奈川県', urlString: 'kanagawa' },
    { name: '新潟県', urlString: 'niigata' },
    { name: '富山県', urlString: 'toyama' },
    { name: '石川県', urlString: 'ishikawa' },
    { name: '福井県', urlString: 'fukui' },
    { name: '山梨県', urlString: 'yamanashi' },
    { name: '長野県', urlString: 'nagano' },
    { name: '岐阜県', urlString: 'gifu' },
    { name: '静岡県', urlString: 'shizuoka' },
    { name: '愛知県', urlString: 'aichi' },
    { name: '三重県', urlString: 'mie' },
    { name: '滋賀県', urlString: 'shiga' },
    { name: '京都府', urlString: 'kyoto' },
    { name: '大阪府', urlString: 'osaka' },
    { name: '兵庫県', urlString: 'hyogo' },
    { name: '奈良県', urlString: 'nara' },
    { name: '和歌山県', urlString: 'wakayama' },
    { name: '鳥取県', urlString: 'tottori' },
    { name: '島根県', urlString: 'shimane' },
    { name: '岡山県', urlString: 'okayama' },
    { name: '広島県', urlString: 'hiroshima' },
    { name: '山口県', urlString: 'yamaguchi' },
    { name: '徳島県', urlString: 'tokushima' },
    { name: '香川県', urlString: 'kagawa' },
    { name: '愛媛県', urlString: 'ehime' },
    { name: '高知県', urlString: 'kochi' },
    { name: '福岡県', urlString: 'fukuoka' },
    { name: '佐賀県', urlString: 'saga' },
    { name: '長崎県', urlString: 'nagasaki' },
    { name: '熊本県', urlString: 'kumamoto' },
    { name: '大分県', urlString: 'oita' },
    { name: '宮崎県', urlString: 'miyazaki' },
    { name: '鹿児島県', urlString: 'kagoshima' },
    { name: '沖縄県', urlString: 'okinawa' }
];

var TEAM_DIVISIONS = [
    { name: '小学校', urlString: 'elementary-school' },
    { name: '中学校', urlString: 'junior-high-school' },
    { name: '高校', urlString: 'high-school' },
    { name: '大学', urlString: 'university' },
    { name: '実業団', urlString: 'works-team' },
    { name: 'クラブチーム', urlString: 'club' }
];

var ROUNDS = [
    { name: '決勝', urlString: 'final' },
    { name: '準決勝', urlString: 'semi-final' },
    { name: '準々決勝', urlString: 'quarter-final' },
    { name: '一回戦', urlString: 'first-round' },
    { name: '二回戦', urlString: 'second-round' },
    { name: '三回戦', urlString: 'third-round' },
    { name: '四回戦', urlString: 'fourth-round' },
    { name: '五回戦', urlString: 'fifth-round' },
    { name: '六回戦', urlString: 'sixth-round' },
    { name: '七回戦', urlString: 'seventh-round' }
];

var GENDERS = [
    { name: '男', urlString: 'man' },
    { name: '女', urlString: 'woman' }
];

var COMPETITION_TYPES = [
    { name: 'トーナメント', urlString: 'tournament' },
    { name: 'リーグ', urlString: 'league' }
];

var COURT_SERFACES = [
    { name: 'オムニ', urlString: 'omni' },
    { name: 'クレー', urlString: 'clay' },
    { name: 'インドア', urlString: 'indoor' },
    { name: 'ハード', urlString: 'hard' }
];

var COMPETITION_TAGS = [
    { name: '天皇杯', urlString: 'emperors-cup' },
    { name: 'インターハイ', urlString: 'interscholastic-athletic-meet' }
];

var SHOT_DIRECTIONS = [
    { name: 'クロス', urlString: 'cross' },
    { name: '逆クロス', urlString: 'inside-out' },
    { name: '右ストレート', urlString: 'forehand-side-down-the-line' },
    { name: '左ストレート', urlString: 'backhand-side-down-the-line'},
    { name: 'センター', urlString: 'center' },
];

var SHOT_TYPES = [
    { name: '正クロスボレー', urlString: 'volley' },
    { name: '逆クロスボレー', urlString: 'volley' },
    { name: '右ストレートボレー', urlString: 'volley' },
    { name: '左ストレートボレー', urlString: 'volley' },
    { name: 'ストップボレー', urlString: 'stop-volley' },
    { name: 'ハイボレー', urlString: 'high-volley' },
    { name: 'ローボレー', urlString: 'low-volley' },
    { name: 'スマッシュ', urlString: 'smash' },
    { name: 'スイングボレー', urlString: 'swing-volley' },
    { name: 'ストローク', urlString: 'groundstroke' },
    { name: 'トップ打ち', urlString: 'top-stroke' },
    { name: 'ロブ', urlString: 'defensive-lob' },
    { name: '中ロブ', urlString: 'offensive-lob' },
    { name: 'スライス', urlString: 'slice' },
    { name: 'ドロップ', urlString: 'drop' },
    { name: 'フォロー', urlString: 'emergency-shot' }
];

var ERROR_TYPES = [
    { name: 'アウト', urlString: 'out' },
    { name: 'ネット', urlString: 'net' },
    { name: 'ダブルフォルト', urlString: 'double-fault' },
    { name: 'ネットタッチ', urlString: 'net-touch' },
    { name: 'オーバーネット', urlString: 'over-net' },
    { name: 'インターフェアー', urlString: 'interfere' }
];

var OTHER_SHOT_PROPERTIES = [
    { name: 'ブロックボレー', urlString: 'block-volley' },
    { name: 'ポーチ', urlString: 'offensive-volley' },
    { name: '誘い', urlString: 'defensive-volley' },
    { name: 'ネットイン', urlString: 'net-in' },
    { name: 'アングル', urlString: 'angle' }
];

var WINNER_TYPES = [
    { name: 'エース', urlString: 'no-tache-ace' },
    { name: 'ネットプレー', urlString: 'net-play' },
    { name: 'パッシング', urlStirng: 'passing-shot' },
];

/* Utility */
var Future = function (futureOperation) {
    return function (result) {
        return new Promise(function (successContinuation, failureContinuation) {
            return futureOperation(result, successContinuation, failureContinuation);
        });
    };
};


var makeEnumerationTypeTable = function (tableName) {
    return function (connection, cont) {

        connection.query('CREATE TABLE ' + tableName + '(id INT(16) NOT NULL AUTO_INCREMENT, name VARCHAR(16) NOT NULL, url_string VARCHAR(32), is_visible BOOLEAN NOT NULL, PRIMARY KEY(ID))', function (err, results) {
            console.log('create ' + tableName + ' table');
            cont(connection);
        });	
    };
};


var insertEnumerationDatum = function (tableName) {
    return function (connection, cont, name, urlString) {
	connection.query('INSERT INTO ' + tableName + ' SET ?',
			 {
			     'name': name,
			     'url_string': urlString,
			     'is_visible': true
			 },
			 function (err) {
			     if (err) {
				 throw err;
			     }
			     
			     console.log('create ' + tableName + ': ' + name);
			     cont(); 
			 });
    };
};

var insertEnumerationData = function (tableName, data) {
    return function (connection, cont) {
	console.log('insert ' + tableName);

	var insert = insertEnumerationDatum(tableName);
	
	var promises = data.map(function (p) {
	    return new Promise(function (cont2) {
		insert(connection, cont2, p.name, p.urlString);
	    });
	});

	Promise.all(promises).then(function (values) {
	    console.log('finish inserting ' + tableName);
	    cont(connection);
	});
    };
};

var insertPrefectures = insertEnumerationData('prefecture', PREFECTURES),
    insertTeamDivisions = insertEnumerationData('team_division', TEAM_DIVISIONS),
    insertRounds = insertEnumerationData('round', ROUNDS),
    insertGenders = insertEnumerationData('gender', GENDERS),
    insertCompetitionTypes = insertEnumerationData('competition_type', COMPETITION_TYPES),
    insertCompetitionTags = insertEnumerationData('competition_tag', COMPETITION_TAGS),
    insertShotDirections = insertEnumerationData('shot_direction', SHOT_DIRECTIONS),
    insertShotTypes = insertEnumerationData('shot_type', SHOT_TYPES),
    insertErrorTypes = insertEnumerationData('error_type', ERROR_TYPES),
    insertWinnerTypes = insertEnumerationData('winner_type', WINNER_TYPES),
    insertCourtSurfaces = insertEnumerationData('court_surface', COURT_SERFACES),
    insertOtherShotProperties = insertEnumerationData('other_shot_property', OTHER_SHOT_PROPERTIES);

/* DBスキーマ */
var dropDatabase = function (connection, cont) {
    console.log("start");
    
    connection.query('DROP DATABASE ' + DB_NAME, function (err) {
	if (!err) {
	    console.log('finish deleting database');
	} else {
	    console.log('database already exists');
	}


	return cont(connection);
    });
};

var createDatabase = function (connection, cont) {

    connection.query('CREATE DATABASE ' + DB_NAME + ' collate utf8mb4_general_ci', function(err) {
	if (!err) {
	    console.log('create database');
	} else {

	}

	cont(connection);
    });
};

var useDatabase = function (connection, cont) {

    connection.query('USE ' + DB_NAME, function(err, results) {
	console.log('select using database');

	cont(connection);
    });
};

/* EnumerationType */
var createGenderTable = makeEnumerationTypeTable('gender'),
    createShotDirectionTable = makeEnumerationTypeTable('shot_direction'),
    createShotTypeTable = makeEnumerationTypeTable('shot_type'),
    createOtherShotPropertyTable = makeEnumerationTypeTable('other_shot_property'),
    createCompetitionTagTable = makeEnumerationTypeTable('competition_tag'),
    createCompetitionTypeTable = makeEnumerationTypeTable('competition_type'),
    createRoundTable = makeEnumerationTypeTable('round'),
    createTeamDivisionTable = makeEnumerationTypeTable('team_division'),
    createPrefectureTable = makeEnumerationTypeTable('prefecture'),
    createErrorTypeTable = makeEnumerationTypeTable('error_type'),
    createCourtSurfaceTable = makeEnumerationTypeTable('court_surface'),
    createWinnerTypeTable = makeEnumerationTypeTable('winner_type');


var createTeamTable = function (connection, cont) {
    connection.query('CREATE TABLE team(id INT(16) NOT NULL AUTO_INCREMENT, name VARCHAR(16) NOT NULL, url_string VARCHAR(32), prefecture_id INT, team_division_id INT, parent_team_id INT(16), is_visible BOOLEAN NOT NULL, FOREIGN KEY(prefecture_id) REFERENCES prefecture(id), FOREIGN KEY(team_division_id) REFERENCES team_division(id), FOREIGN KEY(parent_team_id) REFERENCES team(id), PRIMARY KEY(id))', function () {
        console.log('create team table');
        cont(connection);
    });	
};

var createPlayerTable = function (connection, cont) {
    connection.query('CREATE TABLE player(id INT(16) NOT NULL AUTO_INCREMENT, name VARCHAR(32) NOT NULL, profile LONGTEXT, birth_year INT(16), gender_id INT(16) NOT NULL, junior_high_team_id INT(16), high_school_team_id INT(16), university_team_id INT(16), current_team_id INT(16), is_visible BOOLEAN NOT NULL, FOREIGN KEY(gender_id) REFERENCES gender(id), FOREIGN KEY(junior_high_team_id) REFERENCES team(id), FOREIGN KEY(high_school_team_id) REFERENCES team(id), FOREIGN KEY(university_team_id) REFERENCES team(id), FOREIGN KEY(current_team_id) REFERENCES team(id), PRIMARY KEY(id))', function (e) {
        console.log('create player table');
        cont(connection);
    });
};


var createTennisCourtTable = function (connection, cont) {
    connection.query('CREATE TABLE tennis_court(id INT(16) NOT NULL AUTO_INCREMENT, name VARCHAR(32) NOT NULL, url VARCHAR(100), phone_number VARCHAR(32), court_surface_id INT(16), prefecture_id INT(16), address VARCHAR(100), longitude INT(16), latitude INT(16), is_visible BOOLEAN NOT NULL, FOREIGN KEY(prefecture_id) REFERENCES prefecture(id), FOREIGN KEY(court_surface_id) REFERENCES court_surface(id), PRIMARY KEY(id))', function () {
	console.log('create tennis court table');
	cont(connection);
    });
};


var createCompetitionTable = function (connection, cont) {
    connection.query('CREATE TABLE competition(id INT(16) NOT NULL AUTO_INCREMENT, name VARCHAR(32) NOT NULL, description LONGTEXT, tennis_court_id INT(16), date DATE, duration INT(8),  competition_type_id INT(16), is_visible BOOLEAN NOT NULL, FOREIGN KEY(tennis_court_id) REFERENCES tennis_court(id), FOREIGN KEY(competition_type_id) REFERENCES competition_type(id), PRIMARY KEY(id))', function () {
	console.log('create competition table');
	cont(connection);
    });
};

var createCompetitionTagsTable = function (connection, cont) {
    connection.query('CREATE TABLE competition_tags(id INT(16) NOT NULL AUTO_INCREMENT, competition_id INT(16) NOT NULL, competition_tag_id INT(16) NOT NULL, is_visible BOOLEAN NOT NULL, FOREIGN KEY(competition_id) REFERENCES competition(id), FOREIGN KEY(competition_tag_id) REFERENCES competition_tag(id), PRIMARY KEY(id))', function () {
	console.log('create competition tags table');
	cont(connection);
    });

};


var createChampionTable = function (connection, cont) {
    connection.query('CREATE TABLE champion(id INT(16) NOT NULL AUTO_INCREMENT, competition_id INT(16) NOT NULL, description INT(16), player1_id INT(16), player2_id INT(16), is_team_competition BOOLEAN, team_id INT(16), is_visible BOOLEAN NOT NULL, FOREIGN KEY(competition_id) REFERENCES competition(id), FOREIGN KEY(player1_id) REFERENCES player(id), FOREIGN KEY(player2_id) REFERENCES player(id), FOREIGN KEY(team_id) REFERENCES team(id), PRIMARY KEY(id))', function (e) {
	console.log('create champion table');
	cont(connection);
    });

};

var createTeamMatchTable = function (connection, cont) {
    connection.query('CREATE TABLE team_match(id INT(16) NOT NULL AUTO_INCREMENT, competition_id INT(16), team1_id INT(16), team2_id INT(16), is_team1_winner BOOLEAN, FOREIGN KEY(competition_id) REFERENCES competition(id), FOREIGN KEY(team1_id) REFERENCES team(id), FOREIGN KEY(team2_id) REFERENCES team(id), PRIMARY KEY(id))', function (e) {
    console.log('create team match table');
    cont(connection);
    });
};

var createSoftTennisMatchTable = function (connection, cont) {
    connection.query('CREATE TABLE soft_tennis_match(id INT(16) NOT NULL AUTO_INCREMENT, title VARCHAR(100) NOT NULL, url VARCHAR(100), competition_id INT(16), date DATE, round_id INT(16), tennis_court_id INT(16), max_game_count INT(8), player1_id INT(16), player2_id INT(16), player3_id INT(16), player4_id INT(16), is_singles BOOLEAN, is_side_a_winner BOOLEAN NOT NULL, team_match_id INT(16), team_match_number INT(16), previous_match_id INT(16), next_match_id INT(16), is_visible BOOLEAN NOT NULL, FOREIGN KEY(competition_id) REFERENCES competition(id), FOREIGN KEY(round_id) REFERENCES round(id), FOREIGN KEY(tennis_court_id) REFERENCES tennis_court(id), FOREIGN KEY(player1_id) REFERENCES player(id), FOREIGN KEY(player2_id) REFERENCES player(id), FOREIGN KEY(player3_id) REFERENCES player(id), FOREIGN KEY(player4_id) REFERENCES player(id), FOREIGN KEY(team_match_id) REFERENCES team_match(id), FOREIGN KEY(previous_match_id) REFERENCES soft_tennis_match(id), FOREIGN KEY(next_match_id) REFERENCES soft_tennis_match(id), PRIMARY KEY(id))', function (e) {
	console.log('create soft tennis match table');
	cont(connection);
    });
};

var createGameTable = function (connection, cont) {
    connection.query('CREATE TABLE game(id INT(16) NOT NULL AUTO_INCREMENT, match_id INT(16), total_game_count INT(8), game_count_a INT(8) NOT NULL, game_count_b INT(8) NOT NULL, is_side_a_winner BOOLEAN, is_final_game BOOLEAN NOT NULL, previous_game_id INT(16), next_game_id INT(16), FOREIGN KEY(match_id) REFERENCES soft_tennis_match(id), FOREIGN KEY(previous_game_id) REFERENCES game(id), FOREIGN KEY(next_game_id) REFERENCES game(id), PRIMARY KEY(id))', function (e) {
	console.log('create game table');
	cont(connection);
    });
};


var createPointTable = function (connection, cont) {
    connection.query('CREATE TABLE point(id INT(16) NOT NULL AUTO_INCREMENT, game_id INT(16), match_id INT(16), total_count INT(8), count_a INT(8) NOT NULL, count_b INT(8) NOT NULL, max_larry_count INT(8), is_side_a_winner BOOLEAN, is_game_point_for_a BOOLEAN NOT NULL, is_game_point_for_b BOOLEAN NOT NULL, is_match_point_for_a BOOLEAN NOT NULL, is_match_point_for_b BOOLEAN NOT NULL, previous_point_id INT(16), next_point_id INT(16), FOREIGN KEY(game_id) REFERENCES game(id), FOREIGN KEY(match_id) REFERENCES soft_tennis_match(id), FOREIGN KEY(previous_point_id) REFERENCES point(id), FOREIGN KEY(next_point_id) REFERENCES point(id), PRIMARY KEY(id))', function (e) {
	console.log('create point table');
	cont(connection);
    });
};



var createShotTable = function (connection, cont) {
    connection.query('CREATE TABLE shot(id INT(16) NOT NULL AUTO_INCREMENT, match_id INT(16), game_id INT(16), point_id INT(16), player_id INT(16), larry_count INT(8), shot_type_id INT(16) NOT NULL, shot_direction_id INT(16), other_shot_property_id INT(16), is_side_a_winner BOOLEAN NOT NULL, is_backhand BOOLEAN, is_winner BOOLEAN, is_superplay BOOLEAN, winner_type_id INT(16), is_error BOOLEAN, is_unforced_error BOOLEAN, error_type_id INT(16), previous_shot_id INT(16), next_shot_id INT(16), FOREIGN KEY(match_id) REFERENCES soft_tennis_match(id), FOREIGN KEY(game_id) REFERENCES game(id), FOREIGN KEY(point_id) REFERENCES point(id), FOREIGN KEY(player_id) REFERENCES player(id), FOREIGN KEY(shot_type_id) REFERENCES shot_type(id), FOREIGN KEY(shot_direction_id) REFERENCES shot_direction(id), FOREIGN KEY(other_shot_property_id) REFERENCES other_shot_property(id), FOREIGN KEY(winner_type_id) REFERENCES winner_type(id), FOREIGN KEY(error_type_id) REFERENCES error_type(id), FOREIGN KEY(previous_shot_id) REFERENCES shot(id), FOREIGN KEY(next_shot_id) REFERENCES shot(id), PRIMARY KEY(id))', function (e) {
	console.log('create shot table');
	cont(connection);
    });
};





Promise.resolve(connection)
    .then(Future(dropDatabase))
    .then(Future(createDatabase))
    .then(Future(useDatabase))
    .then(Future(createGenderTable))
    .then(Future(createShotDirectionTable))
    .then(Future(createOtherShotPropertyTable))
    .then(Future(createCompetitionTagTable))
    .then(Future(createCompetitionTypeTable))
    .then(Future(createRoundTable))
    .then(Future(createTeamDivisionTable))
    .then(Future(createPrefectureTable))
    .then(Future(createTeamTable))
    .then(Future(createPlayerTable))
    .then(Future(createShotTypeTable))
    .then(Future(createCourtSurfaceTable))
    .then(Future(createTennisCourtTable))
    .then(Future(createCompetitionTable))
    .then(Future(createCompetitionTagsTable))
    .then(Future(createChampionTable))
    .then(Future(createTeamMatchTable))
    .then(Future(createSoftTennisMatchTable))
    .then(Future(createGameTable))
    .then(Future(createPointTable))
    .then(Future(createErrorTypeTable))
    .then(Future(createWinnerTypeTable))
    .then(Future(createShotTypeTable))
    .then(Future(createShotTable))
    .then(Future(insertPrefectures))
    .then(Future(insertTeamDivisions))
    .then(Future(insertRounds))
    .then(Future(insertGenders))
    .then(Future(insertCompetitionTypes))
    .then(Future(insertCompetitionTags))
    .then(Future(insertShotDirections))
    .then(Future(insertShotTypes))
    .then(Future(insertErrorTypes))
    .then(Future(insertWinnerTypes))
    .then(Future(insertCourtSurfaces))
    .then(Future(insertOtherShotProperties))
    .then(function (connection) {
	console.log('finish');
	connection.end();
    });