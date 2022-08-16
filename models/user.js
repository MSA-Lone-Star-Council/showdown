"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for users. */

class User {
  static async findAll() {
    let query = `SELECT username,
                        first_name,
                        last_name,
                        gender, 
                        school_handle AS "school",
                        paid
                 FROM users`;

    const usersRes = await db.query(query);
    return usersRes.rows;
  }

  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
              first_name,
              last_name,
              gender,
              school_handle AS "school",
              paid
       FROM users
       WHERE username = $1`, [username]);

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }
}


module.exports = User;
