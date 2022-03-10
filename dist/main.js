var table = $('#board');
var button = $('#orders button');
var input = $('#orders textarea');
var team = 2;
var BoardSprite = parseConfigFile('./config.json')

var BoardMap = initBattleBoard(BoardSprite.length, BoardSprite[1].length, table);

//console.log(BoardSprite)

drawGame(BoardSprite, BoardMap);

input.style.display = 'none'
button.onclick = function() {
  var value = prompt('Donnez vos ordres équipe ' + team + '!!');
  if (!value || value.trim() == '') return;
  team = (team == 1) ? 2 : 1
  gameLoop.bind(this)(value, BoardSprite, BoardMap, team);
  input.value = ''
}