const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(session({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: false
}));

app.use('/api/auth', authRoutes);

app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});