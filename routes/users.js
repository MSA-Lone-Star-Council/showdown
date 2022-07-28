"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const User = require("../models/user");

const router = new express.Router();

router.get("/", async function (req, res, next) {
  const user = req.query;

  try {
    const users = await User.findAll();
    
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
