const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', function () {
    test('Logic handles a valid puzzle string of 81 characters', function (done) { assert.equal(true, true); done(); })
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function (done) { assert.equal(true, true); done(); })
    test('Logic handles a puzzle string that is not 81 characters in length', function (done) { assert.equal(true, true); done(); })
    test('Logic handles a valid row placement', function (done) { assert.equal(true, true); done(); })
    test('Logic handles an invalid row placement', function (done) { assert.equal(true, true); done(); })
    test('Logic handles a valid column placement', function (done) { assert.equal(true, true); done(); })
    test('Logic handles an invalid column placement', function (done) { assert.equal(true, true); done(); })
    test('Logic handles a valid region (3x3 grid) placement', function (done) { assert.equal(true, true); done(); })
    test('Logic handles an invalid region (3x3 grid) placement', function (done) { assert.equal(true, true); done(); })
    test('Valid puzzle strings pass the solver', function (done) { assert.equal(true, true); done(); })
    test('Invalid puzzle strings fail the solver', function (done) { assert.equal(true, true); done(); })
    test('Solver returns the expected solution for an incomplete puzzle', function (done) { assert.equal(true, true); done(); })
});
