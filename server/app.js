var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
var mongoose = require("mongoose");
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function() {
	console.log("Connected to mongod server");
});

mongoose.connect("mongodb://mongo/todo");

var Todo = require("./model");

const cors = require("cors");

const whitelist = ["http://localhost:3000", "http://localhost"];

const corsOptions = {
	origin: function(origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	exposedHeaders: ["Set-Cookie"],
	credentials: true
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/api", function(req, res, next) {
	return Todo.find({}).then(todos => res.send(todos));
});

app.post("/api", function(req, res, next) {
	const todo = Todo();
	const name = req.body.name;

	todo.name = name;

	return todo
		.save()
		.then(todo => res.send(todo))
		.catch(error => res.status(500).send({ error }));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
