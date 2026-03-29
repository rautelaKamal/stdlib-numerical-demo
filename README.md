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

**Functions available:** exp, exp2, expm1, ln, log2, log10, log1p, sqrt, cbrt, sin, cos, tan, sigmoid, gaussian, sinc, erf, erfc, heaviside, lognormal.pdf, lognormal.cdf, poisson.entropy

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

| Package                                     | Purpose                        |
| ------------------------------------------- | ------------------------------ |
| `@stdlib/math/base/special/exp`             | Exponential function           |
| `@stdlib/math/base/special/ln`              | Natural logarithm              |
| `@stdlib/math/base/special/sqrt`            | Square root                    |
| `@stdlib/math/base/special/abs`             | Absolute value                 |
| `@stdlib/math/base/special/floor`           | Floor function                 |
| `@stdlib/math/base/special/round`           | Round function                 |
| `@stdlib/math/base/special/max`             | Maximum of two values          |
| `@stdlib/math/base/special/min`             | Minimum of two values          |
| `@stdlib/math/base/assert/is-nan`           | NaN detection                  |
| `@stdlib/math/base/assert/is-infinite`      | Infinity detection             |
| `@stdlib/math/base/assert/is-positive-zero` | +0 detection                   |
| `@stdlib/math/base/assert/is-negative-zero` | -0 detection                   |
| `@stdlib/constants/float64/eps`             | Machine epsilon                |
| `@stdlib/constants/float64/pinf`            | Positive infinity              |
| `@stdlib/constants/float64/ninf`            | Negative infinity              |
| `@stdlib/constants/float64/max`             | Largest float64                |
| `@stdlib/constants/float64/smallest-normal` | Smallest normal float64        |
| `@stdlib/math/base/special/heaviside`       | Heaviside step function        |
| `@stdlib/stats/base/dists/lognormal/cdf`    | Lognormal CDF                  |
| `@stdlib/stats/base/dists/lognormal/logpdf` | Lognormal LogPDF               |
| `@stdlib/stats/base/dists/poisson/entropy`  | Poisson entropy                |
| `@stdlib/array/linspace`                    | Evenly spaced array generation |

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

| Category                   | Values Tested                   |
| -------------------------- | ------------------------------- |
| **Zeros**                  | +0, -0                          |
| **Infinities**             | +∞, -∞                          |
| **Not-a-Number**           | NaN                             |
| **Subnormals**             | 5e-324 (smallest representable) |
| **Overflow boundary**      | 710 (exp overflow), 1e+300      |
| **Underflow boundary**     | -745 (exp underflow), 1e-300    |
| **Mathematical constants** | π, π/2, e                       |

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

#### 🚀 High-Impact C Implementations (Hard PRs)

- **[PR #11201](https://github.com/stdlib-js/stdlib/pull/11201) — C Implementation for F-Distribution PDF (In Review / Proof of Concept)**
  *Successfully implemented a core statistical distribution in pure C using N-API bindings, conforming precisely to internal `stdlib` mathematical log-space subroutines. Achieved theoretical floating-point precision parity against thousands of Julia & Boost C++ numerical fixtures (`~1e-15` relative errors).*
- [PR #10837](https://github.com/stdlib-js/stdlib/pull/10837) — C implementation for `stats/base/dists/chi/kurtosis` (Merged)
- [PR #10836](https://github.com/stdlib-js/stdlib/pull/10836) — C implementation for `stats/base/dists/chi/skewness` (Merged)
- [PR #10809](https://github.com/stdlib-js/stdlib/pull/10809) — C implementation for Log-normal CDF (In Review)
- [PR #10196](https://github.com/stdlib-js/stdlib/pull/10196) — Heaviside C implementation (Merged)

#### 🏗️ Large-Scale Refactoring & Contributions (95+ PRs)

Extensive maintenance and refactoring of benchmark and test files across the `stats`, `math`, and `blas` ecosystems to conform to modern `stdlib` standards.

- **Total Contributions:** **75+ Merged**, 20+ In Review/Pending.
- **Massive String Interpolation Batches:** Over 30+ packages thoroughly refactored to strictly use modern format strings and comply with automated CI/CD linting requirements across `discrete-uniform` and `blas`.
- Examples: [PR #10832](https://github.com/stdlib-js/stdlib/pull/10832), [PR #10831](https://github.com/stdlib-js/stdlib/pull/10831), [PR #10830](https://github.com/stdlib-js/stdlib/pull/10830).

#### 🤝 Community Engagement & Code Reviews

Proactively reviewing competitor PRs and helping the community unblock CI hurdles.

- [PR #10360](https://github.com/stdlib-js/stdlib/pull/10360) — Providing technical validation for Hypergeometric kurtosis.
- [PR #10805](https://github.com/stdlib-js/stdlib/pull/10805) — Pinpointing exact Lint/ESLint fixes to help a contributor pass CI.
- [PR #10806](https://github.com/stdlib-js/stdlib/pull/10806) — Identifying complex integer-overflow edge cases in C implementations.

#### 📉 Previous Statistics Refactoring (Merged)

- [PR #10465](https://github.com/stdlib-js/stdlib/pull/10465) — Refactored `stats/min-by` benchmarks
- [PR #10462](https://github.com/stdlib-js/stdlib/pull/10462) — Refactored `stats/nanmax-by` benchmarks
- [PR #10459](https://github.com/stdlib-js/stdlib/pull/10459) — Refactored `stats/maxsorted` benchmarks
- [PR #10457](https://github.com/stdlib-js/stdlib/pull/10457) — Refactored `stats/kstest` benchmarks

#### 🛠️ Tooling & Lint Fixes

- [PR #10406](https://github.com/stdlib-js/stdlib/pull/10406) — Fixed EditorConfig lint errors in test fixtures (merged)
- [PR #10405](https://github.com/stdlib-js/stdlib/pull/10405) — Fixed JavaScript layout lint errors in benchmarks (merged)
- [PR #10404](https://github.com/stdlib-js/stdlib/pull/10404) — Fixed JavaScript layout lint errors in examples (merged)

## License

This project is for educational and demonstration purposes.

[stdlib]: https://github.com/stdlib-js/stdlib
[gsoc]: https://summerofcode.withgoogle.com/
[ulp]: https://en.wikipedia.org/wiki/Unit_in_the_last_place
