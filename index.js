'use strict';

/**
* stdlib Numerical Accuracy Explorer
*
* This tool demonstrates the power of stdlib's math functions by:
* 1. Comparing accuracy of stdlib vs native Math across a range of inputs
* 2. Testing edge cases (NaN, Infinity, subnormals, underflow, overflow)
* 3. Visualizing function behavior with ASCII plots
*
* Usage:
*   node index.js                 - Run all demos
*   node lib/compare.js           - Run accuracy comparison only
*   node lib/edge_cases.js        - Run edge case tests only
*   node lib/ascii_plot.js        - Run ASCII plots only
*/

var compare = require('./lib/compare.js');
var edgeCases = require('./lib/edge_cases.js');
var asciiPlot = require('./lib/ascii_plot.js');

// Header
console.log('');
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║         stdlib Numerical Accuracy Explorer              ║');
console.log('║   Demonstrating precision in numerical computing       ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('');

// Part 1: Accuracy comparison
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  PART 1: Accuracy Comparison (stdlib vs native Math)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
compare();

// Part 2: Edge case handling
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  PART 2: Edge Case Handling');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
edgeCases();

// Part 3: ASCII visualization
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  PART 3: Function Visualization (ASCII Plots)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
asciiPlot();

console.log('');
console.log('══════════════════════════════════════════════════════════');
console.log('  Demo complete! See README.md for more details.');
console.log('══════════════════════════════════════════════════════════');
console.log('');
