"use strict";

const db = require("../db");

/** Related functions for schools. */

class School {
  static async findAll() {
    let query = `SELECT handle,
                        name,
                        city,
                        state
                 FROM schools`;

    const schoolsRes = await db.query(query);
    return schoolsRes.rows;
  }
}


module.exports = School;
