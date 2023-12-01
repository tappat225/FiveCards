// db_players.js
const express = require('express');
const db = require('./db');
const router = express.Router();

// Get player list
router.get('/players', (req, res) => {
    db.all("SELECT name, score, rank FROM players ORDER BY score DESC, name", [], (err, rows) => {
        if (err) {
            console.error("Database error:", err.message);
            res.status(400).json({"error": err.message});
            return;
        }
        // Update rank
        rows.forEach((row, index) => {
            row.rank = index + 1;
        });
        res.json({
            "message": "success",
            "data": rows
        });
        });
});

// Add new player
router.post('/player', (req, res) => {
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

module.exports = router;
