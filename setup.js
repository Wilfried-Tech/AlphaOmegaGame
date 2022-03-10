function $(arg) {
  return document.querySelector(arg)
}

function initBattleBoard(row, col, table) {
  var map = [];
  for (var _row = 0; _row <= row; _row++) {
    map[_row] = [];
    for (var _col = 0; _col <= col; _col++) {
      (function() {
        var _case = document.createElement('div');
        map[_row][_col] = (!_row || !col) ? null : _case;
        _case.classList.add('case');
        if (!_row && col) _case.innerText = _col;
        if (!_col) _case.innerText = _row;
        table.appendChild(_case);
      })()
    }
  }
  table.style.setProperty('--row', row + 1);
  table.style.setProperty('--col', col + 1);
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
      row: Number(line[1]),
      col: Number(line[2]),
      type: line[3],
      team: Number(line[0]),
      energie: 100,
      isVolve: true,
      pasified: 0
    }
  })
  var foods = obj.foods.map((line, i) => {
    line = line.trim().split(" ");
    return {
      row: Number(line[0]),
      col: Number(line[1]),
      type: line[2],
      energie: Number(line[3]),
      isVolve: false
    }
  })
  //config.map = new Array(obj.map[0]).fill(new Array(obj.map[1]).fill({ type: 'void' }));
  config.map = [[]];
  for (var r = 1; r <= obj.map[0]; r++) {
    config.map.push([]);
    for (var c = 0; c <= obj.map[1]; c++) {
      config.map[r].push((!c) ? null : { type: 'void' });
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
  for (var row = 1; row <= MapSprites.sizes[0]; row++) {
    for (var col = 1; col <= MapSprites.sizes[1]; col++) {
      (function(row, col) {
        var sprite = MapSprites.map[row][col];
        BoardMap[row][col].innerHTML = pics[sprite.type];
      })(row, col)
    }
  }
}

function parseOrders(orders) {
  var ordersArr = orders.toLowerCase().trim().split(' ');
  var instructions = {
    pacify: [],
    bonus: [],
    nourrir: [],
    combat: [],
    move: []
  }

  ordersArr.forEach(order => {
    order = order.trim();
    if (order == '') return;
    if (order.endsWith(':pacify')) {
      /(\d+)-(\d+)/.test(order);
      var { $1, $2 } = RegExp;
      instructions.pacify.push({ row: $1, col: $2 });
    } else if (orders.indexOf(':*') != -1) {
      /(\d+)-(\d+):\*(\d+)-(\d+)/.test(order);
      var { $1, $2, $3, $4 } = RegExp;
      instructions.combat.push({
        from: {
          row: $1,
          col: $2
        },
        to: {
          row: $3,
          col: $4
        }
      })
    } else if (orders.indexOf(':<') != -1) {
      /(\d+)-(\d+):\<(\d+)-(\d+)/.test(order);
      var { $1, $2, $3, $4 } = RegExp;
      instructions.nourrir.push({
        from: {
          row: $1,
          col: $2
        },
        to: {
          row: $3,
          col: $4
        }
      })
    } else if (orders.indexOf(':@') != -1) {
      /(\d+)-(\d+):\@(\d+)-(\d+)/.test(order);
      var { $1, $2, $3, $4 } = RegExp;
      instructions.move.push({
        from: {
          row: $1,
          col: $2
        },
        to: {
          row: $3,
          col: $4
        }
      })
    }
  })
  return instructions;
}

function distance(x, y, xx, yy) {
  return Math.max(Math.abs(xx - x), Math.abs(yy - y));
}

function getSpriteInRadius($row, $col, r, map) {
  var sprites = [];
  for (var row = 1; row <= map.length; row++) {
    for (var col = 1; col <= map[0].length; col++) {
      if (row == $row && col == $col) continue;
      var sprite = map[row][col];
      if (sprite.isVolve && distance($row, $col, row, col) <= r) {
        sprites.push(sprite)
      }
    }
  }
  return sprites;
}

async function gameLoop(orders, Sprites, Map, team) {
  this.disabled = true;
  orders = parseOrders(orders);

  // depacify previous volves

  getSpriteInRadius(Map.length - 1, Map[0].length - 1, (Map.length - 1) / 2, Sprites).forEach(sprite => {
    sprite.pasified = (sprites.pasified <= 0) ? 0 : sprite.pasified - 1
  })

  alert('pacify');
  if (orders.pacify.length != 0) {
    var { row, col } = orders.pacify[0];
    if (Sprites.map[row][col].type == 'omega') {
      var sprites = getSpriteInRadius(row, col, 6, Sprites);
      sprites.forEach(sprite => {
        sprite.pasified++;
      })
      console.log(team + ' pacify');
    }
  }
  drawGame(Sprites, Map);
  await sleep(3);

  alert('bonus mode');
  // not implémented
  await sleep(3)

  alert('nutrition');
  if (orders.nourrir.length != 0){
    
  }


  this.disabled = false;
}