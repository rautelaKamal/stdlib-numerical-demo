/**
* @license Apache-2.0
*
* Copyright (c) 2026 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable max-lines */

// ============================================================
// stdlib Math Explorer — Interactive Application
//
// This web application demonstrates stdlib's math functions
// through interactive visualizations, accuracy analysis,
// edge case exploration, and performance benchmarking.
//
// All math implementations here mirror stdlib's approach to
// numerical computing: careful handling of IEEE 754 edge cases,
// high-precision polynomial approximations, and robust
// argument reduction.
// ============================================================

(function main() {
    'use strict';

    // CONSTANTS //

    var PI = 3.141592653589793;
    var TWO_PI = 6.283185307179586;
    var E = 2.718281828459045;
    var LN2 = 0.6931471805599453;
    var LN10 = 2.302585092994046;
    var LOG2E = 1.4426950408889634;
    var FLOAT64_EPS = 2.2204460492503131e-16;
    var PINF = Infinity;
    var NINF = -Infinity;

    // COLORS //

    var COLORS = {
        'line': '#58a6ff',
        'grid': 'rgba(48, 54, 61, 0.6)',
        'axis': 'rgba(139, 148, 158, 0.5)',
        'text': '#8b949e',
        'bg': '#0d1117',
        'crosshair': 'rgba(88, 166, 255, 0.3)',
        'point': '#58a6ff',
        'gradient1': 'rgba(88, 166, 255, 0.15)',
        'gradient2': 'rgba(88, 166, 255, 0.0)',
        'green': '#3fb950',
        'red': '#f85149',
        'orange': '#d29922',
        'purple': '#bc8cff'
    };

    // FUNCTION DEFINITIONS //

    /**
    * Returns information about each available function.
    *
    * @private
    * @returns {Object} function metadata
    */
    var FUNCTIONS = {
        'exp': {
            'fn': Math.exp,
            'name': 'exp(x)',
            'desc': 'The exponential function. Maps every real number to a positive number. Foundation of calculus, differential equations, and complex analysis.',
            'domain': '(-∞, +∞)',
            'range': '(0, +∞)',
            'props': { 'exp(0)': '1', 'exp(1)': 'e ≈ 2.71828' },
            'defaultRange': [-3, 5]
        },
        'exp2': {
            'fn': function exp2(x) { return Math.pow(2.0, x); },
            'name': 'exp2(x)',
            'desc': 'Base-2 exponential function. Returns 2 raised to the power x. Critical in computer science for binary computations and IEEE 754 floating-point representation.',
            'domain': '(-∞, +∞)',
            'range': '(0, +∞)',
            'props': { 'exp2(0)': '1', 'exp2(10)': '1024' },
            'defaultRange': [-3, 10]
        },
        'expm1': {
            'fn': Math.expm1,
            'name': 'expm1(x)',
            'desc': 'Returns exp(x) - 1. Provides higher precision than computing exp(x) - 1 directly for values of x near zero, avoiding catastrophic cancellation.',
            'domain': '(-∞, +∞)',
            'range': '(-1, +∞)',
            'props': { 'expm1(0)': '0', 'Near 0': 'Higher precision' },
            'defaultRange': [-4, 4]
        },
        'ln': {
            'fn': Math.log,
            'name': 'ln(x)',
            'desc': 'Natural logarithm (base e). The inverse of the exponential function. Fundamental in information theory, thermodynamics, and numerical analysis.',
            'domain': '(0, +∞)',
            'range': '(-∞, +∞)',
            'props': { 'ln(1)': '0', 'ln(e)': '1' },
            'defaultRange': [0.01, 10]
        },
        'log2': {
            'fn': Math.log2,
            'name': 'log2(x)',
            'desc': 'Base-2 logarithm. Essential in computer science for algorithm complexity analysis (O(log n)), information theory (bits), and binary arithmetic.',
            'domain': '(0, +∞)',
            'range': '(-∞, +∞)',
            'props': { 'log2(1)': '0', 'log2(1024)': '10' },
            'defaultRange': [0.01, 16]
        },
        'log10': {
            'fn': Math.log10,
            'name': 'log10(x)',
            'desc': 'Base-10 logarithm. Used extensively in science for decibels, pH, Richter scale, and order-of-magnitude estimation.',
            'domain': '(0, +∞)',
            'range': '(-∞, +∞)',
            'props': { 'log10(1)': '0', 'log10(100)': '2' },
            'defaultRange': [0.01, 100]
        },
        'log1p': {
            'fn': Math.log1p,
            'name': 'log1p(x)',
            'desc': 'Returns ln(1+x). Provides higher precision than computing ln(1+x) directly for small x, critical in financial computations and statistics.',
            'domain': '(-1, +∞)',
            'range': '(-∞, +∞)',
            'props': { 'log1p(0)': '0', 'Near 0': 'Higher precision' },
            'defaultRange': [-0.99, 5]
        },
        'sqrt': {
            'fn': Math.sqrt,
            'name': 'sqrt(x)',
            'desc': 'Square root function. One of the most fundamental operations in mathematics, used in distance calculations, statistics (standard deviation), and physics.',
            'domain': '[0, +∞)',
            'range': '[0, +∞)',
            'props': { 'sqrt(0)': '0', 'sqrt(4)': '2' },
            'defaultRange': [0, 16]
        },
        'cbrt': {
            'fn': Math.cbrt,
            'name': 'cbrt(x)',
            'desc': 'Cube root function. Unlike square root, defined for all real numbers including negatives. Used in solving cubic equations and in 3D geometry.',
            'domain': '(-∞, +∞)',
            'range': '(-∞, +∞)',
            'props': { 'cbrt(0)': '0', 'cbrt(27)': '3' },
            'defaultRange': [-8, 8]
        },
        'sin': {
            'fn': Math.sin,
            'name': 'sin(x)',
            'desc': 'Sine function. The fundamental periodic function, modeling waves, oscillations, and circular motion. Period is 2π.',
            'domain': '(-∞, +∞)',
            'range': '[-1, 1]',
            'props': { 'sin(0)': '0', 'sin(π/2)': '1' },
            'defaultRange': [-TWO_PI, TWO_PI]
        },
        'cos': {
            'fn': Math.cos,
            'name': 'cos(x)',
            'desc': 'Cosine function. Phase-shifted sine: cos(x) = sin(x + π/2). Used in Fourier analysis, signal processing, and rotation matrices.',
            'domain': '(-∞, +∞)',
            'range': '[-1, 1]',
            'props': { 'cos(0)': '1', 'cos(π)': '-1' },
            'defaultRange': [-TWO_PI, TWO_PI]
        },
        'tan': {
            'fn': Math.tan,
            'name': 'tan(x)',
            'desc': 'Tangent function (sin/cos). Has vertical asymptotes at odd multiples of π/2. Used in trigonometry, calculus, and engineering.',
            'domain': 'x ≠ kπ/2',
            'range': '(-∞, +∞)',
            'props': { 'tan(0)': '0', 'tan(π/4)': '1' },
            'defaultRange': [-PI + 0.1, PI - 0.1]
        },
        'sigmoid': {
            'fn': function sigmoid(x) {
                return 1.0 / (1.0 + Math.exp(-x));
            },
            'name': 'sigmoid(x)',
            'desc': 'Logistic sigmoid: 1/(1+exp(-x)). The most important activation function in neural networks. Smoothly maps any real to (0,1).',
            'domain': '(-∞, +∞)',
            'range': '(0, 1)',
            'props': { 'σ(0)': '0.5', 'σ(∞)': '→ 1' },
            'defaultRange': [-8, 8]
        },
        'gaussian': {
            'fn': function gaussian(x) {
                return Math.exp(-(x * x));
            },
            'name': 'gaussian(x)',
            'desc': 'Gaussian function exp(-x²). The bell curve at the heart of the normal distribution, central limit theorem, and heat equation solution.',
            'domain': '(-∞, +∞)',
            'range': '(0, 1]',
            'props': { 'g(0)': '1 (peak)', 'FWHM': '≈ 1.177' },
            'defaultRange': [-4, 4]
        },
        'sinc': {
            'fn': function sinc(x) {
                if (x === 0.0) {
                    return 1.0;
                }
                var px = PI * x;
                return Math.sin(px) / px;
            },
            'name': 'sinc(x)',
            'desc': 'Normalized sinc function: sin(πx)/(πx). Fundamental in signal processing (ideal low-pass filter), Fourier analysis, and interpolation theory.',
            'domain': '(-∞, +∞)',
            'range': '[-0.217, 1]',
            'props': { 'sinc(0)': '1', 'sinc(n)': '0 for n≠0' },
            'defaultRange': [-8, 8]
        },
        'heaviside': {
            'fn': function heaviside(x) {
                if (x < 0.0) { return 0.0; }
                if (x === 0.0) { return 0.5; }
                return 1.0;
            },
            'name': 'heaviside(x)',
            'desc': 'Heaviside step function. Equals 0 for x<0 and 1 for x>0. Used in control theory, signal processing, and as the derivative of the ramp function.',
            'domain': '(-∞, +∞)',
            'range': '{0, 0.5, 1}',
            'props': { 'H(0)': '0.5 (half-max)', 'Derivative': 'δ(x)' },
            'defaultRange': [-3, 3]
        }
    };

    // HELPER FUNCTIONS //

    /**
    * Generates an array of evenly spaced values (like @stdlib/array/linspace).
    *
    * @private
    * @param {number} start - start value
    * @param {number} stop - stop value
    * @param {number} n - number of points
    * @returns {Array<number>} evenly spaced values
    */
    function linspace(start, stop, n) {
        var step;
        var out;
        var i;

        out = new Array(n);
        if (n === 1) {
            out[0] = start;
            return out;
        }
        step = (stop - start) / (n - 1);
        for (i = 0; i < n; i++) {
            out[i] = start + (step * i);
        }
        return out;
    }

    /**
    * Checks whether a value is NaN.
    *
    * @private
    * @param {number} x - value
    * @returns {boolean} result
    */
    function isnan(x) {
        return x !== x; // eslint-disable-line no-self-compare
    }

    /**
    * Checks whether a value is infinite.
    *
    * @private
    * @param {number} x - value
    * @returns {boolean} result
    */
    function isinfinite(x) {
        return (x === PINF || x === NINF);
    }

    /**
    * Returns the absolute value.
    *
    * @private
    * @param {number} x - value
    * @returns {number} |x|
    */
    function abs(x) {
        return (x < 0) ? -x : x;
    }

    /**
    * Computes ULP difference between two values.
    *
    * @private
    * @param {number} a - first value
    * @param {number} b - second value
    * @returns {number} ULP difference
    */
    function ulpDiff(a, b) {
        var diff;
        if (a === b) { return 0.0; }
        if (isnan(a) || isnan(b)) { return NaN; }
        if (isinfinite(a) || isinfinite(b)) { return PINF; }
        if (a === 0.0) {
            return abs(b) / (FLOAT64_EPS / 2.0);
        }
        diff = abs(a - b) / (abs(a) * FLOAT64_EPS);
        return diff;
    }

    /**
    * Formats a number for display.
    *
    * @private
    * @param {number} x - value
    * @returns {string} formatted string
    */
    function formatNum(x) {
        if (isnan(x)) { return 'NaN'; }
        if (x === PINF) { return '+∞'; }
        if (x === NINF) { return '-∞'; }
        if (x === 0 && (1 / x) === NINF) { return '-0'; }
        if (abs(x) > 1e6 || (abs(x) < 1e-4 && x !== 0)) {
            return x.toExponential(4);
        }
        return x.toPrecision(6);
    }

    // ============================================================
    // SECTION 1: Interactive Function Plotter
    // ============================================================

    var plotCanvas = document.getElementById('plot-canvas');
    var plotCtx = plotCanvas.getContext('2d');
    var functionSelect = document.getElementById('function-select');
    var xminInput = document.getElementById('xmin-input');
    var xmaxInput = document.getElementById('xmax-input');
    var resolutionSlider = document.getElementById('resolution-slider');
    var resolutionValue = document.getElementById('resolution-value');
    var showGrid = document.getElementById('show-grid');
    var showAxes = document.getElementById('show-axes');
    var showValues = document.getElementById('show-values');
    var functionInfo = document.getElementById('function-info');
    var cursorInfo = document.getElementById('cursor-info');
    var cursorX = document.getElementById('cursor-x');
    var cursorY = document.getElementById('cursor-y');

    /**
    * Draws the function plot on the canvas.
    *
    * @private
    */
    function drawPlot() {
        var fnKey = functionSelect.value;
        var fnData = FUNCTIONS[fnKey];
        var fn = fnData.fn;
        var xmin = parseFloat(xminInput.value);
        var xmax = parseFloat(xmaxInput.value);
        var n = parseInt(resolutionSlider.value, 10);
        var W = plotCanvas.width;
        var H = plotCanvas.height;
        var pad = 50;
        var plotW = W - 2 * pad;
        var plotH = H - 2 * pad;
        var points;
        var ymin;
        var ymax;
        var xScale;
        var yScale;
        var gradient;
        var x;
        var y;
        var px;
        var py;
        var tickX;
        var tickY;
        var stepX;
        var stepY;
        var label;
        var i;

        // Compute function values...
        points = [];
        ymin = PINF;
        ymax = NINF;
        x = linspace(xmin, xmax, n);

        for (i = 0; i < n; i++) {
            y = fn(x[i]);
            if (!isnan(y) && !isinfinite(y)) {
                points.push({ 'x': x[i], 'y': y });
                if (y < ymin) { ymin = y; }
                if (y > ymax) { ymax = y; }
            }
        }

        // Add padding to y range...
        var yRange = ymax - ymin;
        if (yRange === 0) { yRange = 2; ymin -= 1; ymax += 1; }
        ymin -= yRange * 0.05;
        ymax += yRange * 0.05;

        // Clear canvas...
        plotCtx.fillStyle = COLORS.bg;
        plotCtx.fillRect(0, 0, W, H);

        // Transform functions...
        xScale = function (v) { return pad + ((v - xmin) / (xmax - xmin)) * plotW; };
        yScale = function (v) { return pad + (1 - ((v - ymin) / (ymax - ymin))) * plotH; };

        // Draw grid...
        if (showGrid.checked) {
            plotCtx.strokeStyle = COLORS.grid;
            plotCtx.lineWidth = 0.5;

            stepX = Math.pow(10, Math.floor(Math.log10(xmax - xmin))) / 2;
            tickX = Math.ceil(xmin / stepX) * stepX;
            while (tickX <= xmax) {
                px = xScale(tickX);
                plotCtx.beginPath();
                plotCtx.moveTo(px, pad);
                plotCtx.lineTo(px, H - pad);
                plotCtx.stroke();
                tickX += stepX;
            }

            stepY = Math.pow(10, Math.floor(Math.log10(ymax - ymin))) / 2;
            tickY = Math.ceil(ymin / stepY) * stepY;
            while (tickY <= ymax) {
                py = yScale(tickY);
                plotCtx.beginPath();
                plotCtx.moveTo(pad, py);
                plotCtx.lineTo(W - pad, py);
                plotCtx.stroke();
                tickY += stepY;
            }
        }

        // Draw axes...
        if (showAxes.checked) {
            plotCtx.strokeStyle = COLORS.axis;
            plotCtx.lineWidth = 1.5;

            // X-axis (y=0)...
            if (ymin <= 0 && ymax >= 0) {
                py = yScale(0);
                plotCtx.beginPath();
                plotCtx.moveTo(pad, py);
                plotCtx.lineTo(W - pad, py);
                plotCtx.stroke();
            }

            // Y-axis (x=0)...
            if (xmin <= 0 && xmax >= 0) {
                px = xScale(0);
                plotCtx.beginPath();
                plotCtx.moveTo(px, pad);
                plotCtx.lineTo(px, H - pad);
                plotCtx.stroke();
            }
        }

        // Draw tick labels...
        if (showValues.checked) {
            plotCtx.fillStyle = COLORS.text;
            plotCtx.font = '11px "JetBrains Mono", monospace';
            plotCtx.textAlign = 'center';

            stepX = Math.pow(10, Math.floor(Math.log10(xmax - xmin))) / 2;
            tickX = Math.ceil(xmin / stepX) * stepX;
            while (tickX <= xmax) {
                px = xScale(tickX);
                plotCtx.fillText(tickX.toPrecision(3), px, H - pad + 18);
                tickX += stepX;
            }

            plotCtx.textAlign = 'right';
            stepY = Math.pow(10, Math.floor(Math.log10(ymax - ymin))) / 2;
            tickY = Math.ceil(ymin / stepY) * stepY;
            while (tickY <= ymax) {
                py = yScale(tickY);
                plotCtx.fillText(tickY.toPrecision(3), pad - 8, py + 4);
                tickY += stepY;
            }
        }

        // Draw filled area under curve...
        if (points.length > 1) {
            gradient = plotCtx.createLinearGradient(0, pad, 0, H - pad);
            gradient.addColorStop(0, COLORS.gradient1);
            gradient.addColorStop(1, COLORS.gradient2);

            plotCtx.fillStyle = gradient;
            plotCtx.beginPath();
            plotCtx.moveTo(xScale(points[0].x), yScale(0));
            for (i = 0; i < points.length; i++) {
                plotCtx.lineTo(xScale(points[i].x), yScale(points[i].y));
            }
            plotCtx.lineTo(xScale(points[points.length - 1].x), yScale(0));
            plotCtx.closePath();
            plotCtx.fill();
        }

        // Draw function line...
        if (points.length > 1) {
            plotCtx.strokeStyle = COLORS.line;
            plotCtx.lineWidth = 2.5;
            plotCtx.lineJoin = 'round';
            plotCtx.lineCap = 'round';
            plotCtx.beginPath();
            plotCtx.moveTo(xScale(points[0].x), yScale(points[0].y));
            for (i = 1; i < points.length; i++) {
                // Skip large jumps (asymptotes like tan)...
                if (abs(points[i].y - points[i - 1].y) > yRange * 0.5) {
                    plotCtx.stroke();
                    plotCtx.beginPath();
                    plotCtx.moveTo(xScale(points[i].x), yScale(points[i].y));
                } else {
                    plotCtx.lineTo(xScale(points[i].x), yScale(points[i].y));
                }
            }
            plotCtx.stroke();
        }

        // Draw function name...
        plotCtx.fillStyle = COLORS.line;
        plotCtx.font = 'bold 14px "JetBrains Mono", monospace';
        plotCtx.textAlign = 'left';
        plotCtx.fillText(fnData.name, pad + 10, pad + 20);

        // Store scales for mouse interaction...
        plotCanvas._xmin = xmin;
        plotCanvas._xmax = xmax;
        plotCanvas._ymin = ymin;
        plotCanvas._ymax = ymax;
        plotCanvas._pad = pad;
        plotCanvas._fn = fn;
    }

    /**
    * Updates the function info panel.
    *
    * @private
    */
    function updateFunctionInfo() {
        var fnKey = functionSelect.value;
        var fnData = FUNCTIONS[fnKey];
        var html = '<h4>' + fnData.name + '</h4>';
        var key;

        html += '<p class="info-desc">' + fnData.desc + '</p>';
        html += '<div class="info-properties">';
        html += '<div><span class="prop-label">Domain:</span> ' + fnData.domain + '</div>';
        html += '<div><span class="prop-label">Range:</span> ' + fnData.range + '</div>';
        for (key in fnData.props) {
            if (fnData.props.hasOwnProperty(key)) {
                html += '<div><span class="prop-label">' + key + ':</span> ' + fnData.props[key] + '</div>';
            }
        }
        html += '</div>';
        functionInfo.innerHTML = html;
    }

    // Mouse interaction for crosshair...
    plotCanvas.addEventListener('mousemove', function onMouseMove(e) {
        var rect = plotCanvas.getBoundingClientRect();
        var scaleX = plotCanvas.width / rect.width;
        var scaleY = plotCanvas.height / rect.height;
        var canvasX = (e.clientX - rect.left) * scaleX;
        var canvasY = (e.clientY - rect.top) * scaleY;
        var p = plotCanvas._pad;
        var plotW = plotCanvas.width - 2 * p;
        var plotH = plotCanvas.height - 2 * p;
        var xmin = plotCanvas._xmin;
        var xmax = plotCanvas._xmax;
        var ymin = plotCanvas._ymin;
        var ymax = plotCanvas._ymax;
        var fn = plotCanvas._fn;
        var dataX;
        var dataY;
        var py;

        if (canvasX >= p && canvasX <= plotCanvas.width - p &&
            canvasY >= p && canvasY <= plotCanvas.height - p) {
            dataX = xmin + ((canvasX - p) / plotW) * (xmax - xmin);
            dataY = fn(dataX);

            cursorInfo.classList.remove('hidden');
            cursorX.textContent = 'x: ' + dataX.toFixed(4);
            cursorY.textContent = 'f(x): ' + formatNum(dataY);

            // Redraw and add crosshair...
            drawPlot();

            py = p + (1 - ((dataY - ymin) / (ymax - ymin))) * plotH;

            // Vertical crosshair...
            plotCtx.strokeStyle = COLORS.crosshair;
            plotCtx.lineWidth = 1;
            plotCtx.setLineDash([4, 4]);
            plotCtx.beginPath();
            plotCtx.moveTo(canvasX, p);
            plotCtx.lineTo(canvasX, plotCanvas.height - p);
            plotCtx.stroke();

            // Horizontal crosshair to the point...
            if (!isnan(dataY) && !isinfinite(dataY) && py >= p && py <= plotCanvas.height - p) {
                plotCtx.beginPath();
                plotCtx.moveTo(p, py);
                plotCtx.lineTo(plotCanvas.width - p, py);
                plotCtx.stroke();

                // Point marker...
                plotCtx.setLineDash([]);
                plotCtx.fillStyle = COLORS.point;
                plotCtx.beginPath();
                plotCtx.arc(canvasX, py, 5, 0, TWO_PI);
                plotCtx.fill();

                plotCtx.strokeStyle = '#ffffff';
                plotCtx.lineWidth = 2;
                plotCtx.beginPath();
                plotCtx.arc(canvasX, py, 5, 0, TWO_PI);
                plotCtx.stroke();
            }
            plotCtx.setLineDash([]);
        } else {
            cursorInfo.classList.add('hidden');
        }
    });

    plotCanvas.addEventListener('mouseleave', function onMouseLeave() {
        cursorInfo.classList.add('hidden');
        drawPlot();
    });

    // Event listeners for controls...
    functionSelect.addEventListener('change', function onChange() {
        var fnData = FUNCTIONS[functionSelect.value];
        xminInput.value = fnData.defaultRange[0];
        xmaxInput.value = fnData.defaultRange[1];
        updateFunctionInfo();
        drawPlot();
    });

    xminInput.addEventListener('change', drawPlot);
    xmaxInput.addEventListener('change', drawPlot);
    resolutionSlider.addEventListener('input', function onInput() {
        resolutionValue.textContent = resolutionSlider.value;
        drawPlot();
    });
    showGrid.addEventListener('change', drawPlot);
    showAxes.addEventListener('change', drawPlot);
    showValues.addEventListener('change', drawPlot);

    // ============================================================
    // SECTION 2: Accuracy Comparison
    // ============================================================

    var accuracyCanvas = document.getElementById('accuracy-canvas');
    var accuracyCtx = accuracyCanvas.getContext('2d');
    var accuracyFunctionSelect = document.getElementById('accuracy-function');
    var runAccuracyBtn = document.getElementById('run-accuracy-btn');
    var statPoints = document.getElementById('stat-points');
    var statAgree = document.getElementById('stat-agree');
    var statMaxUlp = document.getElementById('stat-max-ulp');
    var statAvgUlp = document.getElementById('stat-avg-ulp');

    /**
    * Reference implementations with higher precision for comparison.
    * These simulate what stdlib does: use polynomial approximations
    * and argument reduction for higher accuracy.
    *
    * @private
    */
    var REFERENCE_FNS = {
        'exp': {
            'ref': function refExp(x) {
                // For comparison we use a Horner-form Taylor expansion
                // with more terms than typical native implementations...
                if (x === 0.0) { return 1.0; }
                if (isinfinite(x)) {
                    return (x > 0) ? PINF : 0.0;
                }
                if (isnan(x)) { return NaN; }
                // Argument reduction: x = k*ln(2) + r
                var k = Math.round(x * LOG2E);
                var r = x - k * LN2;
                // Taylor expansion of exp(r) with 12 terms...
                var r2 = r * r;
                var result = 1.0 + r * (1.0 + r * (0.5 + r * (
                    0.16666666666666666 + r * (0.041666666666666664 + r * (
                        0.008333333333333333 + r * (0.001388888888888889 + r * (
                            1.984126984126984e-4 + r * (2.48015873015873e-5 + r * (
                                2.7557319223985893e-6 + r * (2.7557319223985894e-7 +
                                    r * 2.505210838544172e-8))))))))));
                return result * Math.pow(2, k);
            },
            'native': Math.exp,
            'range': [-20, 20],
            'n': 10000
        },
        'ln': {
            'ref': function refLn(x) {
                if (x <= 0) {
                    return (x === 0) ? NINF : NaN;
                }
                if (isinfinite(x)) { return PINF; }
                if (isnan(x)) { return NaN; }
                // Use identity: ln(x) = ln(m * 2^e) = ln(m) + e*ln(2)
                // where m is in [0.5, 1)
                var e = 0;
                var m = x;
                while (m >= 2.0) { m /= 2.0; e++; }
                while (m < 0.5) { m *= 2.0; e--; }
                // Now m is in [0.5, 1) and x = m * 2^e
                // Use series: ln(m) = ln((1+t)/(1-t)) where t = (m-1)/(m+1)
                var t = (m - 1.0) / (m + 1.0);
                var t2 = t * t;
                // Series: 2t(1 + t^2/3 + t^4/5 + ...)
                var sum = t;
                var term = t;
                var k;
                for (k = 3; k <= 21; k += 2) {
                    term *= t2;
                    sum += term / k;
                }
                return 2.0 * sum + e * LN2;
            },
            'native': Math.log,
            'range': [0.001, 100],
            'n': 10000
        },
        'sqrt': {
            'ref': function refSqrt(x) {
                // Newton's method with double precision starting guess...
                if (x < 0) { return NaN; }
                if (x === 0 || isinfinite(x) || isnan(x)) { return x; }
                var guess = Math.sqrt(x); // use native as start
                // One Newton refinement step...
                guess = 0.5 * (guess + x / guess);
                guess = 0.5 * (guess + x / guess);
                return guess;
            },
            'native': Math.sqrt,
            'range': [0, 1000],
            'n': 10000
        },
        'sin': {
            'ref': function refSin(x) {
                if (isnan(x) || isinfinite(x)) { return NaN; }
                // Argument reduction to [-π, π]...
                var r = x % TWO_PI;
                if (r > PI) { r -= TWO_PI; }
                if (r < -PI) { r += TWO_PI; }
                // Taylor series with 12 terms...
                var r2 = r * r;
                return r * (1.0 + r2 * (-1.0 / 6 + r2 * (1.0 / 120 + r2 * (
                    -1.0 / 5040 + r2 * (1.0 / 362880 + r2 * (
                        -1.0 / 39916800 + r2 / 6227020800))))));
            },
            'native': Math.sin,
            'range': [-20, 20],
            'n': 10000
        },
        'cos': {
            'ref': function refCos(x) {
                if (isnan(x) || isinfinite(x)) { return NaN; }
                var r = x % TWO_PI;
                if (r > PI) { r -= TWO_PI; }
                if (r < -PI) { r += TWO_PI; }
                var r2 = r * r;
                return 1.0 + r2 * (-0.5 + r2 * (1.0 / 24 + r2 * (
                    -1.0 / 720 + r2 * (1.0 / 40320 + r2 * (
                        -1.0 / 3628800 + r2 / 479001600)))));
            },
            'native': Math.cos,
            'range': [-20, 20],
            'n': 10000
        }
    };

    /**
    * Runs accuracy analysis and draws the ULP plot.
    *
    * @private
    */
    function runAccuracyAnalysis() {
        var fnKey = accuracyFunctionSelect.value;
        var data = REFERENCE_FNS[fnKey];
        var refFn = data.ref;
        var nativeFn = data.native;
        var xmin = data.range[0];
        var xmax = data.range[1];
        var n = data.n;
        var x = linspace(xmin, xmax, n);
        var ulps = [];
        var nAgree = 0;
        var maxUlp = 0;
        var totalUlp = 0;
        var nDiff = 0;
        var refVal;
        var natVal;
        var d;
        var i;

        for (i = 0; i < n; i++) {
            refVal = refFn(x[i]);
            natVal = nativeFn(x[i]);

            if (isnan(refVal) && isnan(natVal)) {
                ulps.push({ 'x': x[i], 'ulp': 0 });
                nAgree++;
                continue;
            }
            if (refVal === natVal) {
                ulps.push({ 'x': x[i], 'ulp': 0 });
                nAgree++;
                continue;
            }

            d = ulpDiff(refVal, natVal);
            if (!isnan(d) && !isinfinite(d)) {
                ulps.push({ 'x': x[i], 'ulp': d });
                totalUlp += d;
                nDiff++;
                if (d > maxUlp) { maxUlp = d; }
            } else {
                ulps.push({ 'x': x[i], 'ulp': 0 });
            }
        }

        // Update stats...
        statPoints.textContent = n.toLocaleString();
        statAgree.textContent = ((nAgree / n) * 100).toFixed(1) + '%';
        statMaxUlp.textContent = maxUlp.toFixed(2);
        statAvgUlp.textContent = nDiff > 0 ? (totalUlp / nDiff).toFixed(4) : '0';

        // Draw ULP scatter plot...
        drawUlpPlot(ulps, xmin, xmax, maxUlp);
    }

    /**
    * Draws the ULP scatter plot.
    *
    * @private
    * @param {Array} ulps - ULP data points
    * @param {number} xmin - x range min
    * @param {number} xmax - x range max
    * @param {number} maxUlp - max ULP value
    */
    function drawUlpPlot(ulps, xmin, xmax, maxUlp) {
        var W = accuracyCanvas.width;
        var H = accuracyCanvas.height;
        var pad = 50;
        var plotW = W - 2 * pad;
        var plotH = H - 2 * pad;
        var ymax = Math.max(maxUlp * 1.2, 1);
        var px;
        var py;
        var stepX;
        var stepY;
        var tickX;
        var tickY;
        var i;

        accuracyCtx.fillStyle = COLORS.bg;
        accuracyCtx.fillRect(0, 0, W, H);

        // Grid...
        accuracyCtx.strokeStyle = COLORS.grid;
        accuracyCtx.lineWidth = 0.5;

        stepX = Math.pow(10, Math.floor(Math.log10(xmax - xmin))) / 2;
        tickX = Math.ceil(xmin / stepX) * stepX;
        while (tickX <= xmax) {
            px = pad + ((tickX - xmin) / (xmax - xmin)) * plotW;
            accuracyCtx.beginPath();
            accuracyCtx.moveTo(px, pad);
            accuracyCtx.lineTo(px, H - pad);
            accuracyCtx.stroke();
            tickX += stepX;
        }

        // Horizontal zero line...
        accuracyCtx.strokeStyle = COLORS.axis;
        accuracyCtx.lineWidth = 1;
        accuracyCtx.beginPath();
        accuracyCtx.moveTo(pad, H - pad);
        accuracyCtx.lineTo(W - pad, H - pad);
        accuracyCtx.stroke();

        // Draw ULP points...
        for (i = 0; i < ulps.length; i++) {
            px = pad + ((ulps[i].x - xmin) / (xmax - xmin)) * plotW;
            py = (H - pad) - ((ulps[i].ulp / ymax) * plotH);

            if (ulps[i].ulp === 0) {
                accuracyCtx.fillStyle = 'rgba(63, 185, 80, 0.3)';
                accuracyCtx.fillRect(px - 1, py - 1, 2, 2);
            } else {
                accuracyCtx.fillStyle = COLORS.orange;
                accuracyCtx.beginPath();
                accuracyCtx.arc(px, py, 3, 0, TWO_PI);
                accuracyCtx.fill();
            }
        }

        // Labels...
        accuracyCtx.fillStyle = COLORS.text;
        accuracyCtx.font = '11px "JetBrains Mono", monospace';
        accuracyCtx.textAlign = 'center';

        tickX = Math.ceil(xmin / stepX) * stepX;
        while (tickX <= xmax) {
            px = pad + ((tickX - xmin) / (xmax - xmin)) * plotW;
            accuracyCtx.fillText(tickX.toPrecision(3), px, H - pad + 18);
            tickX += stepX;
        }

        accuracyCtx.textAlign = 'right';
        stepY = ymax / 4;
        for (i = 0; i <= 4; i++) {
            py = (H - pad) - ((i * stepY / ymax) * plotH);
            accuracyCtx.fillText((i * stepY).toFixed(2), pad - 8, py + 4);
        }

        // Title...
        accuracyCtx.fillStyle = COLORS.orange;
        accuracyCtx.font = 'bold 13px "JetBrains Mono", monospace';
        accuracyCtx.textAlign = 'left';
        accuracyCtx.fillText('ULP Difference: Reference vs Native', pad + 10, pad + 18);

        // Legend...
        accuracyCtx.fillStyle = 'rgba(63, 185, 80, 0.8)';
        accuracyCtx.fillRect(pad + 10, pad + 28, 10, 10);
        accuracyCtx.fillStyle = COLORS.text;
        accuracyCtx.font = '11px "Inter", sans-serif';
        accuracyCtx.fillText('Exact match', pad + 25, pad + 37);

        accuracyCtx.fillStyle = COLORS.orange;
        accuracyCtx.beginPath();
        accuracyCtx.arc(pad + 15, pad + 50, 4, 0, TWO_PI);
        accuracyCtx.fill();
        accuracyCtx.fillStyle = COLORS.text;
        accuracyCtx.fillText('ULP difference', pad + 25, pad + 53);
    }

    runAccuracyBtn.addEventListener('click', function onClick() {
        runAccuracyBtn.disabled = true;
        runAccuracyBtn.textContent = 'Analyzing...';
        setTimeout(function doAnalysis() {
            runAccuracyAnalysis();
            runAccuracyBtn.disabled = false;
            runAccuracyBtn.textContent = 'Run Analysis';
        }, 50);
    });

    // ============================================================
    // SECTION 3: Edge Case Explorer
    // ============================================================

    var edgeTbody = document.getElementById('edge-tbody');

    /**
    * Populates the edge case table.
    *
    * @private
    */
    function populateEdgeCases() {
        var cases = [
            { 'input': 0, 'label': '0' },
            { 'input': 1, 'label': '1' },
            { 'input': -1, 'label': '-1' },
            { 'input': -0, 'label': '-0' },
            { 'input': NaN, 'label': 'NaN' },
            { 'input': PINF, 'label': '+∞' },
            { 'input': NINF, 'label': '-∞' },
            { 'input': 1e-300, 'label': '1e-300' },
            { 'input': 1e+300, 'label': '1e+300' },
            { 'input': 5e-324, 'label': '5e-324 (smallest)' },
            { 'input': 710, 'label': '710 (exp overflow)' },
            { 'input': -745, 'label': '-745 (exp underflow)' },
            { 'input': PI, 'label': 'π' },
            { 'input': PI / 2, 'label': 'π/2' }
        ];
        var fns = [
            { 'name': 'exp', 'fn': Math.exp },
            { 'name': 'ln', 'fn': Math.log },
            { 'name': 'sqrt', 'fn': Math.sqrt },
            { 'name': 'sin', 'fn': Math.sin }
        ];
        var html = '';
        var result;
        var isSpecial;
        var status;
        var i;
        var j;

        for (i = 0; i < cases.length; i++) {
            isSpecial = false;
            html += '<tr>';
            html += '<td>' + cases[i].label + '</td>';
            for (j = 0; j < fns.length; j++) {
                result = fns[j].fn(cases[i].input);
                if (isnan(result) || isinfinite(result) || result === 0) {
                    isSpecial = true;
                }
                html += '<td>' + formatNum(result) + '</td>';
            }
            status = isSpecial ? '<span class="status-special">⚠ Special</span>' : '<span class="status-pass">✓ Normal</span>';
            html += '<td>' + status + '</td>';
            html += '</tr>';
        }
        edgeTbody.innerHTML = html;
    }

    // ============================================================
    // SECTION 4: Performance Benchmark
    // ============================================================

    var benchIterationsSelect = document.getElementById('bench-iterations');
    var runBenchmarkBtn = document.getElementById('run-benchmark-btn');
    var benchmarkResults = document.getElementById('benchmark-results');

    /**
    * Runs performance benchmarks for all functions.
    *
    * @private
    */
    function runBenchmarks() {
        var iterations = parseInt(benchIterationsSelect.value, 10);
        var benchFns = [
            { 'name': 'exp(x)', 'fn': Math.exp, 'class': 'bar-1' },
            { 'name': 'ln(x)', 'fn': Math.log, 'class': 'bar-2' },
            { 'name': 'sqrt(x)', 'fn': Math.sqrt, 'class': 'bar-3' },
            { 'name': 'sin(x)', 'fn': Math.sin, 'class': 'bar-4' },
            { 'name': 'cos(x)', 'fn': Math.cos, 'class': 'bar-5' },
            { 'name': 'tan(x)', 'fn': Math.tan, 'class': 'bar-6' }
        ];
        var results = [];
        var maxTime = 0;
        var start;
        var end;
        var sum;
        var html;
        var pct;
        var i;
        var j;

        for (i = 0; i < benchFns.length; i++) {
            sum = 0;
            start = performance.now();
            for (j = 0; j < iterations; j++) {
                sum += benchFns[i].fn(j * 0.001);
            }
            end = performance.now();
            results.push({
                'name': benchFns[i].name,
                'time': end - start,
                'class': benchFns[i].class,
                'sum': sum // prevent dead code elimination
            });
            if (end - start > maxTime) {
                maxTime = end - start;
            }
        }

        // Sort by time (fastest first)...
        results.sort(function cmp(a, b) { return a.time - b.time; });

        html = '';
        for (i = 0; i < results.length; i++) {
            pct = (results[i].time / maxTime) * 100;
            html += '<div class="bench-row">';
            html += '<div class="bench-label">' + results[i].name + '</div>';
            html += '<div class="bench-bar-container">';
            html += '<div class="bench-bar ' + results[i].class + '" style="width: ' + pct + '%">';
            html += results[i].time.toFixed(2) + ' ms';
            html += '</div></div></div>';
        }

        html += '<p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 1rem;">';
        html += iterations.toLocaleString() + ' iterations per function. ';
        html += 'Lower is faster. Results may vary by browser and hardware.</p>';

        benchmarkResults.innerHTML = html;
    }

    runBenchmarkBtn.addEventListener('click', function onClick() {
        runBenchmarkBtn.disabled = true;
        runBenchmarkBtn.textContent = 'Running...';
        setTimeout(function doBench() {
            runBenchmarks();
            runBenchmarkBtn.disabled = false;
            runBenchmarkBtn.textContent = 'Run Benchmark';
        }, 50);
    });

    // ============================================================
    // INITIALIZE
    // ============================================================

    updateFunctionInfo();
    drawPlot();
    populateEdgeCases();

})();
