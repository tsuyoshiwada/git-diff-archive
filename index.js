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

const supportFormats = [
  "zip",
  "tar"
];

const spinnerStringID = 18;


module.exports = gitDiffArchive;


function gitDiffArchive(commit, oldCommit, options) {
  return new Promise((resolve, reject) => {
    const commit1 = commit;
    const commit2 = typeof oldCommit === "string" ? oldCommit : null;
    const params = assign({}, defaults, commit2 == null ? (options || {}) : (oldCommit || {}));

    if (!gitCommandExists()) {
      return reject("git command not exist");
    }

    if (!isSupportFormat(params.format)) {
      return reject("specified format type is not supported");
    }

    let diff = "";

    if (commit1 !== undefined) {
      if (commit2 == null) {
        diff = commit1;
      } else {
        diff = `${commit1} ${commit2}`;
      }
    }

    const lines = getExecLines(`git diff --name-only --diff-filter=${params.diffFilter} ${diff}`);
    const files = filterExistsFiles(lines);

    if (files.length === 0) {
      return reject("diff file does not exist");
    }

    // TODO: create archive file
    resolve(files);
  });
}

function isSupportFormat(format) {
  return supportFormats.indexOf(format) > -1;
}

function gitCommandExists() {
  try {
    which.sync("git");
    return true;
  } catch (e) {
    return false;
  }
}

function getExecLines(cmd) {
  const result = execSync(cmd, {encoding: "utf8"}).trim().replace(/\r\n?/g, "\n");
  return result.split("\n");
}

function filterExistsFiles(files) {
  return files.filter((file) => {
    try {
      return fs.statSync(file).isFile();
    } catch (e) {
      return false;
    }
  });
}

function createArchive(files, output, format, prefix) {
  // TODO
}
