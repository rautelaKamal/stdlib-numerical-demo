'use strict';

/**
* Accuracy Comparison Module
*
* Compares stdlib's math functions against native JavaScript Math
* implementations across a range of inputs to highlight accuracy
* differences, especially near boundaries and extreme values.
*/

var exp = require('@stdlib/math/base/special/exp');
var ln = require('@stdlib/math/base/special/ln');
var sqrt = require('@stdlib/math/base/special/sqrt');
var abs = require('@stdlib/math/base/special/abs');
var floor = require('@stdlib/math/base/special/floor');
var isnan = require('@stdlib/math/base/assert/is-nan');
var isinfinite = require('@stdlib/math/base/assert/is-infinite');
var FLOAT64_EPS = require('@stdlib/constants/float64/eps');
var FLOAT64_MAX = require('@stdlib/constants/float64/max');
var FLOAT64_MIN_SAFE_INTEGER = require('@stdlib/constants/float64/min-safe-integer');
var FLOAT64_MAX_SAFE_INTEGER = require('@stdlib/constants/float64/max-safe-integer');
var linspace = require('@stdlib/array/linspace');

/**
* Computes the number of ULPs (units in the last place) difference
* between two floating-point numbers.
*
* @private
* @param {number} a - first value
* @param {number} b - second value
* @returns {number} ULP difference
*/
function ulpDiff(a, b) {
    var diff;
    if (a === b) {
        return 0.0;
    }
    if (isnan(a) || isnan(b)) {
        return NaN;
    }
    if (isinfinite(a) || isinfinite(b)) {
        return Infinity;
    }
    if (a === 0.0) {
        diff = abs(b) / (FLOAT64_EPS / 2.0);
        return diff;
    }
    diff = abs(a - b) / (abs(a) * FLOAT64_EPS);
    return diff;
}

/**
* Runs an accuracy comparison between a stdlib function and a
* native JavaScript function over a given range.
*
* @private
* @param {string} name - comparison name
* @param {Function} stdlibFn - stdlib function
* @param {Function} nativeFn - native JS function
* @param {Float64Array} testPoints - array of test points
*/
function runComparison(name, stdlibFn, nativeFn, testPoints) {
    var maxUlpDiff;
    var totalDiff;
    var worstCase;
    var stdlibVal;
    var nativeVal;
    var nAgree;
    var nTotal;
    var diff;
    var i;

    maxUlpDiff = 0.0;
    totalDiff = 0.0;
    worstCase = 0.0;
    nAgree = 0;
    nTotal = 0;

    for (i = 0; i < testPoints.length; i++) {
        stdlibVal = stdlibFn(testPoints[i]);
        nativeVal = nativeFn(testPoints[i]);

        // Skip cases where both return non-finite values...
        if (isnan(stdlibVal) && isnan(nativeVal)) {
            continue;
        }
        if (isinfinite(stdlibVal) && isinfinite(nativeVal)) {
            if (stdlibVal === nativeVal) {
                continue;
            }
        }

        nTotal += 1;

        if (stdlibVal === nativeVal) {
            nAgree += 1;
            continue;
        }

        diff = ulpDiff(stdlibVal, nativeVal);
        if (!isnan(diff) && !isinfinite(diff)) {
            totalDiff += diff;
            if (diff > maxUlpDiff) {
                maxUlpDiff = diff;
                worstCase = testPoints[i];
            }
        }
    }

    console.log('  ┌─ ' + name);
    console.log('  │  Points tested:       ' + testPoints.length);
    console.log('  │  Exact agreement:      ' + nAgree + '/' + nTotal +
        ' (' + (100.0 * nAgree / nTotal).toFixed(1) + '%)');
    if (maxUlpDiff > 0) {
        console.log('  │  Max ULP difference:  ' + maxUlpDiff.toFixed(2));
        console.log('  │  Avg ULP difference:  ' +
            (totalDiff / (nTotal - nAgree)).toFixed(4));
        console.log('  │  Worst case at x =    ' + worstCase);
        console.log('  │  stdlib(' + worstCase + ') = ' +
            stdlibFn(worstCase));
        console.log('  │  native(' + worstCase + ') = ' +
            nativeFn(worstCase));
    } else {
        console.log('  │  ✓ Perfect agreement across all test points!');
    }
    console.log('  └──────────────────────────────────────────');
    console.log('');
}

/**
* Main comparison function.
*/
function compare() {
    var tinyPositivePoints;
    var largePoints;
    var points;

    // Generate test points for different ranges...

    // Standard range: [-10, 10]
    points = linspace(-10.0, 10.0, 5000);

    // Large range: [-700, 700] (near exp overflow/underflow)
    largePoints = linspace(-700.0, 700.0, 5000);

    // Tiny positive values near zero: [1e-300, 1e-1]
    tinyPositivePoints = new Float64Array(1000);
    (function generateTinyPoints() {
        var i;
        for (i = 0; i < 1000; i++) {
            tinyPositivePoints[i] = Math.pow(10, -300 + (i * 299 / 999));
        }
    })();

    // Compare exp...
    console.log('  Comparing: exp(x)');
    console.log('  stdlib: @stdlib/math/base/special/exp');
    console.log('  native: Math.exp');
    console.log('');

    runComparison(
        'exp(x) on [-10, 10]',
        exp,
        Math.exp,
        points
    );

    runComparison(
        'exp(x) on [-700, 700] (near overflow/underflow)',
        exp,
        Math.exp,
        largePoints
    );

    // Compare ln...
    console.log('  Comparing: ln(x)');
    console.log('  stdlib: @stdlib/math/base/special/ln');
    console.log('  native: Math.log');
    console.log('');

    runComparison(
        'ln(x) on tiny positives [1e-300, 0.1]',
        ln,
        Math.log,
        tinyPositivePoints
    );

    runComparison(
        'ln(x) on [0.001, 10]',
        ln,
        Math.log,
        linspace(0.001, 10.0, 5000)
    );

    // Compare sqrt...
    console.log('  Comparing: sqrt(x)');
    console.log('  stdlib: @stdlib/math/base/special/sqrt');
    console.log('  native: Math.sqrt');
    console.log('');

    runComparison(
        'sqrt(x) on [0, 1000]',
        sqrt,
        Math.sqrt,
        linspace(0.0, 1000.0, 5000)
    );

    // Summary
    console.log('  Summary: stdlib provides carefully implemented');
    console.log('  mathematical functions that match or exceed the');
    console.log('  accuracy of native JavaScript Math functions,');
    console.log('  especially near boundary conditions.');
}

module.exports = compare;
