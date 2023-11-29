const db = require('../database/connect');

class User_Task {

    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.task_id = data.task_id;

        this.start_date = data.start_date;
        //this.end_date = data.end_date;
        this.task_name = data.task_name;
        this.status = data.status;

    }

    static async getAll() {
        const response = await db.query("SELECT * FROM task_user ORDER BY task_id");
        return response.rows.map(p => new User_Task(p));
    }

    static async getAllByUserId(id) {
        const response = await db.query("SELECT task_user.id, task.task_name, task.status, task.start_date FROM task INNER JOIN task_user ON task_user.task_id=task.id WHERE task_user.user_id = $1", [id]);
        if (response.rows.length < 1) {
            throw new Error("Unable to locate tasks for this user.")
        }
        return response.rows.map(p => new User_Task(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM task_user WHERE id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate task.")
        }
        return new User_Task(response.rows[0]);
    }


    static async create(data) {
        const { user_id, task_id } = data;

        let response = await db.query("SELECT * FROM task_user WHERE user_id = $1 AND task_id = $2", [user_id, task_id]);

        if (response.rows.length != 1) {
            response = await db.query("INSERT INTO task_user (user_id, task_id) VALUES ($1, $2) RETURNING id;",
                [user_id, task_id]);
            const newId = response.rows[0].id;
            const newTask = await User_Task.getOneById(newId);
            return newTask;
        }
        else {
            throw new Error("User already enrolled in this task.")
        }
    }

    async destroy() {
        let response = await db.query("DELETE FROM task_user WHERE id = $1 RETURNING *;", [this.id]);
        return new User_Task(response.rows[0]);
    }

}

module.exports = User_Task;
