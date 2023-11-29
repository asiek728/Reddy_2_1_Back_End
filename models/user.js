const db = require('../database/connect');

class User {

    constructor({ user_id, username, password, email, isadmin }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = isadmin;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM user_account");
        return response.rows.map(p => new User(p));
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, email, isAdmin } = data;
        let response = await db.query("INSERT INTO user_account (username, password, email) VALUES ($1, $2, $3) RETURNING user_id;",
            [username, password, email]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }

    
    async destroy() {
        let response = await db.query("DELETE FROM user_account WHERE user_id = $1 RETURNING *;", [this.id]);
        return new User(response.rows[0]);
    }

    async updateUsername(data) {
        const response = await db.query("UPDATE user_account SET username = $1  WHERE user_id = $2 RETURNING *;", [data.username,this.id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to update username.")
        }

        return new User(response.rows[0]);
    }

    async updateEmail(data) {
        const response = await db.query("UPDATE user_account SET email = $1  WHERE user_id = $2 RETURNING *;", [data.email,this.id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to update email.")
        }

        return new User(response.rows[0]);
    }
}

module.exports = User;
