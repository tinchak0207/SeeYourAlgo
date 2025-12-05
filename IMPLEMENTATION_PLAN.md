# Implementation Plan - Code Review Fixes

This document provides step-by-step instructions for fixing all issues identified in the code review audit.

---

## Phase 1: Critical Fixes (MUST FIX IMMEDIATELY)

### Task 1.1: Remove Bluebird Dependency
**Estimated Time:** 30 minutes  
**Risk:** Low  
**Files to modify:** 3

#### Steps:
1. **File: `src/apis/index.js`**
   ```diff
   - import Promise from 'bluebird';
   (Remove line 1)
   ```

2. **File: `src/components/App/index.js`**
   ```diff
   - import Promise from 'bluebird';
   (Remove line 4)
   ```

3. **File: `src/components/Header/index.js`**
   ```diff
   - import Promise from 'bluebird';
   (Remove line 6)
   ```

4. **Test:** Run `npm start` and verify no errors about missing 'bluebird' module

#### Verification:
```bash
npm start
# Should start without errors
```

---

### Task 1.2: Fix componentWillReceiveProps in App Component
**Estimated Time:** 45 minutes  
**Risk:** Medium  
**Files to modify:** 1

#### Steps:
**File: `src/components/App/index.js`**

Replace lines 66-76:
```javascript
// OLD (lines 66-76)
componentWillReceiveProps(nextProps) {
  const { params } = nextProps.match;
  const { search } = nextProps.location;
  if (params !== this.props.match.params || search !== this.props.location.search) {
    const { categoryKey, algorithmKey, gistId } = params;
    const { algorithm, scratchPaper } = nextProps.current;
    if (algorithm && algorithm.categoryKey === categoryKey && algorithm.algorithmKey === algorithmKey) return;
    if (scratchPaper && scratchPaper.gistId === gistId) return;
    this.loadAlgorithm(params, queryString.parse(search));
  }
}

// NEW (replace with)
componentDidUpdate(prevProps) {
  const { params } = this.props.match;
  const { search } = this.props.location;
  if (params !== prevProps.match.params || search !== prevProps.location.search) {
    const { categoryKey, algorithmKey, gistId } = params;
    const { algorithm, scratchPaper } = this.props.current;
    if (algorithm && algorithm.categoryKey === categoryKey && algorithm.algorithmKey === algorithmKey) return;
    if (scratchPaper && scratchPaper.gistId === gistId) return;
    this.loadAlgorithm(params, queryString.parse(search));
  }
}
```

---

### Task 1.3: Fix componentWillReceiveProps in Navigator Component
**Estimated Time:** 30 minutes  
**Risk:** Low  
**Files to modify:** 1

#### Steps:
**File: `src/components/Navigator/index.js`**

Replace lines 31-36:
```javascript
// OLD
componentWillReceiveProps(nextProps) {
  const { algorithm } = nextProps.current;
  if (algorithm) {
    this.toggleCategory(algorithm.categoryKey, true);
  }
}

// NEW
componentDidUpdate(prevProps) {
  const { algorithm } = this.props.current;
  const { algorithm: prevAlgorithm } = prevProps.current;
  if (algorithm && algorithm !== prevAlgorithm) {
    this.toggleCategory(algorithm.categoryKey, true);
  }
}
```

---

### Task 1.4: Fix componentWillReceiveProps in Player Component
**Estimated Time:** 30 minutes  
**Risk:** Medium  
**Files to modify:** 1

#### Steps:
**File: `src/components/Player/index.js`**

Replace lines 36-41:
```javascript
// OLD
componentWillReceiveProps(nextProps) {
  const { editingFile, shouldBuild } = nextProps.current;
  if (editingFile !== this.props.current.editingFile) {
    if (shouldBuild) this.build(editingFile);
  }
}

// NEW
componentDidUpdate(prevProps) {
  const { editingFile, shouldBuild } = this.props.current;
  if (editingFile !== prevProps.current.editingFile) {
    if (shouldBuild) this.build(editingFile);
  }
}
```

---

### Task 1.5: Fix componentWillReceiveProps in ToastContainer Component
**Estimated Time:** 30 minutes  
**Risk:** Low  
**Files to modify:** 1

#### Steps:
**File: `src/components/ToastContainer/index.js`**

Replace lines 8-13:
```javascript
// OLD
componentWillReceiveProps(nextProps) {
  const newToasts = nextProps.toast.toasts.filter(toast => !this.props.toast.toasts.includes(toast));
  newToasts.forEach(toast => {
    window.setTimeout(() => this.props.hideToast(toast.id), 3000);
  });
}

// NEW
componentDidUpdate(prevProps) {
  const newToasts = this.props.toast.toasts.filter(toast => !prevProps.toast.toasts.includes(toast));
  newToasts.forEach(toast => {
    window.setTimeout(() => this.props.hideToast(toast.id), 3000);
  });
}
```

---

### Task 1.6: Fix componentWillReceiveProps in VisualizationViewer Component
**Estimated Time:** 30 minutes  
**Risk:** Medium  
**Files to modify:** 1

#### Steps:
**File: `src/components/VisualizationViewer/index.js`**

Replace lines 27-33:
```javascript
// OLD
componentWillReceiveProps(nextProps) {
  const { chunks, cursor } = nextProps.player;
  const { chunks: oldChunks, cursor: oldCursor } = this.props.player;
  if (chunks !== oldChunks || cursor !== oldCursor) {
    this.update(chunks, cursor, oldChunks, oldCursor);
  }
}

// NEW
componentDidUpdate(prevProps) {
  const { chunks, cursor } = this.props.player;
  const { chunks: oldChunks, cursor: oldCursor } = prevProps.player;
  if (chunks !== oldChunks || cursor !== oldCursor) {
    this.update(chunks, cursor, oldChunks, oldCursor);
  }
}
```

---

### Task 1.7: Fix Memory Leaks in Renderer Component
**Estimated Time:** 20 minutes  
**Risk:** Low  
**Files to modify:** 1

#### Steps:
**File: `src/core/renderers/Renderer/index.js`**

Add componentWillUnmount after line 31:
```javascript
componentWillUnmount() {
  // Cleanup event listeners if they exist
  document.removeEventListener('mousemove', this.handleMouseMove);
  document.removeEventListener('mouseup', this.handleMouseUp);
}
```

---

### Task 1.8: Add Error Boundary Component
**Estimated Time:** 1 hour  
**Risk:** Low  
**Files to create:** 1, Files to modify:** 2

#### Steps:

1. **Create: `src/components/ErrorBoundary/index.js`**
```javascript
import React from 'react';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // TODO: Log to error reporting service (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error_boundary}>
          <div className={styles.error_content}>
            <h1>Oops! Something went wrong</h1>
            <p>We're sorry for the inconvenience. The application encountered an unexpected error.</p>
            <details className={styles.error_details}>
              <summary>Error details (for developers)</summary>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </details>
            <button onClick={this.handleReset} className={styles.reset_button}>
              Return to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

2. **Create: `src/components/ErrorBoundary/ErrorBoundary.module.scss`**
```scss
@import "~common/stylesheet/index";

.error_boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: $theme-dark;
  color: $color-font;
  padding: 2rem;

  .error_content {
    max-width: 600px;
    text-align: center;
    border: 2px solid $color-alert;
    padding: 2rem;
    background-color: $theme-normal;

    h1 {
      color: $color-alert;
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    p {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }

    .error_details {
      text-align: left;
      margin: 1.5rem 0;
      padding: 1rem;
      background-color: $theme-dark;
      border: 1px solid $color-font;
      max-height: 200px;
      overflow: auto;

      summary {
        cursor: pointer;
        font-weight: 600;
        margin-bottom: 0.5rem;
        
        &:hover {
          color: $color-selected;
        }
      }

      pre {
        font-size: 0.85rem;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }

    .reset_button {
      padding: 0.75rem 1.5rem;
      background-color: $color-selected;
      color: $color-font;
      border: 2px solid $color-selected;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: transparent;
        box-shadow: 0 0 8px $color-selected;
      }
    }
  }
}
```

3. **Update: `src/components/index.js`**
```javascript
// Add this export
export { default as ErrorBoundary } from './ErrorBoundary';
```

4. **Update: `src/index.js`**
```javascript
// Add import
import { ErrorBoundary } from 'components';

// Wrap App with ErrorBoundary (around line 13-22)
ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/scratch-paper/:gistId" component={App}/>
          <Route exact path="/:categoryKey/:algorithmKey" component={App}/>
          <Route path="/" component={App}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
```

---

## Phase 2: High Priority Fixes

### Task 2.1: Add Security Fixes (noreferrer)
**Estimated Time:** 30 minutes  
**Risk:** Low  
**Files to modify:** 1

#### Steps:
**File: `src/components/Button/index.js`**

Line 81, change:
```javascript
// OLD
<a rel="noopener" target="_blank" {...props} />

// NEW
<a rel="noopener noreferrer" target="_blank" {...props} />
```

---

### Task 2.2: Add PropTypes to Button Component (Example)
**Estimated Time:** 2 hours (for all components)  
**Risk:** Low  
**Files to modify:** All component files

#### Steps:
1. **Install prop-types:**
```bash
npm install prop-types
```

2. **Example for Button component (`src/components/Button/index.js`):**

Add after imports:
```javascript
import PropTypes from 'prop-types';
```

Add before export:
```javascript
Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  reverse: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  active: PropTypes.bool,
  confirmNeeded: PropTypes.bool,
  inProgress: PropTypes.bool,
};

Button.defaultProps = {
  reverse: false,
  selected: false,
  disabled: false,
  primary: false,
  active: false,
  confirmNeeded: false,
  inProgress: false,
};
```

3. **Repeat for all components** (list provided in audit document)

---

### Task 2.3: Basic Accessibility Improvements
**Estimated Time:** 3 hours  
**Risk:** Medium  
**Files to modify:** Multiple

#### Steps:

1. **Fix Button component to use semantic HTML:**

**File: `src/components/Button/index.js`**

Line 83 (and related logic):
```javascript
// OLD
return to ? (
  <Link {...props} />
) : href ? (
  <a rel="noopener noreferrer" target="_blank" {...props} />
) : (
  <div {...props} />
);

// NEW
return to ? (
  <Link {...props} />
) : href ? (
  <a rel="noopener noreferrer" target="_blank" {...props} />
) : (
  <button type="button" {...props} />
);
```

Update styles in `Button.module.scss` to handle button element styling.

2. **Add ARIA labels to interactive elements:**

**File: `src/components/Header/index.js`**

Line 122 (title bar button):
```javascript
<Button className={styles.title_bar} onClick={onClickTitleBar} 
        aria-label="Toggle navigation menu"
        aria-expanded={navigatorOpened}>
```

Lines 138-147 (action buttons):
```javascript
<Button icon={permitted ? faSave : faCodeBranch} primary disabled={permitted && saved}
        onClick={() => this.saveGist()}
        aria-label={permitted ? 'Save scratch paper' : 'Fork to your account'}>
  {permitted ? 'Save' : 'Fork'}
</Button>

<Button icon={faTrashAlt} primary onClick={() => this.deleteGist()} confirmNeeded
        aria-label="Delete scratch paper">
  Delete
</Button>

<Button icon={faFacebook} primary
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
        aria-label="Share on Facebook">
  Share
</Button>

<Button icon={faExpandArrowsAlt} primary
        onClick={() => this.handleClickFullScreen()}
        aria-label="Toggle fullscreen mode">
  Fullscreen
</Button>
```

3. **Add keyboard navigation support:**

**File: `src/components/Button/index.js`**

Add onKeyDown handler:
```javascript
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (onClick) onClick(e);
  }
};

// In props object:
props.onKeyDown = disabled ? null : handleKeyDown;
props.tabIndex = disabled ? -1 : 0;
```

4. **Add role attributes:**

**File: `src/components/Navigator/index.js`**

Line 82:
```javascript
<nav className={classes(styles.navigator, className)} role="navigation" aria-label="Algorithm categories">
```

Line 88:
```javascript
<div className={styles.algorithm_list} role="list">
```

---

### Task 2.4: Replace react-router-redux
**Estimated Time:** 2 hours  
**Risk:** Medium  
**Files to modify:** 2

#### Steps:

1. **Remove react-router-redux:**
```bash
npm uninstall react-router-redux
```

2. **Update `src/index.js`:**
```javascript
// Remove line 6:
// import { routerReducer } from 'react-router-redux';

// Update line 11:
const store = createStore(combineReducers({ ...reducers }));
// Remove routing: routerReducer
```

3. **Update routing state management:**
If you need routing in Redux, install connected-react-router:
```bash
npm install connected-react-router
```

Then follow connected-react-router setup instructions.

---

## Phase 3: Medium Priority Fixes

### Task 3.1: Fix React Keys
**Estimated Time:** 1 hour  
**Risk:** Low  
**Files to modify:** 4

#### Steps:

1. **File: `src/components/Header/index.js` (lines 124-131)**

Add proper keys to array elements:
```javascript
{
  titles.map((title, i) => (
    <React.Fragment key={`title-fragment-${i}`}>
      {scratchPaper && i === 1 ? (
        <AutosizeInput 
          className={styles.input_title} 
          value={title}
          onClick={e => e.stopPropagation()} 
          onChange={e => this.handleChangeTitle(e)}
        />
      ) : (
        <Ellipsis>{title}</Ellipsis>
      )}
      {i < titles.length - 1 && (
        <FontAwesomeIcon 
          className={styles.nav_arrow} 
          fixedWidth 
          icon={faAngleRight} 
        />
      )}
    </React.Fragment>
  ))
}
```

2. **File: `src/components/TabContainer/index.js` (lines 31-42)**

Use file.name as key instead of index:
```javascript
files.map((file) => file === editingFile ? (
  <div className={classes(styles.title, styles.selected)} 
       key={file.name}
       onClick={() => this.props.setEditingFile(file)}>
    {/* ... */}
  </div>
) : (
  <div className={styles.title} 
       key={file.name} 
       onClick={() => this.props.setEditingFile(file)}>
    {file.name}
  </div>
))
```

---

### Task 3.2: Add Constants File
**Estimated Time:** 30 minutes  
**Risk:** Low  
**Files to create:** 1, **Files to modify:** Multiple

#### Steps:

1. **Create: `src/common/constants.js`**
```javascript
// Timing constants
export const TOAST_DURATION = 3000;
export const CONFIRM_TIMEOUT = 2000;
export const ANIMATION_SPEED_BASE = 4000;

// Zoom constants
export const ZOOM_FACTOR = 1.01;
export const ZOOM_MAX = 20;
export const ZOOM_MIN = 1 / 20;

// GitHub API
export const GISTS_PER_PAGE = 100;

// Error messages
export const ERROR_MESSAGES = {
  SIGN_IN_REQUIRED: 'Sign In Required',
  ALGORITHM_NOT_FOUND: 'Algorithm Not Found',
  LANGUAGE_NOT_SUPPORTED: 'Language Not Supported',
};

// External URLs
export const URLS = {
  API_REFERENCE: 'https://github.com/algorithm-visualizer/algorithm-visualizer/wiki',
  GITHUB_REPO: 'https://github.com/algorithm-visualizer/algorithm-visualizer',
  ALGORITHM_VISUALIZER: 'https://algorithm-visualizer.org/',
};
```

2. **Update files to use constants** (search for hardcoded values and replace)

---

### Task 3.3: Improve Error Handling
**Estimated Time:** 1 hour  
**Risk:** Low  
**Files to modify:** 1

#### Steps:

**File: `src/components/BaseComponent/index.js`**

Replace entire file:
```javascript
import React from 'react';

class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
  }

  handleError(error) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }

    // Extract user-friendly error message
    let message = 'An unexpected error occurred';
    
    if (error.response) {
      const { data, statusText } = error.response;
      message = data 
        ? typeof data === 'string' 
          ? data 
          : JSON.stringify(data) 
        : statusText;
    } else if (error.message) {
      message = error.message;
    }

    // Show error toast to user
    this.props.showErrorToast(message);

    // TODO: In production, send to error tracking service
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error, { component: this.constructor.name });
    // }
  }
}

export default BaseComponent;
```

---

## Phase 4: Code Quality Improvements

### Task 4.1: Add ESLint Configuration
**Estimated Time:** 1 hour  
**Risk:** Low

#### Steps:

1. **Install dependencies:**
```bash
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

2. **Create `.eslintrc.js`:**
```javascript
module.exports = {
  extends: [
    'react-app',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: ['jsx-a11y'],
  rules: {
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/prop-types': 'warn',
  }
};
```

3. **Add lint script to package.json:**
```json
"scripts": {
  "lint": "eslint src/**/*.{js,jsx}",
  "lint:fix": "eslint src/**/*.{js,jsx} --fix"
}
```

---

### Task 4.2: Add Prettier Configuration
**Estimated Time:** 30 minutes  
**Risk:** Low

#### Steps:

1. **Install:**
```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

2. **Create `.prettierrc`:**
```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 100
}
```

3. **Create `.prettierignore`:**
```
build/
node_modules/
coverage/
*.min.js
```

4. **Add format script to package.json:**
```json
"scripts": {
  "format": "prettier --write \"src/**/*.{js,jsx,scss,css}\"",
  "format:check": "prettier --check \"src/**/*.{js,jsx,scss,css}\""
}
```

---

### Task 4.3: Add Testing Infrastructure
**Estimated Time:** 2 hours  
**Risk:** Low

#### Steps:

1. **Install dependencies:**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

2. **Create `src/setupTests.js`:**
```javascript
import '@testing-library/jest-dom';
```

3. **Create example test `src/components/Button/Button.test.js`:**
```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Button from './index';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as link when "to" prop is provided', () => {
    render(
      <BrowserRouter>
        <Button to="/test">Link Button</Button>
      </BrowserRouter>
    );
    expect(screen.getByText('Link Button').closest('a')).toHaveAttribute('href', '/test');
  });
});
```

4. **Add test scripts to package.json:**
```json
"scripts": {
  "test": "react-scripts test --coverage",
  "test:watch": "react-scripts test"
}
```

---

## Testing Checklist

After completing each phase, verify:

### Phase 1 Verification:
- [ ] App starts without errors
- [ ] No console warnings about deprecated lifecycle methods
- [ ] Navigation between algorithms works
- [ ] Error boundary shows when forcing error
- [ ] No memory leaks during drag operations

### Phase 2 Verification:
- [ ] PropTypes warnings show for invalid props
- [ ] External links open with noreferrer
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] ARIA labels are present (check with screen reader)
- [ ] Routing still works after removing react-router-redux

### Phase 3 Verification:
- [ ] No React key warnings in console
- [ ] Constants are imported and used correctly
- [ ] Error messages are user-friendly
- [ ] Errors only log in development mode

### Phase 4 Verification:
- [ ] `npm run lint` passes
- [ ] `npm run format` formats code
- [ ] `npm test` runs and passes
- [ ] Test coverage report generated

---

## Rollback Plan

If issues occur during implementation:

1. **Git is your friend:**
   ```bash
   git status
   git diff
   git checkout -- <file>  # Discard changes to specific file
   git reset --hard HEAD   # Discard all changes (careful!)
   ```

2. **Test incrementally:** Commit after each task completion

3. **Keep backups:** Before major refactors, create a branch:
   ```bash
   git checkout -b backup-before-refactor
   git checkout main
   ```

---

## Performance Optimization (Future)

After completing all fixes, consider:

1. **Code splitting:**
   - Lazy load routes
   - Lazy load algorithm visualizations

2. **Memoization:**
   - Wrap expensive computations in useMemo
   - Wrap callback functions in useCallback
   - Use React.memo for pure components

3. **Bundle analysis:**
   ```bash
   npm install --save-dev webpack-bundle-analyzer
   npm run build
   npx webpack-bundle-analyzer build/static/js/*.js
   ```

4. **Update React:**
   - Migrate to React 18
   - Use concurrent features
   - Implement Suspense boundaries

---

## Documentation Improvements (Future)

1. Add JSDoc comments to all functions
2. Create component documentation with Storybook
3. Update README with development guidelines
4. Add API documentation
5. Create architecture diagrams

---

## Success Criteria

All fixes are complete when:

✅ Zero console errors in development  
✅ Zero console errors in production  
✅ No deprecated React API warnings  
✅ Lighthouse accessibility score > 90  
✅ All lint rules pass  
✅ Test coverage > 70%  
✅ No high/critical security vulnerabilities (`npm audit`)  
✅ App works in latest Chrome, Firefox, Safari, Edge  

---

## Support

If you encounter issues during implementation:

1. Check React documentation: https://reactjs.org/docs
2. Check Redux documentation: https://redux.js.org
3. Search for similar issues on GitHub
4. Review the audit document for context

---

## Timeline Summary

- **Phase 1 (Critical):** 4-5 hours
- **Phase 2 (High Priority):** 8-10 hours  
- **Phase 3 (Medium Priority):** 3-4 hours
- **Phase 4 (Code Quality):** 4-5 hours

**Total Estimated Time:** 19-24 hours (3-4 days of focused work)

---

## Next Steps

1. Review this plan with the team
2. Create GitHub issues for each task
3. Assign tasks to developers
4. Set up project board to track progress
5. Schedule code review after each phase
6. Update this document as you learn more

Good luck! 🚀

