const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    githubLink: String,
    linkedinLink: String,
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


module.exports = mongoose.model('Project', projectSchema);