const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Language", "Framework", "Tool", "Technology", "Certification", "Other Skills"],
        required: true
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"]
    }
});

module.exports = mongoose.model('Skill', skillSchema);