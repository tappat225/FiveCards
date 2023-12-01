const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

// 配置CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());

const db = new sqlite3.Database('game.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the game.db database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
    db.run("CREATE TABLE IF NOT EXISTS players (name TEXT)", (err) => {
      if (err) {
        console.error(err.message);
      }
    });

    db.run("ALTER TABLE players ADD COLUMN score INTEGER DEFAULT 0", (err) => {
        if (err) {
        // Ignore error if column already exists
        console.log('Score column already exists or cannot be added.');
        }
    });

    db.run("ALTER TABLE players ADD COLUMN rank INTEGER", (err) => {
        if (err) {
            // Ignore error if column already exists
            console.log('Rank column already exists or cannot be added.');
        }
    });

    // 创建房间表
    db.run("CREATE TABLE IF NOT EXISTS rooms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, maxPlayers INTEGER)", (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

// 获取玩家列表
app.get('/players', (req, res) => {
    db.all("SELECT name, score, rank FROM players ORDER BY score DESC, name", [], (err, rows) => {
    if (err) {
        res.status(400).json({"error": err.message});
        return;
    }
    // 更新排名
    rows.forEach((row, index) => {
        row.rank = index + 1;
    });
    res.json({
        "message": "success",
        "data": rows
    });
    });
});

// 添加新玩家
app.post('/player', (req, res) => {
  const name = req.body.name;
  db.get("SELECT name FROM players WHERE name = ?", [name], (err, row) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    if (row) {
      res.json({"message": "Player already exists"});
    } else {
      db.run(`INSERT INTO players (name, score) VALUES (?, 0)`, [name], function(err) {
        if (err) {
          res.status(400).json({"error": err.message});
          return;
        }
        res.json({
          "message": "Player registered",
          "id": this.lastID
        });
      });
    }
  });
});

// 创建房间
app.post('/createRoom', (req, res) => {
    const { roomName, maxPlayers } = req.body;
    db.run("INSERT INTO rooms (name, maxPlayers) VALUES (?, ?)", [roomName, maxPlayers], function(err) {
      if (err) {
        res.status(400).json({"error": err.message});
        return;
      }
      res.json({
        "message": "Room created",
        "roomId": this.lastID
      });
    });
});

// 加入房间
app.post('/joinRoom', (req, res) => {
    const { roomId, playerName } = req.body;
    // 这里需要添加逻辑来处理加入房间的请求
    // 例如，检查房间是否存在，是否已满等
    // 然后更新数据库或返回相应的响应
    res.json({
        "message": "Player joined",
        "roomId": roomId
    });
});

// 解散房间
app.post('/dissolveRoom', (req, res) => {
    const { roomId } = req.body;
    // 这里需要添加逻辑来处理解散房间的请求
    // 例如，删除房间记录等
    res.json({
        "message": "Room dissolved",
        "roomId": roomId
    });
});

// 玩家准备
app.post('/playerReady', (req, res) => {
    const { roomId, playerName } = req.body;
    // 这里需要添加逻辑来处理玩家准备的请求
    // 例如，更新玩家状态等
    res.json({
        "message": "Player ready",
        "roomId": roomId,
        "playerName": playerName
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
