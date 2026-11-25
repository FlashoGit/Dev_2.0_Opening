// styles the profile showcase page (index.html) and the profile layout (profile_layout.js)
// Same dark look as the game chat and the profile form: navy gradient page, dark panel, blue buttons.
// There is no CSS here: every style is written into the elements with JavaScript.
//
// applyIndexStyles()           styles the whole page (runs when the page has loaded)
// applyIndexStyles(container)  styles only what is inside a container (profile_layout.js calls this
//                              after it draws a profile, because those elements are created later)
//
// NOTE: button.js turns the buttons, the "Profiles:" header and the preview lines on and off by
// setting style.display itself, so this file never sets "display" on those elements.

const INDEX_COLORS = {
  text: '#eef2ff', hint: '#afbbd8', label: '#c6d0eb',
  panel: '#151d34', panelLine: '#35415e', field: '#0b1226', line: '#445171',
  blue: '#6b88ff', blueText: '#09132c', quiet: '#263453', quietLine: '#465576', quietText: '#dce5ff',
};

// below this width the two chess columns stack on top of each other
const NARROW_SCREEN = window.matchMedia('(max-width: 640px)');

function applyIndexStyles(root = document) {
  const all = (selector) => [...root.querySelectorAll(selector)];
  // set(elements, { cssProperty: value }) writes the properties into each element's style
  const set = (elements, css) => elements.forEach((el) => Object.assign(el.style, css));
  const narrow = NARROW_SCREEN.matches;

  // ---------- the page ----------
  if (root === document) {
    document.documentElement.style.colorScheme = 'dark';
    // the gradient goes on the whole page (<html>) so it also covers the area below a long page
    document.documentElement.style.background = 'radial-gradient(circle at 0 0, #202a56 0, #10162b 44%, #090e1d 100%)';
    document.documentElement.style.minHeight = '100%';
    set([document.body], {
      margin: '0', minHeight: '100vh', padding: '2rem 1rem', boxSizing: 'border-box',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      color: INDEX_COLORS.text,
    });
  }
  set(all('main'), {
    width: '100%', maxWidth: '900px', padding: '1.5rem', boxSizing: 'border-box',
    background: INDEX_COLORS.panel, border: `1px solid ${INDEX_COLORS.panelLine}`,
    borderRadius: '18px', boxShadow: '0 12px 35px rgba(6, 9, 23, 0.33)',
  });
  set(all('h1'), { margin: '0 0 1rem', fontSize: '2rem', letterSpacing: '-0.035em' });
  set(all('#profileheader'), { margin: '0 0 0.75rem' });

  // ---------- the buttons and the preview lines under them ----------
  set(all('button'), {
    padding: '0.7rem 1.1rem', font: 'inherit', fontWeight: '700',
    color: INDEX_COLORS.blueText, background: INDEX_COLORS.blue, border: 'none', borderRadius: '10px',
    cursor: 'pointer', margin: '0.25rem 0.5rem 0 0',
  });
  set(all('#backbutton'), {
    background: INDEX_COLORS.quiet, color: INDEX_COLORS.quietText, border: `1px solid ${INDEX_COLORS.quietLine}`,
  });
  set(all('a'), { textDecoration: 'none', color: INDEX_COLORS.blue });
  set(all('[id^="buttoninfouser"]'), {
    color: INDEX_COLORS.hint, fontSize: '0.9rem', margin: '0.3rem 0 1.25rem',
  });
  // buttons get a little brighter when the mouse is over them
  all('button').forEach((el) => {
    el.addEventListener('mouseenter', () => { el.style.filter = 'brightness(1.12)'; });
    el.addEventListener('mouseleave', () => { el.style.filter = 'none'; });
  });

  // ---------- the profile layout: top (picture + username/age/gender) ----------
  set(all('.pl-profile'), { margin: '0 0 1.5rem' });
  set(all('.pl-top'), {
    display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap', marginBottom: '1.75rem',
  });
  set(all('.pl-avatar'), {
    width: '140px', height: '140px', flexShrink: '0', overflow: 'hidden', borderRadius: '50%',
    border: `3px solid ${INDEX_COLORS.blue}`, background: INDEX_COLORS.quiet, color: INDEX_COLORS.quietText,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', fontWeight: '600',
  });
  set(all('.pl-avatar-img'), { width: '100%', height: '100%', objectFit: 'cover', display: 'block' });
  set(all('.pl-info'), { display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '1.3rem', minWidth: '0' });
  set(all('.pl-row'), { overflowWrap: 'anywhere' });
  set(all('.pl-label'), { fontWeight: '600', marginRight: '0.5rem', color: INDEX_COLORS.label });

  // ---------- bio ----------
  set(all('.pl-bio'), { marginBottom: '1.75rem', fontSize: '1.1rem' });
  set(all('.pl-bio-text'), {
    marginTop: '0.4rem', padding: '0.75rem 1rem', minHeight: '5rem', fontSize: '1rem',
    border: `1px solid ${INDEX_COLORS.line}`, borderRadius: '10px', background: INDEX_COLORS.field,
    whiteSpace: 'pre-wrap', overflowWrap: 'anywhere',
  });

  // ---------- chess info: two columns with a vertical line between them ----------
  set(all('.pl-chess'), {
    display: 'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 2px 1fr', gap: narrow ? '1rem' : '1.5rem',
  });
  set(all('.pl-divider'), {
    background: INDEX_COLORS.panelLine,
    width: narrow ? 'auto' : '2px', height: narrow ? '2px' : 'auto',
  });
  set(all('.pl-chess-col'), { minWidth: '0' });
  set(all('.pl-chess-title'), { margin: '0 0 0.9rem', fontSize: '1.3rem' });
  set(all('.pl-chess-col .pl-row'), { fontSize: '1.05rem', marginBottom: '0.8rem' });
  set(all('.pl-empty'), { color: INDEX_COLORS.hint, fontStyle: 'italic' });
}

document.addEventListener('DOMContentLoaded', () => applyIndexStyles());
NARROW_SCREEN.addEventListener('change', () => applyIndexStyles()); // re-style when the window crosses the width limit