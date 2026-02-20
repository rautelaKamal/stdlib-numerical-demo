'use strict';

/**
* Edge Case Testing Module
*
* Tests how stdlib math functions handle special IEEE 754 values
* and boundary conditions: NaN, positive/negative infinity,
* positive/negative zero, subnormal numbers, and overflow/underflow.
*/

var exp = require('@stdlib/math/base/special/exp');
var ln = require('@stdlib/math/base/special/ln');
var sqrt = require('@stdlib/math/base/special/sqrt');
var abs = require('@stdlib/math/base/special/abs');
var isnan = require('@stdlib/math/base/assert/is-nan');
var isPositiveZero = require('@stdlib/math/base/assert/is-positive-zero');
var isNegativeZero = require('@stdlib/math/base/assert/is-negative-zero');
var PINF = require('@stdlib/constants/float64/pinf');
var NINF = require('@stdlib/constants/float64/ninf');
var FLOAT64_SMALLEST_NORMAL = require('@stdlib/constants/float64/smallest-normal');
var FLOAT64_MAX = require('@stdlib/constants/float64/max');
var FLOAT64_EPS = require('@stdlib/constants/float64/eps');

/**
* Tests a single edge case and prints the result.
*
* @private
* @param {string} label - description of the test
* @param {number} actual - actual result
* @param {string} expected - expected behavior description
* @param {boolean} passed - whether the test passed
*/
function testCase(label, actual, expected, passed) {
    var status = passed ? '  ✓ PASS' : '  ✗ FAIL';
    console.log(status + '  │ ' + label);
    console.log('         │   Result: ' + actual);
    console.log('         │   Expected: ' + expected);
}

/**
* Runs edge case tests for the exp function.
*
* @private
*/
function testExp() {
    var result;

    console.log('');
    console.log('  ┌── exp(x) Edge Cases ──────────────────────');
    console.log('  │');

    // exp(0) should be exactly 1
    result = exp(0.0);
    testCase(
        'exp(0) = 1',
        result,
        '1 (exactly)',
        result === 1.0
    );

    // exp(1) should be close to Euler's number
    result = exp(1.0);
    testCase(
        'exp(1) ≈ e ≈ 2.71828...',
        result,
        '2.718281828459045...',
        abs(result - 2.718281828459045) < FLOAT64_EPS * 4
    );

    // exp(NaN) should be NaN
    result = exp(NaN);
    testCase(
        'exp(NaN) = NaN',
        result,
        'NaN',
        isnan(result)
    );

    // exp(+Infinity) should be +Infinity
    result = exp(PINF);
    testCase(
        'exp(+∞) = +∞',
        result,
        '+Infinity',
        result === PINF
    );

    // exp(-Infinity) should be 0
    result = exp(NINF);
    testCase(
        'exp(-∞) = 0',
        result,
        '0',
        result === 0.0
    );

    // exp(710) should overflow to Infinity
    result = exp(710.0);
    testCase(
        'exp(710) overflows to +∞',
        result,
        '+Infinity (overflow)',
        result === PINF
    );

    // exp(-745) should underflow to 0
    result = exp(-745.0);
    testCase(
        'exp(-745) underflows to 0',
        result,
        '0 (underflow)',
        result === 0.0
    );

    // exp with very small input: exp(1e-20) ≈ 1 + 1e-20
    result = exp(1.0e-20);
    testCase(
        'exp(1e-20) ≈ 1 + 1e-20 (tiny input)',
        result,
        '≈ 1.0 (first-order Taylor)',
        abs(result - 1.0) < 1.0e-15
    );

    console.log('  │');
    console.log('  └────────────────────────────────────────────');
}

/**
* Runs edge case tests for the ln function.
*
* @private
*/
function testLn() {
    var result;

    console.log('');
    console.log('  ┌── ln(x) Edge Cases ───────────────────────');
    console.log('  │');

    // ln(1) should be exactly 0
    result = ln(1.0);
    testCase(
        'ln(1) = 0',
        result,
        '0 (exactly)',
        result === 0.0
    );

    // ln(e) should be close to 1
    result = ln(2.718281828459045);
    testCase(
        'ln(e) ≈ 1',
        result,
        '1.0',
        abs(result - 1.0) < FLOAT64_EPS * 4
    );

    // ln(0) should be -Infinity
    result = ln(0.0);
    testCase(
        'ln(0) = -∞',
        result,
        '-Infinity',
        result === NINF
    );

    // ln(-1) should be NaN (complex number domain)
    result = ln(-1.0);
    testCase(
        'ln(-1) = NaN (not in real domain)',
        result,
        'NaN',
        isnan(result)
    );

    // ln(NaN) should be NaN
    result = ln(NaN);
    testCase(
        'ln(NaN) = NaN',
        result,
        'NaN',
        isnan(result)
    );

    // ln(+Infinity) should be +Infinity
    result = ln(PINF);
    testCase(
        'ln(+∞) = +∞',
        result,
        '+Infinity',
        result === PINF
    );

    // ln of a subnormal number
    result = ln(5.0e-324);
    testCase(
        'ln(5e-324) handles subnormal input',
        result,
        '≈ -744.44 (very negative)',
        result < -700.0 && !isnan(result)
    );

    console.log('  │');
    console.log('  └────────────────────────────────────────────');
}

/**
* Runs edge case tests for the sqrt function.
*
* @private
*/
function testSqrt() {
    var result;

    console.log('');
    console.log('  ┌── sqrt(x) Edge Cases ─────────────────────');
    console.log('  │');

    // sqrt(4) should be exactly 2
    result = sqrt(4.0);
    testCase(
        'sqrt(4) = 2',
        result,
        '2 (exactly)',
        result === 2.0
    );

    // sqrt(0) should be exactly 0
    result = sqrt(0.0);
    testCase(
        'sqrt(0) = 0',
        result,
        '0',
        isPositiveZero(result)
    );

    // sqrt(-0) should be -0 per IEEE 754
    result = sqrt(-0.0);
    testCase(
        'sqrt(-0) = -0 (IEEE 754)',
        result,
        '-0',
        isNegativeZero(result)
    );

    // sqrt(-1) should be NaN
    result = sqrt(-1.0);
    testCase(
        'sqrt(-1) = NaN',
        result,
        'NaN',
        isnan(result)
    );

    // sqrt(NaN) should be NaN
    result = sqrt(NaN);
    testCase(
        'sqrt(NaN) = NaN',
        result,
        'NaN',
        isnan(result)
    );

    // sqrt(+Infinity) should be +Infinity
    result = sqrt(PINF);
    testCase(
        'sqrt(+∞) = +∞',
        result,
        '+Infinity',
        result === PINF
    );

    // sqrt of the largest float64
    result = sqrt(FLOAT64_MAX);
    testCase(
        'sqrt(MAX_FLOAT64) does not overflow',
        result,
        '≈ 1.34e+154',
        result > 1.0e+150 && !isinfinite(result)
    );

    // sqrt of the smallest normal
    result = sqrt(FLOAT64_SMALLEST_NORMAL);
    testCase(
        'sqrt(SMALLEST_NORMAL) handles small input',
        result,
        '≈ 1.49e-154',
        result > 0.0 && result < 1.0e-100 && !isnan(result)
    );

    console.log('  │');
    console.log('  └────────────────────────────────────────────');
}

/**
* Demonstrates stdlib's IEEE 754 awareness.
*
* @private
*/
function testIEEE754() {
    console.log('');
    console.log('  ┌── IEEE 754 Constants from stdlib ─────────');
    console.log('  │');
    console.log('  │  Machine Epsilon (eps):    ' + FLOAT64_EPS);
    console.log('  │  Smallest Normal:          ' + FLOAT64_SMALLEST_NORMAL);
    console.log('  │  Largest Float64:          ' + FLOAT64_MAX);
    console.log('  │  Positive Infinity:        ' + PINF);
    console.log('  │  Negative Infinity:        ' + NINF);
    console.log('  │');
    console.log('  │  stdlib provides typed constants that make');
    console.log('  │  IEEE 754 edge case handling explicit and');
    console.log('  │  portable across environments.');
    console.log('  │');
    console.log('  └────────────────────────────────────────────');
}

/**
* Checks if a value is infinite.
*
* @private
* @param {number} x - value to check
* @returns {boolean} whether x is infinite
*/
function isinfinite(x) {
    return (x === PINF || x === NINF);
}

/**
* Main edge case function.
*/
function edgeCases() {
    testExp();
    testLn();
    testSqrt();
    testIEEE754();
}

module.exports = edgeCases;
