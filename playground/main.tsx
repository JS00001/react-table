import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Import components from '../src' here when they are ready to preview.
function Playground() {
  return (
    <main>
      <p className="eyebrow">@sencorp/react-table</p>
      <h1>Component playground</h1>
      <p>Your library is ready for development.</p>
      <section aria-label="Component preview">
        <h2>Preview area</h2>
        <p>
          No table component yet. Add your component to src/components, export
          it from src/index.ts, and render it here to try it in the browser.
        </p>
      </section>
      <small>Edit playground/main.tsx to update this preview.</small>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
