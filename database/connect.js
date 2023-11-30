const { Pool } = require("pg");

require('dotenv').config() // load env config

// const db = new Pool({
//     connectionString: process.env.DB_URL
// })

// console.log("DB connection established.")

// module.exports = db;



const db = new Pool({
  connectionString: process.env.NODE_ENV === "test"
    ? process.env.DB_TEST_URL
    : process.env.DB_URL
})

module.exports = db
