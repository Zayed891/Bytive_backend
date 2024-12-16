const mongoose = require('mongoose');

// Define Task Schema with a custom numeric `id` field
const taskSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true }, // Numeric ID
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
});

// Create Task Model
const Task = mongoose.model('todoSchema', taskSchema);

module.exports = { Task };
