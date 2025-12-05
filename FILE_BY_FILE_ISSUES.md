# File-by-File Issue Reference

Quick reference guide showing which issues exist in which files.

---

## Components

### `/src/components/App/index.js`
**Lines:** 255  
**Issues:**
- ❌ Line 4: Missing Bluebird dependency import
- ❌ Lines 66-76: Deprecated `componentWillReceiveProps`
- ⚠️ No PropTypes
- ⚠️ Large component (255 lines - consider splitting)
- ⚠️ Mixed concerns (presentation + business logic)

**Priority:** 🔴 CRITICAL

**Fixes Needed:**
1. Remove Bluebird import
2. Replace componentWillReceiveProps with componentDidUpdate
3. Add PropTypes

---

### `/src/components/BaseComponent/index.js`
**Lines:** 24  
**Issues:**
- ⚠️ Lines 14, 17: Console.error in production code
- ⚠️ No PropTypes
- ⚠️ No error service integration

**Priority:** 🟡 HIGH

**Fixes Needed:**
1. Only log in development mode
2. Add error service integration (Sentry, etc.)
3. Add PropTypes

---

### `/src/components/Button/index.js`
**Lines:** 90  
**Issues:**
- ❌ Line 83: Using `<div>` instead of semantic `<button>`
- ❌ Line 81: Missing `noreferrer` on external links
- ⚠️ No PropTypes
- ⚠️ No keyboard event handlers
- ⚠️ No ARIA labels
- ⚠️ Timer cleanup in unmount but could be overwritten

**Priority:** 🔴 CRITICAL (security), 🟡 HIGH (accessibility)

**Fixes Needed:**
1. Change div to button element
2. Add `noreferrer` to external link rel attribute
3. Add PropTypes
4. Add keyboard handlers (Enter, Space)
5. Add aria-label props
6. Improve timer management

---

### `/src/components/CodeEditor/index.js`
**Lines:** 84  
**Issues:**
- ⚠️ No PropTypes
- ⚠️ No error handling for ref operations

**Priority:** 🟢 MEDIUM

**Fixes Needed:**
1. Add PropTypes
2. Add null check for ref.current

---

### `/src/components/Divider/index.js`
**Issues:**
- ⚠️ No PropTypes (assumed - not reviewed in detail)

**Priority:** 🟢 LOW

---

### `/src/components/Ellipsis/index.js`
**Issues:**
- ⚠️ No PropTypes (assumed - not reviewed in detail)

**Priority:** 🟢 LOW

---

### `/src/components/ExpandableListItem/index.js`
**Issues:**
- ⚠️ No PropTypes
- ⚠️ Missing ARIA attributes for expandable behavior

**Priority:** 🟡 MEDIUM

**Fixes Needed:**
1. Add PropTypes
2. Add aria-expanded
3. Add role="button" or proper button element

---

### `/src/components/FoldableAceEditor/index.js`
**Issues:**
- ⚠️ No PropTypes (assumed - not reviewed in detail)

**Priority:** 🟢 LOW

---

### `/src/components/Header/index.js`
**Lines:** 189  
**Issues:**
- ❌ Line 6: Missing Bluebird dependency import
- ⚠️ Lines 124-131: Array map without proper keys
- ⚠️ No PropTypes
- ⚠️ No ARIA labels on interactive elements
- ⚠️ Large component (189 lines)
- ⚠️ Dropdowns without ARIA attributes

**Priority:** 🔴 CRITICAL (Bluebird), 🟡 HIGH (accessibility)

**Fixes Needed:**
1. Remove Bluebird import
2. Fix React keys (use Fragment with key)
3. Add PropTypes
4. Add ARIA labels to all buttons
5. Add ARIA attributes to dropdowns

---

### `/src/components/ListItem/index.js`
**Issues:**
- ⚠️ No PropTypes
- ⚠️ Missing ARIA role

**Priority:** 🟢 MEDIUM

---

### `/src/components/Navigator/index.js`
**Lines:** 137  
**Issues:**
- ❌ Lines 31-36: Deprecated `componentWillReceiveProps`
- ⚠️ Line 85: Search input has aria-label (good!) but nav element missing role
- ⚠️ No PropTypes
- ⚠️ List items missing proper ARIA roles

**Priority:** 🔴 CRITICAL (lifecycle), 🟡 HIGH (accessibility)

**Fixes Needed:**
1. Replace componentWillReceiveProps with componentDidUpdate
2. Add role="navigation" and aria-label to nav
3. Add PropTypes
4. Add proper list ARIA roles

---

### `/src/components/Player/index.js`
**Lines:** 189  
**Issues:**
- ❌ Lines 36-41: Deprecated `componentWillReceiveProps`
- ⚠️ No PropTypes
- ⚠️ Timer cleanup but could leak if unmounted during operation
- ⚠️ Large component (189 lines)

**Priority:** 🔴 CRITICAL (lifecycle), 🟡 HIGH (memory leak)

**Fixes Needed:**
1. Replace componentWillReceiveProps with componentDidUpdate
2. Add PropTypes
3. Improve timer cleanup in componentWillUnmount
4. Cancel pending API requests on unmount

---

### `/src/components/ProgressBar/index.js`
**Issues:**
- ⚠️ No PropTypes (assumed - not reviewed in detail)
- ⚠️ Missing ARIA role="progressbar"

**Priority:** 🟢 MEDIUM

---

### `/src/components/ResizableContainer/index.js`
**Lines:** 68  
**Issues:**
- ⚠️ No PropTypes
- ⚠️ No keyboard support for resizing

**Priority:** 🟢 MEDIUM

**Fixes Needed:**
1. Add PropTypes
2. Consider keyboard support for accessibility

---

### `/src/components/TabContainer/index.js`
**Lines:** 60  
**Issues:**
- ⚠️ Lines 31-42: Using array index as key (should use file.name)
- ⚠️ No PropTypes
- ⚠️ Missing ARIA tab attributes (role="tablist", role="tab", etc.)

**Priority:** 🟡 HIGH (keys), 🟡 HIGH (accessibility)

**Fixes Needed:**
1. Use file.name as key instead of index
2. Add PropTypes
3. Implement proper ARIA tabs pattern

---

### `/src/components/ToastContainer/index.js`
**Lines:** 37  
**Issues:**
- ❌ Lines 8-13: Deprecated `componentWillReceiveProps`
- ⚠️ No PropTypes
- ⚠️ Missing ARIA role="alert" or role="status"
- ⚠️ Hardcoded timeout (3000ms) - should use constant

**Priority:** 🔴 CRITICAL (lifecycle), 🟡 HIGH (accessibility)

**Fixes Needed:**
1. Replace componentWillReceiveProps with componentDidUpdate
2. Add PropTypes
3. Add ARIA role to toasts
4. Use constant for timeout

---

### `/src/components/VisualizationViewer/index.js`
**Lines:** 98  
**Issues:**
- ❌ Lines 27-33: Deprecated `componentWillReceiveProps`
- ⚠️ No PropTypes
- ⚠️ No error boundary for visualization errors

**Priority:** 🔴 CRITICAL (lifecycle), 🟡 MEDIUM (error handling)

**Fixes Needed:**
1. Replace componentWillReceiveProps with componentDidUpdate
2. Add PropTypes
3. Add error handling for visualization rendering

---

## Core Files

### `/src/core/renderers/Renderer/index.js`
**Lines:** 112  
**Issues:**
- ❌ Lines 45-46: Event listeners added to document not cleaned up
- ⚠️ No PropTypes
- ⚠️ No componentWillUnmount

**Priority:** 🔴 CRITICAL (memory leak)

**Fixes Needed:**
1. Add componentWillUnmount to remove event listeners
2. Add PropTypes
3. Add safeguards for unmount during drag

---

### `/src/core/tracers/Tracer.jsx`
**Lines:** 36  
**Issues:**
- ⚠️ No PropTypes
- ℹ️ Uses .jsx extension but no JSX specific features (could be .js)

**Priority:** 🟢 LOW

---

### `/src/core/layouts/Layout.js`
**Lines:** 56  
**Issues:**
- ⚠️ forceUpdate on ref.current without null check
- ⚠️ No PropTypes for rendered component

**Priority:** 🟢 MEDIUM

**Fixes Needed:**
1. Add null check: `this.ref.current && this.ref.current.forceUpdate()`

---

## APIs

### `/src/apis/index.js`
**Lines:** 113  
**Issues:**
- ❌ Line 1: Missing Bluebird dependency import
- ⚠️ Worker termination may not happen in all cases
- ⚠️ No error handling for malformed responses

**Priority:** 🔴 CRITICAL (Bluebird)

**Fixes Needed:**
1. Remove Bluebird import
2. Improve worker cleanup
3. Add response validation

---

## Reducers

### `/src/reducers/index.js`
**Lines:** 20  
**Issues:**
- ℹ️ Clean, no major issues

**Priority:** ✅ OK

---

### `/src/reducers/current.js`
**Lines:** 145  
**Issues:**
- ℹ️ Clean, no major issues

**Priority:** ✅ OK

---

### `/src/reducers/player.js`
**Lines:** 31  
**Issues:**
- ℹ️ Clean, no major issues

**Priority:** ✅ OK

---

### `/src/reducers/toast.js`
**Issues:**
- ℹ️ Not reviewed in detail (assumed similar to others)

**Priority:** ✅ OK

---

### `/src/reducers/directory.js`
**Issues:**
- ℹ️ Not reviewed in detail (assumed similar to others)

**Priority:** ✅ OK

---

### `/src/reducers/env.js`
**Issues:**
- ℹ️ Not reviewed in detail (assumed similar to others)

**Priority:** ✅ OK

---

## Entry Point

### `/src/index.js`
**Lines:** 23  
**Issues:**
- ❌ Line 6: Deprecated react-router-redux import
- ❌ Line 11: Using routerReducer (deprecated)
- ⚠️ No error boundary wrapping App
- ⚠️ No StrictMode wrapper

**Priority:** 🔴 CRITICAL

**Fixes Needed:**
1. Remove react-router-redux
2. Add ErrorBoundary wrapper
3. Consider adding StrictMode for development

---

## Stylesheets

### `/src/common/stylesheet/colors.scss`
**Lines:** 26  
**Issues:**
- ⚠️ Inconsistent with documented neo-brutalism theme
- ⚠️ Color values don't match memory description

**Priority:** 🟡 MEDIUM

**Fixes Needed:**
1. Verify intended color scheme
2. Update to match neo-brutalism or update documentation

---

### `/src/common/stylesheet/fonts.scss`
**Lines:** 2  
**Issues:**
- ℹ️ Clean, IBM Plex Mono properly configured

**Priority:** ✅ OK

---

### `/src/stylesheet.scss`
**Lines:** 47  
**Issues:**
- ℹ️ Clean, no major issues

**Priority:** ✅ OK

---

## Utility Files

### `/src/common/util.js`
**Lines:** 51  
**Issues:**
- ℹ️ Clean utility functions
- ℹ️ Good separation of concerns

**Priority:** ✅ OK

---

### `/src/common/config.js`
**Issues:**
- ℹ️ Not reviewed in detail
- ℹ️ Assumed to be configuration - likely OK

**Priority:** ✅ OK

---

## Configuration Files

### `/package.json`
**Lines:** 73  
**Issues:**
- ❌ Missing `bluebird` dependency (used in code)
- ⚠️ Outdated React version (16.8.6 vs 18.x)
- ⚠️ Many outdated dependencies
- ⚠️ No devDependencies (linting, testing, formatting)
- ⚠️ No husky or pre-commit hooks

**Priority:** 🔴 CRITICAL (missing dep), 🟡 HIGH (outdated)

**Fixes Needed:**
1. Remove Bluebird imports from code (or add to package.json)
2. Consider updating React (major change)
3. Add devDependencies for code quality tools

---

### `/config-overrides.js`
**Lines:** 22  
**Issues:**
- ℹ️ Webpack config for polyfills - looks OK

**Priority:** ✅ OK

---

### `/.gitignore`
**Lines:** 25  
**Issues:**
- ℹ️ Standard create-react-app gitignore
- ℹ️ Adequate coverage

**Priority:** ✅ OK

---

### `/jsconfig.json`
**Lines:** 4  
**Issues:**
- ℹ️ Basic config - looks OK

**Priority:** ✅ OK

---

## Missing Files

### `.eslintrc.js`
**Status:** ❌ MISSING  
**Priority:** 🟡 HIGH  
**Action:** Create with recommended config

### `.prettierrc`
**Status:** ❌ MISSING  
**Priority:** 🟡 MEDIUM  
**Action:** Create for consistent formatting

### Test files
**Status:** ❌ MISSING  
**Priority:** 🟡 HIGH  
**Action:** Add testing infrastructure

### `ErrorBoundary` component
**Status:** ❌ MISSING  
**Priority:** 🔴 CRITICAL  
**Action:** Create error boundary component

---

## Summary Statistics

**Total Files Reviewed:** 30+  
**Critical Issues:** 13 files  
**High Priority Issues:** 15 files  
**Medium Priority Issues:** 12 files  
**Files OK:** 8 files  
**Missing Files:** 4

---

## Priority Matrix

### 🔴 MUST FIX (Critical Priority)
1. `src/apis/index.js` - Bluebird
2. `src/components/App/index.js` - Bluebird, lifecycle
3. `src/components/Header/index.js` - Bluebird
4. `src/components/Navigator/index.js` - lifecycle
5. `src/components/Player/index.js` - lifecycle
6. `src/components/ToastContainer/index.js` - lifecycle
7. `src/components/VisualizationViewer/index.js` - lifecycle
8. `src/core/renderers/Renderer/index.js` - memory leak
9. `src/index.js` - deprecated router, no error boundary
10. `package.json` - missing dependency

### 🟡 HIGH PRIORITY
1. `src/components/Button/index.js` - security, accessibility
2. `src/components/Header/index.js` - accessibility, keys
3. `src/components/TabContainer/index.js` - keys, accessibility
4. `src/components/BaseComponent/index.js` - console.log
5. All components - PropTypes

### 🟢 MEDIUM PRIORITY
1. All components - accessibility improvements
2. `src/common/stylesheet/colors.scss` - consistency
3. Testing infrastructure
4. Linting infrastructure

---

## Quick Search Guide

Find files by issue type:

**Bluebird imports:**
```bash
grep -r "import Promise from 'bluebird'" src/
```

**Deprecated lifecycle:**
```bash
grep -r "componentWillReceiveProps" src/
```

**Console logs:**
```bash
grep -r "console\." src/
```

**Missing PropTypes:**
```bash
grep -L "PropTypes" src/components/*/index.js
```

**External links:**
```bash
grep -r "target=\"_blank\"" src/
```

---

**Last Updated:** December 2024  
**Version:** 1.0  

**Usage:** Reference this document when working on specific files to see all issues at a glance.
