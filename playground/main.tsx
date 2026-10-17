import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function Playground() {
  return <main></main>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
