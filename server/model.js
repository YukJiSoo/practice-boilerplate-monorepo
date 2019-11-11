var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
	name: String
});

module.exports = mongoose.model("todo", todoSchema);
