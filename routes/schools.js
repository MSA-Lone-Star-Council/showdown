"use strict";

/** Routes for schools. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const School = require("../models/school");

const router = new express.Router();

/** POST / { school } =>  { school }
 *
 * school should be { school_handle, school_name, city, state }
 *
 * Returns { school_handle, school_name, city, state }
 *
 * Authorization required: admin
 */

 router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, schoolNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const school = await School.create(req.body);
    return res.status(201).json({ school });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { schools: [ { school_handle, school_name, city, state }, ...] }
 *
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  try {
    const schools = await School.findAll();
    
    return res.json({ schools });
  } catch (err) {
    return next(err);
  }
});

/** GET /[school_handle]  =>  { school }
 *
 *  School is { school_handle, school_name, city, state, users }
 *   where users is [{ username, first_name, last_name, gender }, ...]
 *
 * Authorization required: none
 */

 router.get("/:school_handle", async function (req, res, next) {
  try {
    const school = await School.get(req.params.school_handle);
    return res.json({ school });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
