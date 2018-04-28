"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("power-assert");
const glob = require("glob");
const rimraf = require("rimraf");
const unzip = require("unzip");
const gitDiffArchive = require("../");

const ID1 = "b148b54";
const ID2 = "acd6e6d";
const EMPTY_ID1 = "f74c8e2";
const EMPTY_ID2 = "574443a";
const RENAME_ID1 = "3779749";
const RENAME_ID2 = "67bf532";
const OUTPUT_DIR = `${__dirname}/tmp`;
const OUTPUT_PATH = `${OUTPUT_DIR}/output.zip`;

describe("git-diff-archive", () => {
  afterEach(() => {
    rimraf.sync(OUTPUT_DIR);
  });

  it("should be chained promise", (done) => {
    gitDiffArchive(ID1, ID2, {output: OUTPUT_PATH})
      .then((res) => {
        assert(true);
        done();
      });
  });

  describe("should be cathing errors", () => {
    it("format", (done) => {
      gitDiffArchive(ID1, ID2, {output: OUTPUT_PATH, format: "hoge"})
        .catch((err) => {
          assert(err === "specified format type is not supported");
          done();
        });
    });

    it("revision", (done) => {
      gitDiffArchive(EMPTY_ID1, EMPTY_ID2, {output: OUTPUT_PATH})
        .catch((err) => {
          assert(err === "diff file does not exist");
          done();
        });
    });
  });

  describe("should be created diff zip", () => {
    it("add / modify", (done) => {
      gitDiffArchive(ID1, ID2, {output: OUTPUT_PATH})
        .then((res) => {
          const stat = fs.statSync(OUTPUT_PATH);
          assert(stat.isFile() === true);

          fs.createReadStream(OUTPUT_PATH)
            .pipe(unzip.Extract(({path: OUTPUT_DIR})))
            .on("close", () => {
              const files = glob.sync(`${OUTPUT_DIR}/**/*`, {nodir: true, dot: true});
              assert(files.length === 6);
              assert(files.indexOf(OUTPUT_PATH) > -1);
              assert(files.indexOf(`${OUTPUT_DIR}/git-diff-archive/.eslintrc`) > -1);
              assert(files.indexOf(`${OUTPUT_DIR}/git-diff-archive/LICENSE`) > -1);
              assert(files.indexOf(`${OUTPUT_DIR}/git-diff-archive/README.md`) > -1);
              assert(files.indexOf(`${OUTPUT_DIR}/git-diff-archive/bin/usage.txt`) > -1);
              assert(files.indexOf(`${OUTPUT_DIR}/git-diff-archive/package.json`) > -1);
              assert(res.exclude.length === 1);
              assert(res.exclude.indexOf("bin/cmd.js") > -1);
              done();
            });
        });
    });

    it("rename", (done) => {
      gitDiffArchive(RENAME_ID1, RENAME_ID2, {output: OUTPUT_PATH})
        .then((res) => {
          const stat = fs.statSync(OUTPUT_PATH);
          assert(stat.isFile() === true);

          fs.createReadStream(OUTPUT_PATH)
            .pipe(unzip.Extract(({path: OUTPUT_DIR})))
            .on("close", () => {
              const files = glob.sync(`${OUTPUT_DIR}/**/*`, {nodir: true, dot: true});
              assert(files.length === 3);
              assert(files.indexOf(OUTPUT_PATH) > -1);
              assert(files.indexOf(`${OUTPUT_DIR}/git-diff-archive/bin/git_diff_archive`) > -1);
              assert(files.indexOf(`${OUTPUT_DIR}/git-diff-archive/package.json`) > -1);
              done();
            });
        });
    });
  });

  describe("should arguments are passed", () => {
    it("two id", (done) => {
      gitDiffArchive(ID1, ID2, {
        prefix: "files",
        output: OUTPUT_PATH,
        diffFilter: "AMCRD"
      })
      .then((res) => {
        assert(res.cmd === `git diff --name-only --diff-filter=AMCRD ${ID2} ${ID1}`);
        assert(res.output === OUTPUT_PATH);
        assert(res.prefix === "files");
        done();
      });
    });

    it("one id", (done) => {
      gitDiffArchive(ID1, {
        prefix: "hoge",
        output: OUTPUT_PATH,
        diffFilter: "AMCRDB"
      })
      .then((res) => {
        assert(res.cmd === `git diff --name-only --diff-filter=AMCRDB ${ID1}`);
        assert(res.output === OUTPUT_PATH);
        assert(res.prefix === "hoge");
        done();
      });
    });
  });
});
