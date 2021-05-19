# <h1 id="top" align="center">Building and Testing Auturge Packages</h1>

This document describes how to set up your development environment to build and test Auturge.
It also explains the basic mechanics of using `git`, `node`, and `npm`.

-   [Setup](#setup)
    -   [Prerequisite Software](#prerequisite-software)
    -   [Getting the Sources](#getting-the-sources)
    -   [Installing NPM Modules](#installing-npm-modules)
-   [Building](#building)
-   [Running Tests Locally](#running-tests-locally)

See the [contribution guidelines](#contributing) if you'd like to contribute to Auturge.

---

## Setup

### Prerequisite Software

Before you can build and test an Auturge package, you must install and configure the following products on your development machine:

-   [Git](http://git-scm.com) which is a distributed version control system.

-   [Node.js](http://nodejs.org), (version specified in the engines field of [`package.json`](../package.json)) which is used to run a development web server, run tests, and generate distributable files.

-   [npm](https://www.npmjs.com/) (version specified in the engines field of [`package.json`](../package.json)) which is used to install dependencies.

-   (optional) a nice visual interface between you and Git, like [Fork](https://fork.dev), or [SourceTree](https://www.sourcetreeapp.com/).

---

### Getting the Sources

Fork and clone the repository:

1. Login to your GitHub account or create one by following the instructions given [here](https://github.com/join).
2. [Fork](http://help.github.com/forking) the project repository.
3. Clone your fork of the repository and define an `upstream` remote pointing back to the repository that you forked in the first place.

Clone your Git repository:

```shell
$ git clone git@github.com:<github username>/<repository name>.git
```

Go to the repository directory:

```shell
$ cd <repository name>
```

Add the repository as an upstream remote to your repository:

```shell
$ git remote add upstream https://github.com/auturge/<repository name>.git
```

---

### Installing NPM Modules

Next, install the JavaScript modules needed to build and test the package:

```shell
npm install
```

---

## Building

To build the package, navigate to the project root folder, and run:

```shell
npm run build
```

-   Results are put in the `build/` or `dist/` folder.

---

## Running Tests Locally

You should execute all test suites before submitting a PR to GitHub:

-   `npm run test`

[contributing]: https://github.com/auturge/auturge/blob/master/docs/CONTRIBUTING.md#top
