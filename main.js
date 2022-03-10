var table = $('#board');
var button = $('#orders button');
var input = $('#orders textarea ');
var team = 2;
var BoardSprite = parseConfigFile('./config.json')

var BoardMap = initBattleBoard(BoardSprite.sizes[0], BoardSprite.sizes[1], table);

//console.log(BoardSprite.map[0][0])

drawGame(BoardSprite, BoardMap);

button.onclick = function() {
  if (input.value.trim() == '') return;
  team = (team == 1) ? 2 : 1
  gameLoop.bind(this)(input.value, BoardSprite, BoardMap, team);
  input.value = ''
}
