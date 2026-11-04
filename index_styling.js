// styles the  profile showcase page

const INDEX_COLORS = { page: '#1f2a24', green: '#5b8c5a', line: '#222', hint: '#777', soft: '#f4f4f4' };


const NARROW_SCREEN = window.matchMedia('(max-width: 640px)');

function applyIndexStyles(root = document) {
  const all = (selector) => [...root.querySelectorAll(selector)];
  
  const set = (elements, css) => elements.forEach((el) => Object.assign(el.style, css));
  const narrow = NARROW_SCREEN.matches;

  
  if (root === document) {
    set([document.body], {
      margin: '0', minHeight: '100vh', padding: '2rem 1rem', boxSizing: 'border-box',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      background: INDEX_COLORS.page, color: '#222',
    });
  }
  set(all('main'), {
    width: '100%', maxWidth: '900px', padding: '1.75rem', boxSizing: 'border-box',
    background: '#fff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
  });
  set(all('h1'), { margin: '0 0 1rem' });
  set(all('#profileheader'), { margin: '0 0 0.75rem' });

  // ---------- the buttons and the preview lines under them ----------
  set(all('button'), {
    padding: '0.65rem 1.2rem', font: 'inherit', fontWeight: '600', color: '#fff',
    background: INDEX_COLORS.green, border: 'none', borderRadius: '8px',
    cursor: 'pointer', margin: '0.25rem 0.5rem 0 0',
  });
  set(all('#backbutton'), { background: '#e4e4e4', color: '#333' });
  set(all('#buttoninfouser1, #buttoninfouser2, #buttoninfouser3'), {
    color: INDEX_COLORS.hint, fontSize: '0.9rem', margin: '0.3rem 0 1.25rem',
  });

  // ---------- the profile layout: top (picture + username/age/gender) ----------
  set(all('.pl-profile'), { margin: '0 0 1.5rem' });
  set(all('.pl-top'), {
    display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap', marginBottom: '1.75rem',
  });
  set(all('.pl-avatar'), {
    width: '140px', height: '140px', flexShrink: '0', overflow: 'hidden', borderRadius: '50%',
    border: `3px solid ${INDEX_COLORS.line}`, background: INDEX_COLORS.green, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', fontWeight: '600',
  });
  set(all('.pl-avatar-img'), { width: '100%', height: '100%', objectFit: 'cover', display: 'block' });
  set(all('.pl-info'), { display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '1.3rem', minWidth: '0' });
  set(all('.pl-row'), { overflowWrap: 'anywhere' });
  set(all('.pl-label'), { fontWeight: '600', marginRight: '0.5rem' });

  // ---------- bio ----------
  set(all('.pl-bio'), { marginBottom: '1.75rem', fontSize: '1.1rem' });
  set(all('.pl-bio-text'), {
    marginTop: '0.4rem', padding: '0.75rem 1rem', minHeight: '5rem', fontSize: '1rem',
    border: `2px solid ${INDEX_COLORS.line}`, borderRadius: '10px', background: INDEX_COLORS.soft,
    whiteSpace: 'pre-wrap', overflowWrap: 'anywhere',
  });

  // ---------- chess info: two columns with a vertical line between them ----------
  set(all('.pl-chess'), {
    display: 'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 2px 1fr', gap: narrow ? '1rem' : '1.5rem',
  });
  set(all('.pl-divider'), {
    background: INDEX_COLORS.line,
    width: narrow ? 'auto' : '2px', height: narrow ? '2px' : 'auto',
  });
  set(all('.pl-chess-col'), { minWidth: '0' });
  set(all('.pl-chess-title'), { margin: '0 0 0.9rem', fontSize: '1.3rem' });
  set(all('.pl-chess-col .pl-row'), { fontSize: '1.05rem', marginBottom: '0.8rem' });
  set(all('.pl-empty'), { color: INDEX_COLORS.hint, fontStyle: 'italic' });
}

document.addEventListener('DOMContentLoaded', () => applyIndexStyles());
NARROW_SCREEN.addEventListener('change', () => applyIndexStyles()); // re-style when the window crosses the width limit