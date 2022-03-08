function $(arg) {
  return document.querySelector(arg)
}

function initBattleBoard(row, col, table) {
  var map = [];
  for (var _row = 0; _row < row; _row++) {
    map[_row] = [];
    for (var _col = 0; _col < col; _col++) {
      (function() {
        var _case = document.createElement('div');
        map[_row][_col] = _case;
        _case.classList.add('case');
        table.appendChild(_case);
      })()
    }
  }
  table.style.setProperty('--row', row);
  table.style.setProperty('--col', col);
  return map;
}

function parseConfigFile(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', name, false);
  xhr.send();
  var obj = JSON.parse(xhr.responseText);
  var config = { sizes: obj.map }
  var volves = obj.werevolves.map((line, i) => {
    line = line.trim().split(" ") //.map(x=>x.trim());
    return {
      row: Number(line[1]) - 1,
      col: Number(line[2]) - 1,
      type: line[3],
      team: Number(line[0]),
      energie: 100,
      isVolve: true
    }
  })
  var foods = obj.foods.map((line, i) => {
    line = line.trim().split(" ");
    return {
      row: Number(line[0]) - 1,
      col: Number(line[1]) - 1,
      type: line[2],
      energie: Number(line[3]),
      isVolve: false
    }
  })
  //config.map = new Array(obj.map[0]).fill(new Array(obj.map[1]).fill({ type: 'void' }));
  config.map = [];
  for (var r = 0; r < obj.map[0]; r++) {
    config.map.push([]);
    for (var c = 0; c < obj.map[1]; c++) {
      config.map[r].push({ type: 'void' });
    }
  }
  for (var wolf of volves) {
    config.map[wolf.row][wolf.col] = wolf;
  }
  for (var food of foods) {
    config.map[food.row][food.col] = food;
  }
  return config
}

function sleep(sec) {
  sec *= 1000;
  return new Promise(r => setTimeout(r, sec))
}

function drawGame(MapSprites, BoardMap) {
  var pics = {
    normal: '🦊',
    omega: '🐶',
    alpha: '🐺',
    apple: '🍏',
    berries: '🍒',
    rabbits: '🐇',
    deer: '🦌',
    mice: '🍇',
    void: ''
  }
  for (var row = 0; row < MapSprites.sizes[0]; row++) {
    for (var col = 0; col < MapSprites.sizes[1]; col++) {
      (function(row, col) {
        var sprite = MapSprites.map[row][col];
        BoardMap[row][col].innerHTML = pics[sprite.type];
      })(row, col)
    }
  }
}
