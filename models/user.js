"use strict";

const db = require("../db");

/** Related functions for users. */

class User {
  static async findAll() {
    let query = `SELECT username,
                        first_name,
                        last_name,
                        gender, 
                        school_code AS "school"
                 FROM users`;

    const usersRes = await db.query(query);
    return usersRes.rows;
  }
}


module.exports = User;
