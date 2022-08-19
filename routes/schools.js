"use strict";

/** Routes for schools. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const School = require("../models/school");

const schoolNewSchema = require("../schemas/schoolNew.json");
const schoolUpdateSchema = require("../schemas/schoolUpdate.json");
// schoolSearchSchema from "../schemas/schoolSearch.json"

const router = new express.Router();

/** POST / { school } =>  { school }
 *
 * school should be { school_handle, school_name, city, state, logo_url, facebook_url, instagram_url }
 *
 * Returns { school_handle, school_name, city, state, logo_url, facebook_url, instagram_url }
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

/** PATCH /[handle] { fld1, fld2, ... } => { school }
 * 
 * Patches school data.
 * 
 * fields can be: { school_name, logo_url, facebook_url, instagram_url }
 * 
 * Returns { school_handle, school_name, city, state, logo_url, facebook_url, instagram_url }
 * 
 * Authorization required: admin
 */

router.patch("/:school_handle", ensureAdmin, async function(req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, schoolUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const school = await School.update(req.params.school_handle, req.body);
    return res.json({ school });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[school_handle] => { deleted: school_handle }
 * 
 * Authorization required: admin
 */

router.delete("/:school_handle", ensureAdmin, async function(req, res, next) {
  try {
    await School.remove(req.params.school_handle);
    return res.json({ deleted: req.params.school_handle });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
