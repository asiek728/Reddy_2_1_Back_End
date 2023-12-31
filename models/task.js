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
        const { task_name,num_volunteers_needed, status, start_date} = data;
        let response = await db.query("INSERT INTO task (task_name,num_volunteers_needed, status, start_date) VALUES ($1, $2, $3, $4) RETURNING id;",
            [task_name, num_volunteers_needed, status, start_date]);
        const newId = response.rows[0].id;
        const newTask = await Task.getOneById(newId);
        return newTask;
    }

    async update(data) {
        const response = await db.query("UPDATE task SET task_name = $1, num_volunteers_needed = $2, status = $3, start_date = $4  WHERE id = $5 RETURNING *;", [data.task_name, data.num_volunteers_needed, data.status, data.start_date, this.id]);

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
