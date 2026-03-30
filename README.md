<h1 align="center">
  <br>
  <code>stdlib</code> Numerical Accuracy Explorer
  <br>
</h1>

<p align="center">
  <strong>A comprehensive showcase demonstrating the power, precision, and robustness of <a href="https://github.com/stdlib-js/stdlib">stdlib's</a> mathematical functions through interactive web visualizations, accuracy comparisons, edge case testing, and performance benchmarking.</strong>
</p>

<p align="center">
  <a href="#-interactive-web-explorer"><strong>🌐 Web Demo</strong></a> ·
  <a href="#-cli-accuracy-tool"><strong>💻 CLI Demo</strong></a> ·
  <a href="#-gsoc-2026--stdlib-contributions"><strong>🎓 GSoC 2026</strong></a> ·
  <a href="https://stdlib.io"><strong>📖 About stdlib</strong></a>
</p>

---

## Overview

This project provides **two complementary demos** that showcase [`stdlib`][stdlib]'s numerical computing capabilities — from ULP-level accuracy analysis to IEEE 754 edge-case handling and performance benchmarking.

| Component | Description |
|-----------|-------------|
| **Web Explorer** (`web/`) | Browser-based interactive app with 4 sections: function plotter, ULP scatter analysis, IEEE 754 edge-case table, and performance benchmarks |
| **CLI Tool** (`index.js`) | Node.js terminal demo with accuracy comparisons, 24+ edge-case tests, and ASCII visualizations |

---

## 🌐 Interactive Web Explorer

> Open `web/index.html` in any browser — **no build step required**.

A sleek dark-themed application with four interactive sections:

### 📈 Interactive Function Plotter
- Real-time **canvas-based** plotting with mouse crosshair tracking
- **22 functions** including: `exp`, `exp2`, `expm1`, `ln`, `log2`, `log10`, `log1p`, `sqrt`, `cbrt`, `sin`, `cos`, `tan`, `sigmoid`, `gaussian`, `sinc`, `erf`, `erfc`, `heaviside`, `lognormal.pdf`, `lognormal.cdf`, `poisson.entropy`
- Adjustable X-range, resolution slider (up to 2000 points), and display toggles (grid, axes, values)
- Rich function descriptions showing domain, range, and key identities

### 🔬 Accuracy Deep Dive
- **ULP (Unit in the Last Place) scatter plot** comparing reference vs native implementations
- Tests across **5,000 points** per function
- Summary cards showing: Points Tested, Exact Agreement %, Max ULP Diff, Avg ULP Diff

### ⚡ IEEE 754 Edge Case Explorer
- Interactive table showing behavior for: `NaN`, `±Infinity`, `±0`, subnormals, overflow (`710`), underflow (`-745`), mathematical constants (`π`, `π/2`, `e`)
- Color-coded status indicators: ✓ Normal, ⚠ Special, ⚡ Edge Case

### ⏱️ Performance Benchmark
- Configurable iteration count (default: 100,000)
- Visual bar chart comparing function evaluation speeds
- Results shown in milliseconds with hardware-dependent notes

---

## 💻 CLI Accuracy Tool

A Node.js terminal application that uses `stdlib` directly:

### Part 1 — Accuracy Comparison
Compares **stdlib vs native `Math`** using ULP analysis across **20,000+ test points**:
- `exp(x)` on `[-10, 10]` and `[-700, 700]` (near overflow/underflow)
- `ln(x)` on tiny positives `[1e-300, 0.1]` and `[0.001, 10]`
- `sqrt(x)` on `[0, 1000]`
- `erf(x)` on `[-3, 3]` (stdlib vs rational approximation)
- `heaviside(x)` on `[-5, 5]`
- `lognormal.cdf(x)` on `[0.01, 10]`
- `poisson.entropy(λ)` on `[1, 100]`

### Part 2 — Edge Case Testing
**24 automated tests** for IEEE 754 special value handling across `exp`, `ln`, `sqrt`, `erf`, `heaviside`, and `lognormal.cdf`.

### Part 3 — ASCII Visualization
Terminal-based plots of 8 functions: `exp`, `ln`, `sqrt`, `sigmoid`, `gaussian`, `erf`, `heaviside`, `lognormal.cdf`.

---

## 🚀 Getting Started

```bash
git clone https://github.com/rautelaKamal/stdlib-numerical-demo.git
cd stdlib-numerical-demo
npm install
```

### Web Demo
```bash
open web/index.html    # macOS
# or simply open web/index.html in your browser
```

### CLI Usage
```bash
node index.js                  # Run all 3 parts
node lib/compare.js            # Accuracy comparison only
node lib/edge_cases.js         # Edge case tests only
node lib/ascii_plot.js         # ASCII plots only
```

---

## 📦 stdlib Packages Used

### Core Math Functions
| Package | Purpose |
|---------|---------|
| `@stdlib/math/base/special/exp` | Exponential function |
| `@stdlib/math/base/special/ln` | Natural logarithm |
| `@stdlib/math/base/special/sqrt` | Square root |
| `@stdlib/math/base/special/abs` | Absolute value |
| `@stdlib/math/base/special/floor` | Floor function |
| `@stdlib/math/base/special/round` | Round function |
| `@stdlib/math/base/special/max` | Maximum of two values |
| `@stdlib/math/base/special/min` | Minimum of two values |
| `@stdlib/math/base/special/erf` | Error function |
| `@stdlib/math/base/special/erfc` | Complementary error function |
| `@stdlib/math/base/special/erfcx` | Scaled complementary error function |
| `@stdlib/math/base/special/log1p` | log(1+x) for small x |
| `@stdlib/math/base/special/heaviside` | Heaviside step function |

### Statistical Distributions
| Package | Purpose |
|---------|---------|
| `@stdlib/stats/base/dists/lognormal/cdf` | Lognormal CDF |
| `@stdlib/stats/base/dists/lognormal/logcdf` | Lognormal Log-CDF |
| `@stdlib/stats/base/dists/lognormal/logpdf` | Lognormal Log-PDF |
| `@stdlib/stats/base/dists/poisson/entropy` | Poisson entropy |
| `@stdlib/stats/base/dists/erlang/pdf` | Erlang PDF |

### Assertions & Constants
| Package | Purpose |
|---------|---------|
| `@stdlib/math/base/assert/is-nan` | NaN detection |
| `@stdlib/math/base/assert/is-infinite` | Infinity detection |
| `@stdlib/math/base/assert/is-positive-zero` | +0 detection |
| `@stdlib/math/base/assert/is-negative-zero` | -0 detection |
| `@stdlib/constants/float64/eps` | Machine epsilon (2.22e-16) |
| `@stdlib/constants/float64/pinf` | Positive infinity |
| `@stdlib/constants/float64/ninf` | Negative infinity |
| `@stdlib/constants/float64/max` | Largest float64 |
| `@stdlib/constants/float64/smallest-normal` | Smallest normal float64 |
| `@stdlib/constants/float64/min-safe-integer` | Minimum safe integer |
| `@stdlib/constants/float64/max-safe-integer` | Maximum safe integer |
| `@stdlib/array/linspace` | Evenly spaced array generation |

---

## 🧠 Key Numerical Computing Concepts

| Concept | Description |
|---------|-------------|
| **ULP Analysis** | Unit in the Last Place — the standard measure for floating-point accuracy |
| **IEEE 754 Edge Cases** | Proper handling of `NaN`, `±Infinity`, `±0`, subnormals |
| **Catastrophic Cancellation** | Why functions like `expm1` and `log1p` exist |
| **Argument Reduction** | Technique for computing functions over wide ranges |
| **Overflow/Underflow** | Boundary behavior at float64 limits |
| **Polynomial Approximation** | Horner-form evaluation for function computation |

### Accuracy Analysis Formula
```
ULP difference = |a - b| / (|a| × ε)
```
where `ε` is machine epsilon (`2.22e-16` for float64).

### Edge Case Coverage

| Category | Values Tested |
|----------|--------------|
| **Zeros** | `+0`, `-0` |
| **Infinities** | `+∞`, `-∞` |
| **Not-a-Number** | `NaN` |
| **Subnormals** | `5e-324` (smallest representable) |
| **Overflow boundary** | `710` (exp overflow), `1e+300` |
| **Underflow boundary** | `-745` (exp underflow), `1e-300` |
| **Mathematical constants** | `π`, `π/2`, `e` |

---

## 📁 Project Structure

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

## 🎓 GSoC 2026 — stdlib Contributions

Created as a showcase for [Google Summer of Code 2026][gsoc] with [stdlib][stdlib].

**Author:** [Kamal Rautela](https://github.com/rautelaKamal)

### 🚀 High-Impact C Implementations

| PR | Description | Status |
|----|-------------|--------|
| [#11201](https://github.com/stdlib-js/stdlib/pull/11201) | **C Implementation for F-Distribution PDF** — Pure C using N-API bindings, conforming to internal `stdlib` log-space subroutines. Achieved `~1e-15` relative errors against Julia & Boost C++ fixtures. | In Review (PoC) |
| [#10196](https://github.com/stdlib-js/stdlib/pull/10196) | Heaviside C implementation | ✅ Merged |

### 🏗️ Large-Scale Refactoring & Contributions

Extensive maintenance and refactoring of benchmark and test files across the `stats`, `math`, and `blas` ecosystems to conform to modern `stdlib` standards.

- **Total Contributions:** **54+ Merged**, 8+ In Review/Pending
- **String Interpolation Batches:** Numerous packages refactored to use modern format strings and comply with CI/CD linting across `discrete-uniform` and `blas`
- Examples: [#10832](https://github.com/stdlib-js/stdlib/pull/10832), [#10831](https://github.com/stdlib-js/stdlib/pull/10831), [#10830](https://github.com/stdlib-js/stdlib/pull/10830)

### 🤝 Community Engagement & Code Reviews

- [#10360](https://github.com/stdlib-js/stdlib/pull/10360) — Technical validation for Hypergeometric kurtosis
- [#10805](https://github.com/stdlib-js/stdlib/pull/10805) — Pinpointing ESLint fixes to unblock a contributor
- [#10806](https://github.com/stdlib-js/stdlib/pull/10806) — Identifying integer-overflow edge cases in C implementations

### 📉 Statistics & Tooling PRs (Merged)

- [#10465](https://github.com/stdlib-js/stdlib/pull/10465) — Refactored `stats/min-by` benchmarks
- [#10462](https://github.com/stdlib-js/stdlib/pull/10462) — Refactored `stats/nanmax-by` benchmarks
- [#10459](https://github.com/stdlib-js/stdlib/pull/10459) — Refactored `stats/maxsorted` benchmarks
- [#10457](https://github.com/stdlib-js/stdlib/pull/10457) — Refactored `stats/kstest` benchmarks
- [#10406](https://github.com/stdlib-js/stdlib/pull/10406) — Fixed EditorConfig lint errors in test fixtures
- [#10405](https://github.com/stdlib-js/stdlib/pull/10405) — Fixed JavaScript layout lint errors in benchmarks
- [#10404](https://github.com/stdlib-js/stdlib/pull/10404) — Fixed JavaScript layout lint errors in examples

### 🗺️ GSoC 2026 Proposal Roadmap

**Project:** *Comprehensive C-Ports of Probability Distributions & Special Functions*

| Phase | Timeline | Targets |
|-------|----------|---------|
| **Warm-up** | Weeks 1–2 | Finalize Lognormal/Erlang PRs; Valgrind/ASan validation |
| **Core Backlog** | Weeks 3–8 | Fréchet (RFC #3564), Laplace (#3691), Student's t (#3852), Logistic (#3692), Rayleigh (#3687), Binomial (#3464) |
| **Advanced** | Weeks 9–12 | Wald (Inverse Gaussian), Arcsine, Studentized Range (`qTukey`, RFC #3886) |

**Deliverables per distribution:** Pure C implementations (`.c`/`.h`), N-API wrappers, native benchmarks, and exact parity tests with JS reference implementations.

---

## 📄 License

This project is for educational and demonstration purposes.

<!-- Link references -->
[stdlib]: https://github.com/stdlib-js/stdlib
[gsoc]: https://summerofcode.withgoogle.com/
[ulp]: https://en.wikipedia.org/wiki/Unit_in_the_last_place
