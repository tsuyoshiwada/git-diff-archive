"use strict";

const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;
const assign = require("object-assign");
const which = require("which");
const mkdirp = require("mkdirp");
const template = require("string-template");
const Spinner = require("cli-spinner").Spinner;
const archiver = require("archiver");

const defaults = {
  diffFilter: "AMCRD",
  format: "zip",
  prefix: "files",
  output: "{dirname}-{datetime}.zip"
};


module.exports = function gitDiffArchive(commit, oldCommit, options) {
  return new Promise((resolve, reject) => {
  });
}
