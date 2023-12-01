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

function initializeDatabase(callback) {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS players (name TEXT)", (err) => {
          if (err) {
            console.error(err.message);
            return;
          }
        });

        db.run("ALTER TABLE players ADD COLUMN score INTEGER DEFAULT 0", (err) => {
            if (err) {
                console.log('Score column already exists or cannot be added.');
            }
        });

        db.run("ALTER TABLE players ADD COLUMN rank INTEGER", (err) => {
            if (err) {
                console.log('Rank column already exists or cannot be added.');
            }
        });

        db.run("CREATE TABLE IF NOT EXISTS rooms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, maxPlayers INTEGER)", (err) => {
            if (err) {
                console.error(err.message);
            }
        }, () => {
            // Callback is called after the last statement is completed
            if (callback) callback();
        });
    });
}

// 获取玩家列表
app.get('/players', (req, res) => {
    db.all("SELECT name, score, rank FROM players ORDER BY score DESC, name", [], (err, rows) => {
    if (err) {
        console.error("Database error:", err.message);
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
        "message": "success",
        "roomId": this.lastID
      });
    });
});

// 获取房间列表
app.get('/rooms', (req, res) => {
    db.all("SELECT id, name, maxPlayers FROM rooms", [], (err, rows) => {
        if (err) {
            console.error("Database error:", err.message);
            res.status(400).json({"error": err.message});
            return;
        }
        // 这里您可能需要逻辑来计算每个房间的当前玩家数量
        // 例如，通过查询与每个房间相关的玩家记录
        res.json({
            "message": "success",
            "rooms": rows // 假设返回的数据包括房间ID、名称和最大玩家数量
        });
    });
});

// 加入房间
app.post('/joinRoom', (req, res) => {
    const { roomId, playerName } = req.body;
    // 检查房间是否存在及是否已满
    db.get("SELECT id, maxPlayers FROM rooms WHERE id = ?", [roomId], (err, room) => {
        if (err || !room) {
            res.status(400).json({"error": "Room does not exist"});
            return;
        }
        // 此处添加逻辑以确定房间是否已满
        // 例如，查询与房间相关联的玩家数量
        // 如果房间未满，更新数据库以将玩家添加到房间
        res.json({
            "message": "Player joined",
            "roomId": roomId
        });
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

// Start the server only after the database initialization is complete
initializeDatabase(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
