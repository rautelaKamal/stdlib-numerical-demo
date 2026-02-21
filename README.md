# stdlib Numerical Accuracy Explorer

> A comprehensive showcase demonstrating the power, precision, and robustness of [stdlib's][stdlib] mathematical functions through **interactive web visualizations**, accuracy comparisons, edge case testing, and performance benchmarking.

<div align="center">

**[🌐 Launch Web Demo](web/index.html)** · **[💻 Run CLI Demo](#cli-usage)** · **[📖 About stdlib](https://stdlib.io)**

</div>

---

## ✨ Features

This showcase consists of **two complementary demos**:

### 🌐 Interactive Web Explorer (`web/`)

A browser-based application with four interactive sections:

1. **📈 Interactive Function Plotter** — Real-time canvas-based plot with mouse crosshair tracking, 16 functions, adjustable ranges, and resolution control
2. **🔬 Accuracy Deep Dive** — ULP (Unit in the Last Place) scatter plot comparing reference vs native implementations across thousands of points
3. **⚡ IEEE 754 Edge Case Explorer** — Interactive table showing how functions handle NaN, ±Infinity, ±0, subnormals, overflow, and underflow
4. **⏱️ Performance Benchmark** — Measure and compare function evaluation speed with visual bar charts

**Functions available:** exp, exp2, expm1, ln, log2, log10, log1p, sqrt, cbrt, sin, cos, tan, sigmoid, gaussian, sinc, heaviside

### 💻 CLI Accuracy Tool (`index.js`)

A Node.js application that uses stdlib directly:

1. **Accuracy Comparison** — stdlib vs native `Math` using ULP analysis across 20,000+ test points
2. **Edge Case Testing** — 24 automated tests for IEEE 754 special value handling
3. **ASCII Visualization** — Terminal-based plots of exp, ln, sqrt, sigmoid, and gaussian

---

## Installation

```bash
git clone https://github.com/rautelaKamal/stdlib-numerical-demo.git
cd stdlib-numerical-demo
npm install
```

## Usage

### Web Demo

Simply open `web/index.html` in your browser:

```bash
open web/index.html
```

No build step required — it's a standalone HTML/CSS/JS application.

### CLI Usage

Run all demos:

```bash
node index.js
```

Or run individual modules:

```bash
node lib/compare.js       # Accuracy comparison (stdlib vs native)
node lib/edge_cases.js     # IEEE 754 edge case testing
node lib/ascii_plot.js     # ASCII function visualization
```

---

## What This Demonstrates

### stdlib Packages Used (CLI)

| Package | Purpose |
|---|---|
| `@stdlib/math/base/special/exp` | Exponential function |
| `@stdlib/math/base/special/ln` | Natural logarithm |
| `@stdlib/math/base/special/sqrt` | Square root |
| `@stdlib/math/base/special/abs` | Absolute value |
| `@stdlib/math/base/special/floor` | Floor function |
| `@stdlib/math/base/special/round` | Round function |
| `@stdlib/math/base/special/max` | Maximum of two values |
| `@stdlib/math/base/special/min` | Minimum of two values |
| `@stdlib/math/base/assert/is-nan` | NaN detection |
| `@stdlib/math/base/assert/is-infinite` | Infinity detection |
| `@stdlib/math/base/assert/is-positive-zero` | +0 detection |
| `@stdlib/math/base/assert/is-negative-zero` | -0 detection |
| `@stdlib/constants/float64/eps` | Machine epsilon |
| `@stdlib/constants/float64/pinf` | Positive infinity |
| `@stdlib/constants/float64/ninf` | Negative infinity |
| `@stdlib/constants/float64/max` | Largest float64 |
| `@stdlib/constants/float64/smallest-normal` | Smallest normal float64 |
| `@stdlib/array/linspace` | Evenly spaced array generation |

### Key Numerical Computing Concepts Demonstrated

- **ULP (Unit in the Last Place) analysis** — The standard measure for floating-point accuracy
- **IEEE 754 edge cases** — Proper handling of NaN, ±Infinity, ±0, subnormals
- **Catastrophic cancellation** — Why functions like `expm1` and `log1p` exist
- **Argument reduction** — Technique for computing functions over wide ranges
- **Overflow/underflow** — Boundary behavior at the limits of float64 representation
- **Polynomial approximation** — Horner-form evaluation for function computation

---

## Project Structure

```
stdlib-numerical-demo/
├── .gitignore
├── package.json
├── README.md
├── index.js                  # CLI main entry point
├── lib/
│   ├── compare.js            # CLI: Accuracy comparison (stdlib vs native)
│   ├── edge_cases.js         # CLI: IEEE 754 edge case testing
│   └── ascii_plot.js         # CLI: ASCII function visualization
└── web/
    ├── index.html            # Web: Interactive math explorer
    ├── styles.css            # Web: Modern dark-themed styles
    └── app.js                # Web: Interactive plotting engine
```

---

## Technical Highlights

### Accuracy Analysis Approach

The accuracy comparison uses **ULP (Unit in the Last Place)** measurement, which is the standard way to evaluate floating-point function accuracy in numerical computing:

```
ULP difference = |a - b| / (|a| × ε)
```

where `ε` is machine epsilon (`2.22e-16` for float64).

### Edge Case Coverage

Tests all critical IEEE 754 special values:

| Category | Values Tested |
|---|---|
| **Zeros** | +0, -0 |
| **Infinities** | +∞, -∞ |
| **Not-a-Number** | NaN |
| **Subnormals** | 5e-324 (smallest representable) |
| **Overflow boundary** | 710 (exp overflow), 1e+300 |
| **Underflow boundary** | -745 (exp underflow), 1e-300 |
| **Mathematical constants** | π, π/2, e |

### Web Demo Architecture

The web demo implements key numerical computing patterns from scratch, mirroring stdlib's approach:

- **Argument reduction** for computing exp(x) over wide ranges
- **Taylor series with Horner evaluation** for polynomial approximation
- **Range-based testing** with configurable resolution
- **Real-time canvas rendering** with interactive crosshair tracking

---

## About

Created as a showcase for [Google Summer of Code 2026][gsoc] with [stdlib][stdlib].

**Author:** Kamal Rautela ([@rautelaKamal](https://github.com/rautelaKamal))

### Related Contributions

- [PR #10196](https://github.com/stdlib-js/stdlib/pull/10196) — Heaviside C implementation (merged)
- [PR #10191](https://github.com/stdlib-js/stdlib/pull/10191) — exp2 port from OpenLibm (in review)

## License

This project is for educational and demonstration purposes.

[stdlib]: https://github.com/stdlib-js/stdlib
[gsoc]: https://summerofcode.withgoogle.com/
[ulp]: https://en.wikipedia.org/wiki/Unit_in_the_last_place