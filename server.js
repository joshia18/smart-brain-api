const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const database = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  port : 5432,
	  user : 'postgres',
	  password : 'test',
	  database : 'smart-brain'
	}
  });

// database.select('*').from('users').then(data => console.log(data));

const app = express();
app.use(express.json());
app.use(cors());

// const db = {
// 	users:[
// 		{
// 			name:"Ann",
// 			email:"ann@gmail.com",
// 			password:"apples",
// 			id:'123',
// 			entries:0
// 		}
// 	]
// }

app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).json('root');
})

app.post('/signin', (req, res) => signin.handleSignin(req, res, database, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, database, bcrypt));

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, database));

app.put('/image', (req, res) => image.imageEntriesHandler(req, res, database));

app.post('/image', (req, res) => image.apiCallHandler(req, res));


app.listen(3000, () => {
	console.log('app is runnig in port 3000')
})