var table = $('#board');

var BoardSprite = parseConfigFile('./config.json')

var BoardMap = initBattleBoard(BoardSprite.sizes[0],BoardSprite.sizes[1], table);

drawGame(BoardSprite,BoardMap);
