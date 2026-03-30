# C-Port Dependency Map — Target Distributions

> Tracking document for GSoC 2026: Native C implementations for probability distribution functions

## Legend

| Symbol | Meaning |
|---|---|
| ✅ | C implementation exists in stdlib |
| 🔄 | Open PR for C implementation |
| ❌ | No C implementation yet |
| ⬜ | Not required for this distribution |

---

## Distribution → Special Function Dependencies

| Distribution | Sub-function | Depends on | Dependency Status | Blocked? |
|---|---|---|---|---|
| **Fréchet** | pdf | `exp`, `ln`, `pow` | ✅ ✅ ✅ | **No** |
| | cdf | `exp`, `pow` | ✅ ✅ | **No** |
| | quantile | `ln`, `pow` | ✅ ✅ | **No** |
| | mean | `gamma` | ✅ | **No** |
| | variance | `gamma` | ✅ | **No** |
| | skewness | `gamma` | ✅ | **No** |
| | kurtosis | `gamma` | ✅ | **No** |
| | entropy | `ln`, `gamma` | ✅ ✅ | **No** |
| **Laplace** | pdf | `exp`, `abs` | ✅ ✅ | **No** |
| | cdf | `exp`, `abs` | ✅ ✅ | **No** |
| | quantile | `ln`, `abs` | ✅ ✅ | **No** |
| | logpdf | `abs` | ✅ | **No** |
| | logcdf | `exp`, `ln`, `abs` | ✅ ✅ ✅ | **No** |
| | mgf | `exp` | ✅ | **No** |
| | entropy | `ln` | ✅ | **No** |
| | mean/variance/skewness/kurtosis | (closed-form) | ✅ | **No** |
| **Logistic** | pdf | `exp` | ✅ | **No** |
| | cdf | `exp` | ✅ | **No** |
| | quantile | `ln` | ✅ | **No** |
| | logpdf | `ln`, `exp` | ✅ ✅ | **No** |
| | logcdf | `exp`, `ln` | ✅ ✅ | **No** |
| | entropy | (closed-form) | ✅ | **No** |
| | mean/variance/skewness/kurtosis | (closed-form) | ✅ | **No** |
| **Rayleigh** | pdf | `exp` | ✅ | **No** |
| | cdf | `exp` | ✅ | **No** |
| | quantile | `ln`, `sqrt` | ✅ ✅ | **No** |
| | logpdf | `ln` | ✅ | **No** |
| | logcdf | `exp`, `ln` | ✅ ✅ | **No** |
| | entropy | `ln`, `sqrt` | ✅ ✅ | **No** |
| | mean/variance/skewness/kurtosis | `sqrt`, `PI` | ✅ ✅ | **No** |
| **Student's t** | pdf | `betaln`, `ln`, `pow` | ✅ ✅ ✅ | **No** |
| | mean | (closed-form) | ✅ | **No** |
| | variance | (closed-form) | ✅ | **No** |
| | skewness | (closed-form) | ✅ | **No** |
| | kurtosis | (closed-form) | ✅ | **No** |
| | entropy | `betaln`, `digamma` | ✅ ✅ | **No** |
| | **cdf** | **`betainc`** | 🔄 [#4037](https://github.com/stdlib-js/stdlib/pull/4037) | **YES** |
| | **quantile** | **`kernel-betaincinv`** | 🔄 [#10279](https://github.com/stdlib-js/stdlib/pull/10279) | **YES** |
| **Binomial** | **pmf** | **`betainc`**, `betaln` | 🔄 ✅ | **YES** |
| | **cdf** | **`betainc`** | 🔄 [#4037](https://github.com/stdlib-js/stdlib/pull/4037) | **YES** |
| | **quantile** | **`betainc`** | 🔄 | **YES** |
| | mean/variance/skewness/kurtosis | (closed-form) | ✅ | **No** |
| | entropy | `betaln`, `ln` | ✅ ✅ | **No** |

---

## Blocker Summary

### Critical Blockers (must be resolved to unblock Student's t cdf/quantile + Binomial)

| Function | Status | PR | Author | Notes |
|---|---|---|---|---|
| `kernel-betainc` | 🔄 Open PR | [#10279](https://github.com/stdlib-js/stdlib/pull/10279) | @nirmaljb | Foundational for `betainc` |
| `betainc` | 🔄 Open PR | [#4037](https://github.com/stdlib-js/stdlib/pull/4037) | @Neerajpathak07 | Blocks Student's t cdf, Binomial cdf/pmf/quantile |
| `kernel-betaincinv` | ❌ No PR | — | — | Blocks Student's t quantile, Beta quantile |
| `gammaincinv` | ❌ No PR | — | — | Blocks Gamma quantile |

### Unblocked Distributions (ready to implement immediately)

| Distribution | All sub-functions unblocked? | Total packages |
|---|---|---|
| Fréchet | ✅ Yes | 8 |
| Laplace | ✅ Yes | 11 |
| Logistic | ✅ Yes | 10 |
| Rayleigh | ✅ Yes | 10 |
| Student's t | ⚠️ Partial (pdf, mean, var, skew, kurt, entropy = yes; cdf, quantile = blocked) | 6 unblocked / 2 blocked |
| Binomial | ⚠️ Partial (mean, var, skew, kurt, entropy = yes; pmf, cdf, quantile = blocked) | 5 unblocked / 3 blocked |

**Total unblocked packages: ~45**
**Total blocked packages: ~5**

---

## Scheduling Strategy

```
Community Bonding:  Contribute to #10279 (kernel-betainc) + #4037 (betainc)
Weeks 1-8:         Implement all UNBLOCKED distributions (Fréchet → Laplace → Logistic → Rayleigh)
Weeks 9-10:        Student's t (unblocked sub-functions first, cdf/quantile if betainc lands)
Week 11:           Buffer / review cycle
Week 12:           Final polish + submit
Stretch:           Binomial (if betainc resolved), betaprime, dagum
```
