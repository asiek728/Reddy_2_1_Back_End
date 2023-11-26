const db = require('../database/connect');

class Task {

    constructor(data) {
        this.id = data.id;
        this.task_name = data.task_name;
        this.status = data.status;
        this.num_volunteers_needed = data.num_volunteers_needed;
        this.start_date = data.start_date;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM task ORDER BY id DESC");
        return response.rows.map(p => new Task(p));
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM task WHERE id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate task.")
        }
        return new Task(response.rows[0]);
    }

    static async create(data) {
        const { task_name,num_volunteers_needed} = data;
        let response = await db.query("INSERT INTO task (task_name,num_volunteers_needed,start_date) VALUES ($1, $2, CURRENT_DATE) RETURNING id;",
            [task_name,num_volunteers_needed]);
        const newId = response.rows[0].id;
        const newTask = await Task.getOneById(newId);
        return newTask;
    }

    async update(data) {
        const response = await db.query("UPDATE task SET status = $1 WHERE id = $2 RETURNING *;", [data.status, this.id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to update status.")
        }

        return new Task(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM task WHERE id = $1 RETURNING *;", [this.id]);
        return new Task(response.rows[0]);
    }

}

module.exports = Task;
