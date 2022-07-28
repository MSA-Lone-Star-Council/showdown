"use strict";

/** Routes for schools. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const School = require("../models/school");

const router = new express.Router();

router.get("/", async function (req, res, next) {
  const school = req.query;

  try {
    const schools = await School.findAll();
    
    return res.json({ schools });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
