const db = require('../database/connect');

class User_Task {

    constructor(data) {
        this.user_id = data.user_id;
        this.task_id = data.task_id;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.done_flag_user = data.done_flag_user;
        this.done_flag_admin = data.done_flag_admin;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM task_user ORDER BY task_id");
        return response.rows.map(p => new User_Task(p));
    }

    static async getAllByUserId(id) {
        const response = await db.query("SELECT * FROM task_user WHERE user_id = $1", [id]);
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
        const { user_id, task_id, start_date, end_date } = data;
        let response = await db.query("INSERT INTO task_user (user_id, task_id, start_date, end_date, done_flag_user, done_flag_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
            [user_id, task_id, start_date, end_date, false, false]);
        const newId = response.rows[0].id;
        const newTask = await User_Task.getOneById(newId);
        return newTask;
    }

}

module.exports = User_Task;