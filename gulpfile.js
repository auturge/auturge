/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

"use strict";
const path = require("path");

const logOutput = false;
const purgeIfStale = false;

// THIS CHECK SHOULD BE THE FIRST THING IN THIS FILE
// This is to ensure that we catch env issues before we error while requiring
// other dependencies.
const PROJECT_ROOT = path.resolve(__dirname, "./");
const packageFile = path.resolve(PROJECT_ROOT, "package.json");

const engines = require(packageFile).engines;
require("./scripts/check-env/check-environment")(
    {
        requiredNodeVersion: engines.node,
        requiredNpmVersion: engines.npm,
        requiredYarnVersion: engines.yarn
    },
    logOutput,
    purgeIfStale
);

const gulp = require("gulp");

// See `scripts/gulp-tasks/README.md` for information about task loading.
const GULP_TASKS = path.resolve(PROJECT_ROOT, "./scripts/gulp/gulp-tasks");

function loadTask(fileName, taskName) {
    const modulePath = path.resolve(GULP_TASKS, fileName);
    const taskModule = require(modulePath);
    const task = taskName ? taskModule[taskName] : taskModule;
    return task(gulp);
}

gulp.task("validate-commit-messages", loadTask("validate-commit-message"));

gulp.task("tslint", (done) => {
    loadTask("lint");
    done();
});

gulp.task("lint", gulp.series(["validate-commit-messages", "tslint"]));

gulp.task("check-env", (done) => {
    /* this is a noop because the env test ran already above */
    done();
});
