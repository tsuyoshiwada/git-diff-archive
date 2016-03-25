git-diff-archive
================

[![Build Status](http://img.shields.io/travis/tsuyoshiwada/git-diff-archive.svg?style=flat-square)](https://travis-ci.org/tsuyoshiwada/git-diff-archive)
[![npm version](https://img.shields.io/npm/v/git-diff-archive.svg?style=flat-square)](http://badge.fury.io/js/git-diff-archive)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/tsuyoshiwada/git-diff-archive/master/LICENSE)
[![Dependency Status](https://img.shields.io/david/tsuyoshiwada/git-diff-archive.svg?style=flat-square)](https://david-dm.org/tsuyoshiwada/git-diff-archive)
[![devDependency Status](https://img.shields.io/david/dev/tsuyoshiwada/git-diff-archive.svg?style=flat-square)](https://david-dm.org/tsuyoshiwada/git-diff-archive#info=devDependencies)

Archive of the diff files using node.js and git.



## SCREEN SHOT

![SCREEN SHOT](https://raw.githubusercontent.com/tsuyoshiwada/git-diff-archive/images/screenshot.png)



## INSTALL

It is recommended a global installation.

```bash
$ npm install git-diff-archive -g
```



## USAGE

Go to the working directory.  
Then, run the `git_diff_archive` or `gda` command.

```bash
$ cd /your/project/dir
$ git_diff_archive HEAD HEAD~5
# or
$ gda HEAD HEAD~5
```

In the above example, to archive the difference file of the current HEAD and five previous HEAD.


```
Usage:

  git_diff_archive COMMIT, [OLD_COMMIT], {Options}


Description:

  Archive of the diff files using node.js and git.
  `COMMIT` and `OLD_COMMIT` is equivalent to the index that specify in the `git diff`.

  `PATH_SYNTAX` can be used in the `output` and `prefix` option.


Options:

  -h, --help                 Displays this help.
  -V, --version              Displays current version of this package.
  -v, --verbose              Show the append files and use git command.
  -n, --dry-run              Don't actually create the files. just show what would be done.
  -f, --format (zip|tar)     Specified in the `zip` or `tar` the format of the archive.
  -o, --output               Output destination path of the archive. (Use `PATH_SYNTAX`)
  -p, --prefix               Prepended to the filenames in the archive. (Use `PATH_SYNTAX`)
  -F, --diff-filter          `git diff --diff-filter` and a similar designation.
      (A|C|D|M|R|T|U|X|B|*)


PATH_SYNTAX:

  {dirname}   Current git directory name when you call the command.
  {date}      Today's date.
  {time}      Current time.
  {datetime}  {date} and {time}.
  {random}    Random strings.
  {format}    Archive format specified in the option.


Defaults:

  --verbose     = false
  --dry-run     = false
  --format      = zip
  --prefix      = {dirname}
  --output      = {dirname}-{datetime}.{format}
  --diff-filter = ACDMRTUXB


Examples:

  git_diff_archive
  git_diff_archive HEAD~3
  git_diff_archive HEAD~2 -v
  git_diff_archive HEAD~5 -n
  git_diff_archive HEAD HEAD~3
  git_diff_archive 85d59ab
  git_diff_archive 596a7ca f489d4a
  git_diff_archive HEAD~5 -p diff-files
  git_diff_archive HEAD~5 -o tmp/{dirname}.zip
  git_diff_archive HEAD~5 -f tar -o output.{format}
  git_diff_archive HEAD~2 HEAD~10 -F AMCR
```


## REQUIREMENTS

* `Node.js 4.x~`
* `git 2.x~`



## LICENCE

Released under the [MIT Licence](https://raw.githubusercontent.com/tsuyoshiwada/git-diff-archive/master/LICENSE)



## AUTHOR

[tsuyoshiwada](https://github.com/tsuyoshiwada)



----------



Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/tsuyoshiwada/git-diff-archive/issues)
