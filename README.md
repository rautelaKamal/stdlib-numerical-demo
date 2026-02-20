# stdlib Numerical Accuracy Explorer

> A showcase demonstrating the power, precision, and robustness of [stdlib's][stdlib] mathematical functions through accuracy comparisons, edge case testing, and ASCII visualizations.

## Motivation

JavaScript's built-in `Math` object provides basic mathematical functions, but they can vary in accuracy across environments and may not handle all IEEE 754 edge cases correctly. [stdlib][stdlib] provides carefully implemented alternatives with:

- **Guaranteed accuracy** across all platforms
- **Proper handling** of special values (NaN, ±Infinity, ±0, subnormals)
- **Extensive constants** for IEEE 754 floating-point arithmetic
- **Typed array utilities** for efficient numerical computation

This showcase explores these advantages through three interactive demos.

## Installation

```bash
git clone https://github.com/rautelaKamal/stdlib-numerical-demo.git
cd stdlib-numerical-demo
npm install
```

## Usage

Run all demos:

```bash
node index.js
```

Or run individual modules:

```bash
# Accuracy comparison: stdlib vs native Math
node lib/compare.js

# Edge case testing: NaN, Infinity, underflow, overflow
node lib/edge_cases.js

# ASCII function visualizations
node lib/ascii_plot.js
```

## What This Demonstrates

### Part 1: Accuracy Comparison

Compares stdlib functions against native JavaScript `Math` across thousands of test points, measuring accuracy in [ULPs][ulp] (Units in the Last Place):

- `exp(x)` vs `Math.exp(x)` — tested on standard and extreme ranges
- `ln(x)` vs `Math.log(x)` — tested on tiny, normal, and large inputs
- `sqrt(x)` vs `Math.sqrt(x)` — tested across positive reals

### Part 2: Edge Case Handling

Tests how stdlib correctly handles IEEE 754 special cases:

- **NaN propagation**: `exp(NaN) → NaN`, `ln(NaN) → NaN`
- **Infinity handling**: `exp(+∞) → +∞`, `exp(-∞) → 0`
- **Signed zero**: `sqrt(-0) → -0` (per IEEE 754)
- **Overflow/underflow**: `exp(710) → +∞`, `exp(-745) → 0`
- **Subnormal inputs**: `ln(5e-324)` handles denormalized numbers
- **Domain errors**: `ln(-1) → NaN`, `sqrt(-1) → NaN`

### Part 3: ASCII Visualizations

Renders function plots directly in the terminal using stdlib's array utilities:

- `exp(x)` — exponential growth
- `ln(x)` — natural logarithm
- `sqrt(x)` — square root
- `sigmoid(x) = 1/(1+exp(-x))` — built from stdlib's `exp`
- `gaussian(x) = exp(-x²)` — bell curve from stdlib's `exp`

## stdlib Packages Used

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

## Project Structure

```
stdlib-numerical-demo/
├── .gitignore
├── package.json
├── README.md
├── index.js              # Main entry point — runs all demos
└── lib/
    ├── compare.js        # Accuracy comparison (stdlib vs native)
    ├── edge_cases.js     # IEEE 754 edge case testing
    └── ascii_plot.js     # ASCII function visualization
```

## About

Created as a showcase for [Google Summer of Code 2026][gsoc] with [stdlib][stdlib].

**Author:** Kamal Rautela ([@rautelaKamal](https://github.com/rautelaKamal))

## License

This project is for educational and demonstration purposes.

[stdlib]: https://github.com/stdlib-js/stdlib
[gsoc]: https://summerofcode.withgoogle.com/
[ulp]: https://en.wikipedia.org/wiki/Unit_in_the_last_place