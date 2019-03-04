const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection : {
        host: '127.0.0.1',
        database: 'smartbrain',
        user: 'postgres',
        password: 'BS.qwer1337'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.json(database.users) });
app.post('/signin/', signin.handleSignin(db, bcrypt));
app.post('/register/', register.handleRegister(db, bcrypt));
app.get('/profile/:id/', profile.handleProfileGet(db));
app.put('/image/', image.handleImage(db));
app.post('/imageurl/', image.handleApiCall);

app.listen(3001, () => {
    console.log('App is running on port 3001!');
});