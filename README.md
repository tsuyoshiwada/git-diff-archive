git-diff-archive
================

[![Build Status](https://travis-ci.org/tsuyoshiwada/git-diff-archive.svg?branch=master)](https://travis-ci.org/tsuyoshiwada/git-diff-archive)

Archive of the diff files using on node.js and git.



## INSTALL

It is recommended a global installation.

```bash
$ npm install git-diff-archive -g
```



## USAGE

Go to the working directory.  
Then, run the `git_diff_archive` command.

```bash
$ cd /your/project/dir
$ git_diff_archive HEAD HEAD~5
```

In the above example, to archive the difference file of the current HEAD and five previous HEAD.


```
Usage:

  git_diff_archive COMMIT, [OLD_COMMIT], {Options}


Description:

  Archive of the diff files using on node.js and git.


Options:

  -h, --help   Displays this help.
  -t, --todo   __TODO__
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
