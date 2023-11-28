const User_Task = require('../models/user_task');


async function index (req, res) {
    try {
        const user_tasks = await User_Task.getAll();
        res.json(user_tasks);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await User_Task.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const task = await User_Task.getAllByUserId(id);
        res.json(task);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

module.exports = {
    index, create, show
}
