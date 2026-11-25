/*
*HTML styling for the profile creation page.
*Same dark look as the game chat (game-chat.js): navy gradient page, dark panel, blue buttons.
*There is no CSS here: every style is written into the elements with JavaScript.
*/

// bio_data.js uses COLORS.border and COLORS.error, so keep those two names.
const COLORS = {
  border: '#445171',   // normal border of the input boxes
  error: '#fc7888',    // red for error text and the border of a box with an error
  hint: '#afbbd8',     // small grey-blue help text
  text: '#eef2ff',     // main text
  label: '#c6d0eb',    // labels above the boxes
  panel: '#151d34',    // the card
  panelLine: '#35415e',// thin lines around the card
  field: '#0b1226',    // inside of the input boxes
  blue: '#6b88ff',     // main buttons
  blueText: '#09132c', // text on the blue buttons
  quiet: '#263453',    // second-choice buttons
  quietLine: '#465576',
  quietText: '#dce5ff',
  focus: '#7f9fff',
};

function applyStyles() {
  const all = (selector) => [...document.querySelectorAll(selector)];
  // set(elements, { cssProperty: value }) writes the properties into each element's style
  const set = (elements, css) => elements.forEach((el) => Object.assign(el.style, css));

  // tells the browser the page is dark, so the dropdown list, file button and scrollbars match
  document.documentElement.style.colorScheme = 'dark';

  set([document.body], {
    margin: '0', minHeight: '100vh', padding: '2rem 1rem', boxSizing: 'border-box',
    display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    color: COLORS.text,
  });
  // the gradient goes on the whole page (<html>) so it also covers the area below a long form
  document.documentElement.style.background = 'radial-gradient(circle at 0 0, #202a56 0, #10162b 44%, #090e1d 100%)';
  document.documentElement.style.minHeight = '100%';
  set(all('main'), {
    width: '100%', maxWidth: '480px', padding: '1.5rem', boxSizing: 'border-box',
    background: COLORS.panel, border: `1px solid ${COLORS.panelLine}`,
    borderRadius: '18px', boxShadow: '0 12px 35px rgba(6, 9, 23, 0.33)',
  });
  set(all('h1'), { margin: '0 0 0.25rem', fontSize: '1.9rem', letterSpacing: '-0.035em' });
  set(all('h2'), { margin: '1.5rem 0 0.5rem', fontSize: '1.1rem' });
  set(all('.subtitle'), { margin: '0 0 1.5rem', color: COLORS.hint });
  set(all('.field'), { marginBottom: '1.1rem' });
  set(all('label'), {
    display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.4rem', color: COLORS.label,
  });
  set(all('.optional'), { fontWeight: '400', color: COLORS.hint });

  const boxes = all('input[type=text], input[type=number], textarea, select');
  set(boxes, {
    width: '100%', padding: '0.7rem 0.8rem', boxSizing: 'border-box', font: 'inherit',
    background: COLORS.field, color: '#fff', outline: 'none',
    border: `1px solid ${COLORS.border}`, borderRadius: '10px',
  });
  // a soft blue ring around the box you are typing in
  boxes.forEach((box) => {
    box.addEventListener('focus', () => { box.style.boxShadow = '0 0 0 2px rgba(127, 159, 255, 0.35)'; });
    box.addEventListener('blur', () => { box.style.boxShadow = 'none'; });
  });
  set(all('input[type=file]'), { maxWidth: '100%', color: COLORS.hint });

  set(all('small'), { display: 'block', marginTop: '0.3rem', fontSize: '0.8rem', lineHeight: '1.5' });
  set(all('.hint'), { color: COLORS.hint });
  set(all('[data-error-for]'), { color: COLORS.error, minHeight: '1em' });

  // NOTE: no "display" is set here on anything that uses the hidden attribute
  // (the picture preview, the remove button, the result section), because an
  // inline display value would override hidden and the element could never be hidden.
  // (setPicture() in bio_data.js sets the preview's display only while a picture is showing.)
  set(all('#picture-preview'), {
    width: '96px', height: '96px', margin: '0.6rem 0',
    objectFit: 'cover', borderRadius: '50%', border: `2px solid ${COLORS.blue}`,
  });

  set(all('.actions'), { display: 'flex', gap: '0.75rem', marginTop: '1.5rem' });
  set(all('button'), {
    padding: '0.7rem 1.1rem', font: 'inherit', fontWeight: '700', whiteSpace: 'nowrap',
    color: COLORS.blueText, background: COLORS.blue, border: 'none', borderRadius: '10px', cursor: 'pointer',
  });
  set(all('button.secondary'), {
    background: COLORS.quiet, color: COLORS.quietText, border: `1px solid ${COLORS.quietLine}`,
  });
  set(all('button.small'), { padding: '0.35rem 0.8rem', fontSize: '0.85rem' });

  // Links that look like buttons: <a class="button" href="...">
  set(all('a.button'), {
    display: 'inline-block', padding: '0.7rem 1.1rem', font: 'inherit', fontWeight: '700',
    color: COLORS.blueText, background: COLORS.blue, borderRadius: '10px', textDecoration: 'none', marginRight: '0.75rem',
  });

  // buttons and button-links get a little brighter when the mouse is over them
  all('button, a.button').forEach((el) => {
    el.addEventListener('mouseenter', () => { if (!el.disabled) el.style.filter = 'brightness(1.12)'; });
    el.addEventListener('mouseleave', () => { el.style.filter = 'none'; });
  });

  // Chess.com username row (the box and the button side by side) and the box with the fetched ratings.
  // No "display" on #chess-summary: it uses the hidden attribute, and an inline display would override it.
  set(all('.chess-row'), { display: 'flex', gap: '0.5rem', alignItems: 'stretch' });
  set(all('.chess-row input'), { width: 'auto', flex: '1', minWidth: '0' });
  set(all('.chess-row button'), { whiteSpace: 'nowrap' });
  set(all('#chess-summary'), {
    marginTop: '0.6rem', padding: '0.7rem 0.9rem', fontSize: '0.9rem', lineHeight: '1.6',
    background: COLORS.field, color: COLORS.text, border: `1px solid ${COLORS.panelLine}`, borderRadius: '10px',
  });

  set(all('#status'), { fontSize: '1rem', lineHeight: '1.4' });
  set(all('pre'), {
    background: COLORS.field, color: COLORS.quietText, border: `1px solid ${COLORS.panelLine}`,
    padding: '1rem', borderRadius: '10px', fontSize: '0.85rem',
    overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
  });
}