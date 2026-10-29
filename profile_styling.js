/*
*HTML styling for the profile creation page.
*/  

const COLORS = { page: '#1f2a24', green: '#5b8c5a', border: '#bbb', error: '#c0392b', hint: '#777' };

function applyStyles() {
  const all = (selector) => [...document.querySelectorAll(selector)];
  // set(elements, { cssProperty: value }) writes the properties into each element's style
  const set = (elements, css) => elements.forEach((el) => Object.assign(el.style, css));

  set([document.body], {
    margin: '0', minHeight: '100vh', padding: '2rem 1rem', boxSizing: 'border-box',
    display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    background: COLORS.page, color: '#222',
  });
  set(all('main'), {
    width: '100%', maxWidth: '480px', padding: '1.75rem', boxSizing: 'border-box',
    background: '#fff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
  });
  set(all('h1'), { margin: '0 0 0.25rem' });
  set(all('h2'), { margin: '1.5rem 0 0.5rem', fontSize: '1.1rem' });
  set(all('.subtitle'), { margin: '0 0 1.5rem', color: '#555' });
  set(all('.field'), { marginBottom: '1.1rem' });
  set(all('label'), { display: 'block', fontWeight: '600', marginBottom: '0.3rem' });
  set(all('.optional'), { fontWeight: '400', color: COLORS.hint });

  set(all('input[type=text], input[type=number], textarea, select'), {
    width: '100%', padding: '0.6rem 0.7rem', boxSizing: 'border-box', font: 'inherit',
    border: `1px solid ${COLORS.border}`, borderRadius: '8px',
  });

  set(all('small'), { display: 'block', marginTop: '0.25rem', fontSize: '0.8rem' });
  set(all('.hint'), { color: COLORS.hint });
  set(all('[data-error-for]'), { color: COLORS.error, minHeight: '1em' });

  // NOTE: no "display" is set here on anything that uses the hidden attribute
  // (the picture preview, the remove button, the result section), because an
  // inline display value would override hidden and the element could never be hidden.
  // (setPicture() in create_profile.js sets the preview's display only while a picture is showing.)
  set(all('#picture-preview'), {
    width: '96px', height: '96px', margin: '0.6rem 0',
    objectFit: 'cover', borderRadius: '50%', border: `2px solid ${COLORS.green}`,
  });

  set(all('.actions'), { display: 'flex', gap: '0.75rem', marginTop: '1.5rem' });
  set(all('button'), {
    padding: '0.65rem 1.2rem', font: 'inherit', fontWeight: '600', color: '#fff',
    background: COLORS.green, border: 'none', borderRadius: '8px', cursor: 'pointer',
  });
  set(all('button.secondary'), { background: '#e4e4e4', color: '#333' });
  set(all('button.small'), { padding: '0.35rem 0.8rem', fontSize: '0.85rem' });

  set(all('pre'), {
    background: '#f4f4f4', padding: '1rem', borderRadius: '8px',
    overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
  });
}