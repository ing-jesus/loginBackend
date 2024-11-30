import db from '../db.js';

const usersModel = {
    create: (username, password, callback) => {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, password], callback);
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    },
    findAll: (callback) => {
        const query = 'SELECT id, username FROM users';
        db.query(query, callback);
    },
    update: (id, username, callback) => {
        const query = 'UPDATE users SET username = ? WHERE id = ?';
        db.query(query, [username, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
};

export default usersModel;

