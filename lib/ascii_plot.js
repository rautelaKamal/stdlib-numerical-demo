'use strict';

/**
* ASCII Plot Module
*
* Generates simple ASCII art visualizations of mathematical functions
* using stdlib. This demonstrates stdlib's array utilities and
* special functions in a visual, intuitive way.
*/

var exp = require('@stdlib/math/base/special/exp');
var ln = require('@stdlib/math/base/special/ln');
var sqrt = require('@stdlib/math/base/special/sqrt');
var abs = require('@stdlib/math/base/special/abs');
var floor = require('@stdlib/math/base/special/floor');
var round = require('@stdlib/math/base/special/round');
var max = require('@stdlib/math/base/special/max');
var min = require('@stdlib/math/base/special/min');
var isnan = require('@stdlib/math/base/assert/is-nan');
var isinfinite = require('@stdlib/math/base/assert/is-infinite');
var linspace = require('@stdlib/array/linspace');

// Plot dimensions...
var PLOT_WIDTH = 60;
var PLOT_HEIGHT = 18;

/**
* Renders an ASCII plot of a mathematical function.
*
* @private
* @param {string} title - plot title
* @param {Function} fn - function to plot
* @param {number} xmin - minimum x value
* @param {number} xmax - maximum x value
* @param {string} description - description of the function
*/
function plotFunction(title, fn, xmin, xmax, description) {
    var ymin;
    var ymax;
    var grid;
    var line;
    var col;
    var row;
    var x;
    var y;
    var i;
    var j;

    // Compute function values...
    x = linspace(xmin, xmax, PLOT_WIDTH);
    y = new Float64Array(PLOT_WIDTH);
    ymin = Infinity;
    ymax = -Infinity;

    for (i = 0; i < PLOT_WIDTH; i++) {
        y[i] = fn(x[i]);
        if (!isnan(y[i]) && !isinfinite(y[i])) {
            if (y[i] < ymin) {
                ymin = y[i];
            }
            if (y[i] > ymax) {
                ymax = y[i];
            }
        }
    }

    // Handle edge case where all values are the same...
    if (ymin === ymax) {
        ymin -= 1.0;
        ymax += 1.0;
    }

    // Initialize grid with spaces...
    grid = [];
    for (j = 0; j < PLOT_HEIGHT; j++) {
        grid.push([]);
        for (i = 0; i < PLOT_WIDTH; i++) {
            grid[j].push(' ');
        }
    }

    // Plot each point...
    for (i = 0; i < PLOT_WIDTH; i++) {
        if (!isnan(y[i]) && !isinfinite(y[i])) {
            row = round(
                (1.0 - (y[i] - ymin) / (ymax - ymin)) *
                (PLOT_HEIGHT - 1)
            );
            // Clamp row to valid range...
            row = floor(max(0, min(PLOT_HEIGHT - 1, row)));
            grid[row][i] = '●';
        }
    }

    // Draw the zero line if it's in range...
    if (ymin <= 0.0 && ymax >= 0.0) {
        row = round(
            (1.0 - (0.0 - ymin) / (ymax - ymin)) *
            (PLOT_HEIGHT - 1)
        );
        row = floor(max(0, min(PLOT_HEIGHT - 1, row)));
        for (i = 0; i < PLOT_WIDTH; i++) {
            if (grid[row][i] === ' ') {
                grid[row][i] = '·';
            }
        }
    }

    // Print the plot...
    console.log('');
    console.log('  ┌─ ' + title + ' ' +
        new Array(max(1, PLOT_WIDTH - title.length - 3)).join('─') +
        '┐');
    console.log('  │  ' + description);
    console.log('  │  x ∈ [' + xmin + ', ' + xmax + ']' +
        '  y ∈ [' + ymin.toFixed(2) + ', ' + ymax.toFixed(2) + ']');
    console.log('  │');

    for (j = 0; j < PLOT_HEIGHT; j++) {
        line = '';
        if (j === 0) {
            line = (ymax.toFixed(1) + '     ').slice(0, 7);
        } else if (j === PLOT_HEIGHT - 1) {
            line = (ymin.toFixed(1) + '     ').slice(0, 7);
        } else {
            line = '       ';
        }
        console.log('  │' + line + '│' +
            grid[j].join('') + '│');
    }

    console.log('  │       └' +
        new Array(PLOT_WIDTH + 1).join('─') + '┘');
    console.log('  │        ' +
        (xmin.toFixed(1) + '     ').slice(0, 7) +
        new Array(max(1, PLOT_WIDTH - 13)).join(' ') +
        (xmax.toFixed(1)));
    console.log('  └' +
        new Array(PLOT_WIDTH + 10).join('─') + '┘');
}

/**
* The sigmoid function: 1 / (1 + exp(-x))
*
* @private
* @param {number} x - input
* @returns {number} sigmoid value
*/
function sigmoid(x) {
    return 1.0 / (1.0 + exp(-x));
}

/**
* The Gaussian function: exp(-x^2)
*
* @private
* @param {number} x - input
* @returns {number} Gaussian value
*/
function gaussian(x) {
    return exp(-(x * x));
}

/**
* Main ASCII plot function - visualizes several math functions.
*/
function asciiPlot() {
    console.log('  Visualizing stdlib math functions with ASCII art:');

    plotFunction(
        'exp(x)',
        exp,
        -2.0, 3.0,
        'Exponential growth - foundation of calculus'
    );

    plotFunction(
        'ln(x)',
        ln,
        0.1, 10.0,
        'Natural logarithm - inverse of exp'
    );

    plotFunction(
        'sqrt(x)',
        sqrt,
        0.0, 16.0,
        'Square root - concave increasing function'
    );

    plotFunction(
        'sigmoid(x) = 1/(1+exp(-x))',
        sigmoid,
        -6.0, 6.0,
        'S-curve used in machine learning'
    );

    plotFunction(
        'gaussian(x) = exp(-x²)',
        gaussian,
        -3.0, 3.0,
        'Bell curve - heart of normal distribution'
    );
}

module.exports = asciiPlot;
