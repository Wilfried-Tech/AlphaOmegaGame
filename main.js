var table = $('#board');
var button = $('#orders button');
var input = $('#orders textarea ');
var team = 2;
var BoardSprite = parseConfigFile('./config.json')

var BoardMap = initBattleBoard(BoardSprite.length, BoardSprite[1].length, table);

//console.log(BoardSprite)

drawGame(BoardSprite, BoardMap);

button.onclick = function() {
  if (input.value.trim() == '') return;
  team = (team == 1) ? 2 : 1
  gameLoop.bind(this)(input.value, BoardSprite, BoardMap, team);
  input.value = ''
}
