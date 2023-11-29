const db = require('../database/connect');

class Post {

    constructor(data) {
        this.id = data.post_id;
        this.title = data.title;
        this.date = data.date
        this.image_source = data.image_source
        this.content = data.content;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM post ORDER BY post_id DESC");
        return response.rows.map(p => new Post(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM post WHERE post_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async create(data) {
        const { title, date, category, content } = data;
        let response = await db.query("INSERT INTO post (title, date, category, content) VALUES ($1, CURRENT_DATE, $2, $3) RETURNING post_id;",
            [title, category, content]);
        const newId = response.rows[0].post_id;
        const newPost = await Post.getOneById(newId);
        return newPost;
    }

    async update(data) {
        const response = await db.query("UPDATE post SET content = $1 WHERE post_id = $2 RETURNING *;", [data.content, this.id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to update content.")
        }

        return new Post(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.id]);
        return new Post(response.rows[0]);
    }

}

module.exports = Post;
