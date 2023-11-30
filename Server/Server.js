// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

const db = new sqlite3.Database('game.db');

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
