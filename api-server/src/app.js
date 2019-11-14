import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose, { connection } from 'mongoose';
import cors from 'cors';

import Project from './model/Project';

const app = express();
const PORT = 3030;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected to Mongo');
});

mongoose.connect('mongodb://database:27017/project', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const WHITE_LIST = ['http://localhost:3000', 'http://localhost'];

const corsOptions = {
	origin: function(origin, callback) {
		callback(null, true);
	},
	exposedHeaders: ['Set-Cookie'],
	credentials: true
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api', (req, res, next) => {
	console.log('get api');
	return Project.find({})
		.then(projects => {
			console.log('res ', projects);
			res.send(projects);
		})
		.catch(error => {
			console.log('erro ', error);
			res.status(500).send({ error });
		});
});

app.post('/api', (req, res, next) => {
	console.log('post api');
	const project = Project();
	const { title } = req.body;

	project.title = title;

	return project
		.save()
		.then(project => res.send(project))
		.catch(error => res.status(500).send({ error }));
});

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
