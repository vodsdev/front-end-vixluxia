self.addEventListener('message', (e) => {
  const { code, language } = e.data;

  // Simulate heavy syntax highlighting offloaded to a Web Worker
  // In a real-world scenario, you might use Shiki, Prism, or Highlight.js here
  let highlighted = code;

  if (code && typeof code === 'string') {
    // Very basic naive highlighting for demonstration purposes
    const keywords = ['import', 'from', 'export', 'function', 'const', 'let', 'var', 'return', 'if', 'else', 'async', 'await', 'use client', 'useState', 'useEffect', 'useRef'];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    
    // Escape HTML characters before injecting spans to prevent simple XSS
    highlighted = highlighted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Simulate basic syntax highlighting with CSS classes
    highlighted = highlighted.replace(keywordRegex, '<span class="text-blue-400">$1</span>');
    highlighted = highlighted.replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span class="text-green-400">$1</span>');
  }

  // Add artificial delay to simulate heavy computation
  setTimeout(() => {
    self.postMessage({ highlighted });
  }, 100);
});
