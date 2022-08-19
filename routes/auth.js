"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
// const userSignupSchema = require("../schemas/userSignup.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token: { username, password } => token 
 * 
 * Returns JWT token which cna be used to authenticate further request.
 * 
 * Authorization required: none
*/
router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const err = validator.errors.map(e => e.stack);
      throw new BadRequestError(err);
    }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;