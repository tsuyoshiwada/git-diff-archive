"use strict";

const assert = require("power-assert");
const rimraf = require("rimraf");
const unzip = require("unzip");
const gitDiffArchive = require("../");

const ID1 = "";
const ID2 = "";
const OUTPUT_DIR = `${__dirname}/tmp`;
const OUTPUT_PATH = `${OUTPUT_DIR}/output.zip`;

describe("git-diff-archive", () => {
  after(() => {
    rimraf.sync(OUTPUT_DIR);
  });

  it("should be chained promise", () => {
    // TODO
    assert(false);
  });
});
