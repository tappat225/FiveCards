// rooms.js
const express = require('express');
const db = require('./db');
const router = express.Router();

// Create a room
router.post('/createRoom', (req, res) => {
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

// Get room list
router.get('/rooms', (req, res) => {
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

// Join a room
router.post('/joinRoom', (req, res) => {
    const { roomId, playerName } = req.body;
    // Check if room is existed or full
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

// Dissolve a room
router.post('/dissolveRoom', (req, res) => {
    const { roomId } = req.body;
    // 这里需要添加逻辑来处理解散房间的请求
    // 例如，删除房间记录等
    res.json({
        "message": "Room dissolved",
        "roomId": roomId
    });
});

// Handle request for ready status of player
router.post('/playerReady', (req, res) => {
    const { roomId, playerName } = req.body;
    // 这里需要添加逻辑来处理玩家准备的请求
    // 例如，更新玩家状态等
    res.json({
        "message": "Player ready",
        "roomId": roomId,
        "playerName": playerName
    });
});

module.exports = router;
