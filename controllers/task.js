const Task = require('../models/task');

async function index (req, res) {
    try {
        const tasks = await Task.getAll();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Task.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const task = await Task.getOneById(id);
        res.json(task);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};


async function update(req,res) {
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const taskToUpdate = await Task.getOneById(id)
        const updatedTask = await taskToUpdate.update(data)
        res.status(200).send(updatedTask)
        
    } catch (err) {
        res.status(404).json({"error": err.message})
        
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const task= await Task.getOneById(id);
        const result = await task.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

module.exports = {
    index, create, show, update, destroy
}
