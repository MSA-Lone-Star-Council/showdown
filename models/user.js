"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");

/** Related functions for users. */

class User {
  /** Authenticate user with username, password.
   * 
   * Returns { username, first_name, last_name, email, is_admin }
   * 
   * Throws UnauthorizedError if user not found or wrong password.
   */
  static async authenticate(username, password) {
    // try to find the user first
    const res = await db.query(`
        SELECT username,
               password,
               first_name AS "firstName",
               last_name AS "lastName",
               email, 
               is_admin AS "isAdmin"
        FROM users
        WHERE username=$1`,
        [username],
    );

    const user = res.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }


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
