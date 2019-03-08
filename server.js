const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// const secret = require('./secret');  // Using a separate untracked file is an easy way to keep sensitive information accessible to you but no to others

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection : {
        host: process.env.DATABASE_URL,
        ssl: true
        // host: '127.0.0.1',
        // database: 'smartbrain', // mMake sure you're connecting to the correct database
        // user: 'postgres',  // Make sure you're using the correct user
        // password: process.env.DB_PASSWORD  // Set environment variable DB_PASSWORD to the password for your database or switch out process.env for your database password here
        // password: secret.daPassword  // This is an alternative to using environment variables
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get('/', (req, res) => { res.json(db.users) });
app.get('/', (req, res) => { res.send('It\'s working!') });
app.post('/signin/', signin.handleSignin(db, bcrypt));
app.post('/register/', register.handleRegister(db, bcrypt));
app.get('/profile/:id/', profile.handleProfileGet(db));
app.put('/image/', image.handleImage(db));
app.post('/imageurl/', image.handleApiCall);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
});