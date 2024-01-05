// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('game.db', (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Connected to the game.db database.');
    initializeDatabase();
});

function initializeDatabase() {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS players (name TEXT)", handleError);

        // 尝试添加新列，忽略“列已存在”的错误
        db.run("ALTER TABLE players ADD COLUMN score INTEGER DEFAULT 0", ignoreDuplicateColumnError);
        db.run("ALTER TABLE players ADD COLUMN rank INTEGER", ignoreDuplicateColumnError);

        db.run("CREATE TABLE IF NOT EXISTS rooms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, maxPlayers INTEGER)", handleError);
    });
}

function handleError(err) {
    if (err) {
        console.error(err.message);
    }
}

function ignoreDuplicateColumnError(err) {
    if (err && !err.message.includes('duplicate column name')) {
        console.error(err.message);
    }
}

module.exports = db;
