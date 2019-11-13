import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
	title: String
});

module.exports = mongoose.model('project', projectSchema);
