"use strict";

const db = require("../db");

/** Related functions for schools. */

class School {
  /** Create a school (from data) update db and return new school data.
   * 
   * data should be { school_handle, school_name, city, state, logo_url, facebook_url, instagram_url }
   * 
   * Returns { school_handle, school_name, city, state, logo_url, facebook_url, instagram_url }
   * 
   * Throws BadRequestError if school already exists.
   * 
   */

  static async create({ school_handle, school_name, city, state, logo_url, facebook_url, instagram_url }) {
    const duplicateCheck = await db.query(
      `SELECT school_handle 
       FROM schools
       WHERE school_handle = $1`,
       [school_handle]
    );

    if (duplicateCheck.rows[0]) {
      throw BadRequestError(`Duplicate school: ${school_handle}`);
    }

    const res = await db.query(
      `INSERT INTO schools
       (school_handle, school_name, city, state, logo_url, facebook_url, instagram_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING school_handle AS "handle", school_name AS "name", city, state, logo_url AS "logoUrl", facebook_url AS "facebookUrl", instagram_url AS "instagramUrl"`,
       [school_handle, school_name, city, state, logo_url, facebook_url, instagram_url]
    );

    const school = res.rows[0];

    return school;
  }

  /** Find all schools (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - city
   * - state
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ school_handle, school_name, city, state, logoUrl, facebookUrl, instagramUrl }, ...]
   * */

  static async findAll() {
    let query = `SELECT school_handle,
                        school_name,
                        city,
                        state,
                        logo_url AS "logoUrl",
                        facebook_url AS "facebookUrl",
                        instagram_url AS "instagramUrl"
                 FROM schools`;

    const schoolsRes = await db.query(query);
    return schoolsRes.rows;
  }

    /** Given a school handle, return data about the school.
   *
   * Returns { school_handle, school_name, city, state, logoUrl, facebookUrl, instagramUrl, competitions }
   *   where competitions is [{ id, competition, description, school_handle, username }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(school_handle) {
    const schoolRes = await db.query(
            `SELECT school_handle,
                    school_name,
                    city,
                    state,
                    logo_url AS "logoUrl",
                    facebook_url AS "facebookUrl",
                    instagram_url AS "instagramUrl"
             FROM schools
             WHERE school_handle = $1`,
          [school_handle]);
  
    const school = schoolRes.rows[0];
  
    if (!school) throw new NotFoundError(`No company: ${school_handle}`);
  
    const competitionsRes = await db.query(
            `SELECT competition
             FROM competitions
             WHERE school_handle = $1
             ORDER BY competition`,
             [school_handle],
    );

    school.competitions = competitionsRes.rows;

    const usersRes = await db.query(
            `SELECT username
             FROM users
             WHERE school_handle = $1
             ORDER BY username`,
          [school_handle],
    );
  
    school.users = usersRes.rows;
  
    return school;
  }
}


module.exports = School;
