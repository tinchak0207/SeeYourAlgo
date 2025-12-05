# Quick Fix Checklist

A condensed checklist for implementing code review fixes. Check off items as you complete them.

---

## 🔴 CRITICAL - DO FIRST (Must complete before deployment)

### 1. Remove Bluebird Dependencies
- [ ] Remove `import Promise from 'bluebird'` from `src/apis/index.js`
- [ ] Remove `import Promise from 'bluebird'` from `src/components/App/index.js`
- [ ] Remove `import Promise from 'bluebird'` from `src/components/Header/index.js`
- [ ] Test: `npm start` works without errors

### 2. Fix Deprecated React Lifecycle Methods
- [ ] Replace `componentWillReceiveProps` with `componentDidUpdate` in `src/components/App/index.js`
- [ ] Replace `componentWillReceiveProps` with `componentDidUpdate` in `src/components/Navigator/index.js`
- [ ] Replace `componentWillReceiveProps` with `componentDidUpdate` in `src/components/Player/index.js`
- [ ] Replace `componentWillReceiveProps` with `componentDidUpdate` in `src/components/ToastContainer/index.js`
- [ ] Replace `componentWillReceiveProps` with `componentDidUpdate` in `src/components/VisualizationViewer/index.js`
- [ ] Test: No deprecation warnings in console

### 3. Fix Memory Leaks
- [ ] Add `componentWillUnmount` cleanup to `src/core/renderers/Renderer/index.js`
- [ ] Test: Drag operations don't leave event listeners

### 4. Add Error Boundaries
- [ ] Create `src/components/ErrorBoundary/index.js`
- [ ] Create `src/components/ErrorBoundary/ErrorBoundary.module.scss`
- [ ] Export ErrorBoundary from `src/components/index.js`
- [ ] Wrap App with ErrorBoundary in `src/index.js`
- [ ] Test: Error boundary catches and displays errors

---

## 🟡 HIGH PRIORITY (Should complete ASAP)

### 5. Security Fixes
- [ ] Add `noreferrer` to external links in `src/components/Button/index.js` (line 81)
- [ ] Test: External links have `rel="noopener noreferrer"`

### 6. Add PropTypes (Critical Components Only)
- [ ] Install: `npm install prop-types`
- [ ] Add PropTypes to `src/components/Button/index.js`
- [ ] Add PropTypes to `src/components/App/index.js`
- [ ] Add PropTypes to `src/components/Header/index.js`
- [ ] Add PropTypes to `src/components/Player/index.js`
- [ ] Test: PropTypes warnings show for invalid props

### 7. Basic Accessibility
- [ ] Change Button component from `<div>` to `<button>` in `src/components/Button/index.js`
- [ ] Add `aria-label` to navigation toggle in `src/components/Header/index.js`
- [ ] Add `aria-label` to action buttons in `src/components/Header/index.js`
- [ ] Add `role="navigation"` to Navigator component
- [ ] Add keyboard support (Tab, Enter, Space) to Button component
- [ ] Test: Tab navigation works, screen reader announces labels

### 8. Replace react-router-redux
- [ ] Run: `npm uninstall react-router-redux`
- [ ] Remove `routerReducer` import from `src/index.js`
- [ ] Remove `routing: routerReducer` from store
- [ ] Test: Routing still works

---

## 🟢 MEDIUM PRIORITY (Complete when time allows)

### 9. Fix React Keys
- [ ] Fix keys in Header title mapping (`src/components/Header/index.js`)
- [ ] Fix keys in TabContainer files mapping (`src/components/TabContainer/index.js`)
- [ ] Test: No React key warnings in console

### 10. Add Constants File
- [ ] Create `src/common/constants.js`
- [ ] Replace hardcoded timeout values
- [ ] Replace hardcoded error messages
- [ ] Replace hardcoded URLs
- [ ] Test: App functions the same with constants

### 11. Improve Error Handling
- [ ] Update `src/components/BaseComponent/index.js` to only log in development
- [ ] Add better error messages
- [ ] Test: Errors show user-friendly messages

---

## 🔵 CODE QUALITY (Nice to have)

### 12. Add Linting
- [ ] Run: `npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y`
- [ ] Create `.eslintrc.js`
- [ ] Add lint scripts to `package.json`
- [ ] Run: `npm run lint`
- [ ] Fix linting errors
- [ ] Test: `npm run lint` passes

### 13. Add Prettier
- [ ] Run: `npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier`
- [ ] Create `.prettierrc`
- [ ] Create `.prettierignore`
- [ ] Add format scripts to `package.json`
- [ ] Run: `npm run format`
- [ ] Test: Code is consistently formatted

### 14. Add Testing
- [ ] Run: `npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event`
- [ ] Create `src/setupTests.js`
- [ ] Write test for Button component
- [ ] Add test scripts to `package.json`
- [ ] Run: `npm test`
- [ ] Test: Tests pass

---

## Verification Commands

After each section, run these commands:

```bash
# Check for errors
npm start
# Open http://localhost:3000 and test functionality

# Check for warnings
# Open browser console - should be clean

# Check for security issues
npm audit

# Check for outdated packages
npm outdated
```

---

## Definition of Done

A fix is complete when:
- [ ] Code changes committed
- [ ] No console errors
- [ ] No console warnings
- [ ] Functionality tested manually
- [ ] Changes reviewed by teammate (if applicable)
- [ ] Documentation updated (if needed)

---

## Progress Tracking

**Started:** ___________  
**Phase 1 Complete:** ___________  
**Phase 2 Complete:** ___________  
**Phase 3 Complete:** ___________  
**Phase 4 Complete:** ___________  
**All Testing Complete:** ___________  
**Deployed to Production:** ___________  

---

## Notes Section

Use this space for any issues encountered or decisions made:

```
Date: _______
Issue: 
Resolution:

Date: _______
Issue:
Resolution:
```

---

## Quick Reference - Files by Task

**Bluebird removal:**
- `src/apis/index.js`
- `src/components/App/index.js`
- `src/components/Header/index.js`

**Lifecycle methods:**
- `src/components/App/index.js`
- `src/components/Navigator/index.js`
- `src/components/Player/index.js`
- `src/components/ToastContainer/index.js`
- `src/components/VisualizationViewer/index.js`

**Memory leaks:**
- `src/core/renderers/Renderer/index.js`

**Error boundary:**
- `src/components/ErrorBoundary/` (new directory)
- `src/components/index.js`
- `src/index.js`

**Security:**
- `src/components/Button/index.js`

**Accessibility:**
- `src/components/Button/index.js`
- `src/components/Header/index.js`
- `src/components/Navigator/index.js`

---

## Emergency Rollback

If something breaks:

```bash
# See what changed
git status
git diff

# Revert specific file
git checkout -- <filename>

# Revert all changes (CAREFUL!)
git reset --hard HEAD

# Go back to last commit
git reset --hard HEAD~1
```

---

## Help & Resources

- **Full audit:** See `CODE_REVIEW_AUDIT.md`
- **Detailed plan:** See `IMPLEMENTATION_PLAN.md`
- **React docs:** https://reactjs.org/docs
- **Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/
- **Testing:** https://testing-library.com/docs/react-testing-library/intro/

---

**Last Updated:** December 2024  
**Version:** 1.0
