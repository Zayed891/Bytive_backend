// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const { Task } = require('./db');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://jayedaktar35:MROSBno1GCyJr3gl@cluster0.9l3ea.mongodb.net/', {
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Helper function to generate a unique numeric ID
const generateTaskId = async () => {
    const lastTask = await Task.findOne().sort({ id: -1 }); // Get the task with the highest `id`
    return lastTask ? lastTask.id + 1 : 1; // Increment the highest ID or start at 1
};

// Routes

// 1. Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        const id = await generateTaskId(); // Generate a unique numeric ID
        const newTask = await Task.create({ id, title, description });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Fetch a task by numeric ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ id: Number(req.params.id) }); // Query by custom `id`
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update the task status by numeric ID
app.put('/tasks/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { id: Number(req.params.id) }, // Query by custom `id`
            { status },
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete a task by numeric ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({ id: Number(req.params.id) }); // Query by custom `id`
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
