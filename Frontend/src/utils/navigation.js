// src/utils/navigation.js

/**
 * Smart back navigation utility.
 * Checks whether the user has in-app navigation history.
 * If yes, executes navigate(-1).
 * If accessed directly or at the root of app history, falls back to the safe contextual fallbackPath.
 */
export function executeSmartBack(navigate, fallbackPath = '/') {
  try {
    // In React Router / HTML5 History, window.history.state has an 'idx' counter.
    // If idx > 0, an in-app prior entry exists in this session.
    const hasHistory = window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0;
    
    // Check sessionStorage internal stack as well
    const internalHistory = JSON.parse(sessionStorage.getItem('vcs_nav_history') || '[]');
    const hasInternalHistory = Array.isArray(internalHistory) && internalHistory.length > 1;

    if (hasHistory || hasInternalHistory) {
      navigate(-1);
    } else {
      navigate(fallbackPath, { replace: true });
    }
  } catch (e) {
    navigate(fallbackPath, { replace: true });
  }
}

/**
 * Record current pathname in internal session history.
 */
export function recordNavPath(pathname) {
  try {
    const raw = sessionStorage.getItem('vcs_nav_history');
    let stack = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(stack)) stack = [];

    // Avoid duplicate adjacent entries
    if (stack[stack.length - 1] !== pathname) {
      stack.push(pathname);
      // Keep reasonable size
      if (stack.length > 30) stack.shift();
      sessionStorage.setItem('vcs_nav_history', JSON.stringify(stack));
    }
  } catch (e) {}
}
