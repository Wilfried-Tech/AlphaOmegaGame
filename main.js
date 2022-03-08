var table = $('#board');
var button = $('#orders button');
var input = $('#orders input');

var BoardSprite = parseConfigFile('./config.json')

var BoardMap = initBattleBoard(BoardSprite.sizes[0],BoardSprite.sizes[1], table);

//console.log(BoardSprite.map[0][0])

drawGame(BoardSprite,BoardMap);
