// src/utils/codeHighlighter.js

/**
 * Safely syntax-highlights code snippets with HTML escaping and single-pass token replacement.
 * Handles keywords, strings, comments, common types, and numbers.
 */
export function highlightCode(rawCode) {
  if (!rawCode) return '';

  // 1. Escape HTML entities
  const escaped = rawCode
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Tokenize comments, strings, keywords, types, numbers in a single pass
  const tokenRegex = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b(?:import|public|private|protected|class|interface|enum|extends|implements|static|final|void|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|default|this|super|def|function|const|let|var|async|await|package)\b)|(\b(?:String|Integer|Double|Float|Boolean|List|Map|Set|ArrayList|LinkedList|HashMap|HashSet|TreeMap|TreeSet|Iterator|Deque|ArrayDeque|PriorityQueue|Object|System|Arrays|Collections|int|double|float|boolean|char|byte|short|long)\b)|(\b\d+(?:\.\d+)?\b)/g;

  return escaped.replace(tokenRegex, (match, comment, str, kw, type, num) => {
    if (comment) return `<span class="code-comment">${comment}</span>`;
    if (str) return `<span class="code-string">${str}</span>`;
    if (kw) return `<span class="code-keyword">${kw}</span>`;
    if (type) return `<span class="code-type">${type}</span>`;
    if (num) return `<span class="code-number">${num}</span>`;
    return match;
  });
}
