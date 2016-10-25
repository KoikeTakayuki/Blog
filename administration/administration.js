var express = require('express');
var app = express();
var controllers = require('controllers');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'jade');
app.set('views', __dirname + '/view');

/* トップページ */
app.get('/', controllers.administrationTop.index);

/* チーム作成 */
app.get('/create-new-team', controllers.team.form);
app.post('/create-new-team', controllers.team.create);

/* プレイヤー作成 */
app.get('/create-new-player', controllers.player.form);
app.post('/create-new-player', controllers.player.create);

/* 球種作成 */
app.get('/create-new-shot-type', controllers.enumeration.shotTypeForm);
app.post('/create-new-shot-type', controllers.enumeration.createShotType);


/* その他の球の性質作成 */
app.get('/create-new-other-shot-property', controllers.enumeration.otherShotPropertyForm);
app.post('/create-new-other-shot-property', controllers.enumeration.createOtherShotProperty);

/* コース作成 */
app.get('/create-new-shot-direction', controllers.enumeration.shotDirectionForm);
app.post('/create-new-shot-direction', controllers.enumeration.createShotDirection);

/* 大会タグ */
app.get('/create-new-competition-tag', controllers.enumeration.competitionTagForm);
app.post('/create-new-competition-tag', controllers.enumeration.createCompetitionTag);

/* 会場作成 */
app.get('/create-new-tennis-court', controllers.tennisCourt.form);
app.post('/create-new-tennis-court', controllers.tennisCourt.create);

/* 優勝者作成 */
app.get('/create-new-champion', controllers.champion.form);
app.post('/create-new-champion', controllers.champion.create);

/* 大会作成 */
app.get('/create-new-competition', controllers.competition.form);
app.post('/create-new-competition', controllers.competition.create);

/* 試合作成 */
app.get('/create-new-match', controllers.match.form);
app.post('/create-new-match', controllers.match.create);

/* 試合一覧 */
app.get('/match', controllers.match.list);

/* 試合のゲーム一覧 */
app.get('/match/:matchId/games', controllers.match.games);

/* ゲームのポイント一覧 */
app.get('/game/:gameId/points', controllers.game.points);

/* ポイントに紐付いたショットを作成 */
app.get('/point/:pointId/create-new-shot', controllers.point.shotForm);
app.post('/point/:pointId/create-new-shot', controllers.point.createShot);

app.listen(3000);
