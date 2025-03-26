const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }

        const validPassword = await bcrypt.compare(password, users[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }

        req.session.userId = users[0].id;
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ error: 'Erreur de connexion' });
    }
});

module.exports = router;