function $(arg) {
  return document.querySelector(arg)
}

function initBattleBoard(row, col, table) {
  var map = new Array(row).fill(new Array(col));
  for (var _row = 0; _row < row; _row++) {
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
  var volves = obj.werevolves.map(line => {
    line = line.trim().split(" ");
    return {
      row: line[1] - 1,
      col: line[2] - 1,
      type: line[3],
      team: line[0],
      energie: 100,
      isVolve: true
    }
  })
  var foods = obj.foods.map(line => {
    line = line.trim().split(" ");
    return {
      row: line[0] - 1,
      col: line[1] - 1,
      type: line[2],
      energie: line[3],
      isVolve: false
    }
  })
  config.Map = new Array(obj.map[0]).fill(new Array(obj.map[1]).fill({ type: 'void' }));

  for (var wolf of volves) {
    config.Map[wolf.row][wolf.col] = wolf;
  }
  for (var food of foods) {
    config.Map[food.row][food.col] = food;
  }
  return config
}

function drawGame(MapSprites, MapBoard) {
  //alert(JSON.stringify(MapSprites))
  for (var row = 0; row < MapSprites.sizes[0]; row++) {
    for (var col = 0; col < MapSprites.sizes[1]; col++) {
      (() => {
        MapBoard[row][col].style = 'background: red;'
        MapBoard[row][col].innerText = row //MapSprites.Map[row][col]//.type[0].toUppercase();
      })()
    }
  }
}