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
      // compare user password to hashed password.
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Sign up user with data.
   * 
   * Returns { username, first_name, last_name, email, gender, school, isAdmin }
   * 
   * Throws BadRequestError on duplicates
   */
  static async signup({ username, password, firstName, lastName, gender, email, school, isAdmin, paid }) {
    const duplicateCheck = await db.query(
        `SELECT username
         FROM users
         WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const res = await db.query(
        `INSERT INTO users
         (username, 
          password, 
          first_name, 
          last_name, 
          gender,
          email, 
          school_handle,
          is_Admin, 
          paid)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING username, first_name AS "firstName", last_name AS "lastName", gender, email, school_handle AS "school"`,
        [
          username,
          hashedPassword,
          firstName,
          lastName, 
          gender,
          email,
          school,
          isAdmin,
          paid,
        ],
    );

    const user = res.rows[0];

    return user;
  }

  /** Find all users.
   * 
   * Returns [{ username, first_name, last_name, gender, email, is_admin, paid }]
   */
  static async findAll() {
    let query = `SELECT username,
                        first_name AS "firstName",
                        last_name AS "lastName",
                        email,
                        gender, 
                        school_handle AS "school",
                        is_admin AS "isAdmin",
                        paid
                 FROM users`;

    const usersRes = await db.query(query);
    return usersRes.rows;
  }

  /** Given a username, return data about user.
   * 
   * Returns { username, first_name, last_name, gender, email, is_admin, paid }
   */
  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
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
