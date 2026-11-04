

const PL_GENDER_LABELS = { M: 'Male', F: 'Female', O: 'Other' };

function plGet(obj, key) {
  if (!obj || typeof obj !== 'object') return undefined;
  const found = Object.keys(obj).find((k) => k.toLowerCase() === key.toLowerCase());
  return found === undefined ? undefined : obj[found];
}


function plMake(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined && text !== null) el.textContent = text;
  return el;
}


function plRow(label, value) {
  const row = plMake('div', 'pl-row');
  row.appendChild(plMake('span', 'pl-label', label));
  row.appendChild(plMake('span', 'pl-value', value));
  return row;
}


function plChessColumn(title, data) {
  const col = plMake('div', 'pl-chess-col');
  col.appendChild(plMake('h3', 'pl-chess-title', title));

  if (!data || typeof data !== 'object') {
    col.appendChild(plMake('div', 'pl-empty', 'Not linked yet.'));
    return col;
  }

  const controls = plGet(data, 'time_control') || {};
  const favourite = String(plGet(data, 'fav_time_control')).toLowerCase();
  const mode = Object.keys(controls).find((k) => k.toLowerCase() === favourite) ?? Object.keys(controls)[0];
  const stats = mode === undefined ? undefined : controls[mode];
  const elo = plGet(stats, 'elo');
  const games = plGet(stats, 'games_played');

  col.appendChild(plRow('Username:', plGet(data, 'username') || '—'));
  col.appendChild(plRow('Time control:', mode === undefined ? '—' : (elo === undefined ? mode : `${mode} (Elo ${elo})`)));
  col.appendChild(plRow('Games played:', games === undefined ? '—' : games));
  return col;
}


function renderProfileLayout(profile, container) {
  const bio = profile.bio_data || {};
  const chess = profile.Chess_Data || {};

  container.innerHTML = ''; // clear whatever was shown before

  const root = plMake('div', 'pl-profile');


  const top = plMake('div', 'pl-top');

  const avatar = plMake('div', 'pl-avatar');
  if (typeof bio.Picture === 'string' && bio.Picture.startsWith('data:image/')) {
    const img = plMake('img', 'pl-avatar-img');
    img.src = bio.Picture;
    img.alt = 'Profile picture';
    avatar.appendChild(img);
  } else {
    avatar.textContent = (Array.from((bio.Name || '?').trim())[0] || '?').toUpperCase();
  }
  top.appendChild(avatar);

  const hasAge = bio.Age !== undefined && bio.Age !== null && bio.Age !== '';
  const info = plMake('div', 'pl-info');
  info.appendChild(plRow('Username:', bio.Name || 'Unnamed player'));
  info.appendChild(plRow('Age:', hasAge ? bio.Age : '—'));
  info.appendChild(plRow('Gender:', PL_GENDER_LABELS[bio.Gender] || '—'));
  top.appendChild(info);
  root.appendChild(top);


  const bioBox = plMake('div', 'pl-bio');
  bioBox.appendChild(plMake('div', 'pl-label', 'Bio:'));
  bioBox.appendChild(plMake('div', 'pl-bio-text', bio.Bio_Description || 'No bio yet.'));
  root.appendChild(bioBox);


  const chessRow = plMake('div', 'pl-chess');
  chessRow.appendChild(plChessColumn('Chess.com Info', plGet(chess, 'chesscom')));
  chessRow.appendChild(plMake('div', 'pl-divider'));
  chessRow.appendChild(plChessColumn('Lichess Info', plGet(chess, 'lichess')));
  root.appendChild(chessRow);

  container.appendChild(root);

  
  if (typeof applyIndexStyles === 'function') applyIndexStyles(container);
}