# Building and Testing Auturge

This document describes how to set up your development environment to build and test Auturge.
It also explains the basic mechanics of using `git`, `node`, and `yarn`.

- [Building and Testing Auturge](#building-and-testing-auturge)
  - [Prerequisite Software](#prerequisite-software)
  - [Getting the Sources](#getting-the-sources)
  - [Installing NPM Modules](#installing-npm-modules)
  - [Building](#building)
  - [Running Tests Locally](#running-tests-locally)
  
See the [contribution guidelines](https://github.com/auturge/auturge/blob/master/CONTRIBUTING.md) if you'd like to contribute to Auturge.

## Prerequisite Software

Before you can build and test Auturge, you must install and configure the following products on your development machine:

- [Git](http://git-scm.com) which is a distributed version control system.

- [Node.js](http://nodejs.org), (version specified in the engines field of [`package.json`](../package.json)) which is used to run a development web server, run tests, and generate distributable files.

- [Yarn](https://yarnpkg.com) (version specified in the engines field of [`package.json`](../package.json)) which is used to install dependencies.

- (optional) a nice visual interface between you and Git, like [Fork](https://fork.dev), or [SourceTree](https://www.sourcetreeapp.com/).

## Getting the Sources

Fork and clone the Auturge repository:

1. Login to your GitHub account or create one by following the instructions given [here](https://github.com/join).
2. [Fork](http://help.github.com/forking) the [main Auturge repository](https://github.com/auturge/auturge).
3. Clone your fork of the Auturge repository and define an `upstream` remote pointing back to the Auturge repository that you forked in the first place.

```shell
# Clone your Git repository:
git clone git@github.com:<github username>/auturge.git

# Go to the Auturge directory:
cd auturge

# Add the main Auturge repository as an upstream remote to your repository:
git remote add upstream https://github.com/auturge/auturge.git
```

## Installing NPM Modules

Next, install the JavaScript modules needed to build and test Auturge:

```shell
# Install Auturge project dependencies (package.json)
yarn install
```

## Building

To build Auturge, navigate to the project root folder, and run:

```shell
npm run build
```

- Reults are put in the `built/` folder.

## Running Tests Locally

Karma is used as the primary test runner for building and testing Auturge.

You should execute all test suites before submitting a PR to GitHub:

- `npm run test`

<!--

All the tests are executed on our Continuous Integration infrastructure. PRs can only be
merged if the code is formatted properly and all tests are passing.

-->
<!--

-## <a name="clang-format"></a> Formatting your source code

Auturge uses [clang-format](http://clang.llvm.org/docs/ClangFormat.html) to format the source code.
If the source code is not properly formatted, the CI will fail and the PR cannot be merged.

You can automatically format your code by running:

- `yarn gulp format`: re-format only edited source code.
- `yarn gulp format:all`: format _all_ source code

A better way is to set up your IDE to format the changed file on each file save.

-### VS Code

1. Install [Clang-Format](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format) extension for VS Code.

It will automatically pick up the settings from Auturge's [settings.json](../.vscode/settings.json).

-### WebStorm / IntelliJ

1. Install the [ClangFormatIJ](https://plugins.jetbrains.com/plugin/8396-clangformatij) plugin
1. Open `Preferences->Tools->clang-format`
1. Find the field named "PATH"
1. Add `<PATH_TO_YOUR_WORKSPACE>/auturge/node_modules/clang-format/bin/<OS>/`
  where the OS options are: `darwin_x64`, `linux_x64`, and `win32`.

-### Vim

1. Install [Vim Clang-Format](https://github.com/rhysd/vim-clang-format).
2. Create a [project-specific `.vimrc`](https://andrew.stwrt.ca/posts/project-specific-vimrc/) in
   your Auturge directory containing

```vim
let g:clang_format#command = '$AUTURGE_PATH/node_modules/.bin/clang-format'
```

where `$AUTURGE_PATH` is an environment variable of the absolute path of your Auturge directory.

-## Linting/verifying your source code

You can check that your code is properly formatted and adheres to coding style by running:

``` shell
$ yarn gulp lint
```

-->
