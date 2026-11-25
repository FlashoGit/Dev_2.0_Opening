/*
*Programs lets user fill in bio data of profile.json
*It creates an object where the user data is and fills that info into profile.json
*
*/

// configs
const MIN_AGE = 18;
const MAX_AGE = 120;
const PICTURE_SIZE = 256; // pictures are shrunk to 256x256 so they fit in localStorage
 
// Elements 
const form = document.getElementById('profile-form');
const bioInput = document.getElementById('Bio_Description');
const bioCount = document.getElementById('bio-count');
const pictureInput = document.getElementById('Picture');
const picturePreview = document.getElementById('picture-preview');
const removePictureBtn = document.getElementById('remove-picture');
const clearBtn = document.getElementById('clear-btn');
const resultSection = document.getElementById('result');
const statusEl = document.getElementById('status');
const jsonOutput = document.getElementById('json-output');
const downloadBtn = document.getElementById('download-btn');
 
let pictureData = ''; 
let currentProfile = null;
 

function getBioData() {
  const age = form.elements.Age.value;
  return {
    Name: form.elements.Name.value.trim(),
    Age: age === '' ? null : Number(age),
    Gender: form.elements.Gender.value,
    Picture: pictureData,
    Bio_Description: form.elements.Bio_Description.value.trim(),
  };
}
 
function getLocationData() {
  return { City: form.elements.City.value.trim() };
}
 

function validate(bio, location) {
  const errors = {};
 
  if (bio.Name.length < 1 || bio.Name.length > 60) {
    errors.Name = 'Enter your name (max 60 characters).';
  }
 
  if (!Number.isInteger(bio.Age)) {
    errors.Age = 'Enter your age as a whole number.';
  } else if (bio.Age < MIN_AGE) {
    errors.Age = `You must be at least ${MIN_AGE}.`;
  } else if (bio.Age > MAX_AGE) {
    errors.Age = 'Please enter a realistic age.';
  }
 
  if (!['', 'M', 'F', 'Other'].includes(bio.Gender)) {
    errors.Gender = 'Pick one of the options.';
  }
 
  if (location.City.length < 2 || location.City.length > 60) {
    errors.City = 'Enter your city or area.';
  }
 
  if (bio.Bio_Description.length > 300) {
    errors.Bio_Description = 'Bio must be 300 characters or fewer.';
  }
 
  return errors;
}
 
function showErrors(errors) {
  form.querySelectorAll('[data-error-for]').forEach((el) => (el.textContent = ''));
  form.querySelectorAll('input[type="text"], input[type="number"], select, textarea')
  .forEach((el) => (el.style.borderColor = COLORS.border));

  for (const [field, message] of Object.entries(errors)) {
    const errorEl = form.querySelector(`[data-error-for="${field}"]`);
    const inputEl = form.elements[field];
    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.style.borderColor = COLORS.error;
  }
 
  const firstBad = Object.keys(errors)[0];
  if (firstBad) form.elements[firstBad].focus();
}
 

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('That file is not a valid image.'));
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = PICTURE_SIZE;
        canvas.getContext('2d').drawImage(img, sx, sy, side, side, 0, 0, PICTURE_SIZE, PICTURE_SIZE);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
 
function setPicture(dataUrl) {
  pictureData = dataUrl;
  picturePreview.hidden = !dataUrl;
  removePictureBtn.hidden = !dataUrl;
  if (dataUrl) picturePreview.src = dataUrl;
  else picturePreview.removeAttribute('src');
}
 
pictureInput.addEventListener('change', async () => {
  const file = pictureInput.files[0];
  if (!file) return;
  try {
    setPicture(await resizeImage(file));
    showErrors({});
  } catch (err) {
    setPicture('');
    pictureInput.value = '';
    showErrors({ Picture: err.message });
  }
});
 
removePictureBtn.addEventListener('click', () => {
  setPicture('');
  pictureInput.value = '';
});
 

function saveProfile(profile) {
  console.log("Saving Profile");
  try {
    localStorage.setItem('profile', JSON.stringify(profile));
    put_profile(profile, profile.bio_data.Name);
    console.log("Profile Saved");
    return true;
  } catch (e){
    console.log(e);
    console.log("Failed to save profile.");
    return false; 
  }
  
}
 
function loadSavedProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const bio = profile.bio_data;
    const location = profile.location;
    const chess_profile = profile.Chess_Data && profile.Chess_Data.Chess.com;
    if (chess_profile) {
      chessData = {Chesscom: chessCom};
      chessInput.value = Chess.Username ?? '';
      showChessSummary();
    }
    if (bio) {
      form.elements.Name.value = bio.Name ?? '';
      form.elements.Age.value = bio.Age ?? '';
      form.elements.Gender.value = bio.Gender ?? '';
      form.elements.Bio_Description.value = bio.Bio_Description ?? '';
      setPicture(bio.Picture || '');
    }
    if (location) form.elements.City.value = location.City ?? '';
  } catch {
    
  }
}
 

function buildProfileJson(bio, location) {
  return { bio_data: bio, Chess_Data: chessData, Location_Data: location, Account_Data: {} };
}
 

bioInput.addEventListener('input', () => {
  bioCount.textContent = bioInput.value.length;
});

//chess.com part 
const CHESSAPI = 'https://api.chess.com/pub/player/';
const ChessUsernameInput =  /^[A-Za-z0-9_-]{3,25}$/;
const FETCH_CHESS_LABEL = fetchchessBtn.textContent;

const CHESS_MODES = {
  bullet: 'Bullet',
  blitz: 'Blitz',
  rapid: 'Rapid',
  daily: 'Daily',
};

async function fetchChessProfile(username) {
  const res = await fetch(CHESSAPI + encodeURIComponent(username.toLowerCase()) + '/stats');
  if (res.status === 404) throw new Error('Chess.com profile not found.');
  if (!res.ok) throw new Error('Failed to fetch Chess.com profile.');
  if (res.status === 429) throw new Error('Too many requests to Chess.com. Please try again later.');

  const stats = await res.json();

  const timeControls = {};
  let favoriteMode = null;
  for (const [mode, data] of Object.entries(CHESS_MODES)) {
    const mode = stats[apiName];
    const elo = mode?.last?.rating;

    if (!Number.isInteger(elo)) continue;

    const record = mode.record || {};
    const wins = record.win || 0;
    const losses = record.loss || 0;
    const draws = record.draw || 0;
    timeControl[label] = { Elo: elo, Wins: wins, Losses: losses, Draws: draws, Games_Played: wins + losses + draws };
    
    if (favourite === null || timeControl[label].Games_Played > 
      timeControl[favourite].Games_Played) favourite = label;
  }

  if (favourite === null) throw new Error('That player has no rated games on Chess.com.');

  return { Chesscom: { Username: username, Time_Control: timeControl, fav_time_control: favourite } };
  }

function showChessSummary() {
  chessSummary.textContent = '';
  const info = chessData.Chesscom;
  if (!info) {
    chessSummary.hidden = true;
    return;
  }

const lines = [`Chess.com: ${info.Username}`];
  for (const [name, s] of Object.entries(info.Time_Control)) {
    lines.push(`${name}: ${s.Elo} Elo, ${s.Wins} wins, ${s.Losses} losses` + (s.Draws ? `, ${s.Draws} draws` : ''));
  }
  lines.push(`Favourite game mode: ${info.fav_time_control}`);
  lines.forEach((text, i) => {
    const line = document.createElement('div');
    line.textContent = text; 
    if (i === 0) line.style.fontWeight = '600';
    chessSummary.appendChild(line);
  });
  chessSummary.hidden = false;
}

function chessError(message) {
  form.querySelector('[data-error-for="chessUsername"]').textContent = message;
  chessInput.style.borderColor = message ? COLORS.error : COLORS.border;
}

async function loadChessData() {
  const username = chessInput.value.trim();
  chessData = {};          // never keep the old player's data while loading a new one
  showChessSummary();
  setChessError('');

  if (!CHESS_USERNAME_RE.test(username)) {
    setChessError('Enter a Chess.com username (3-25 letters, numbers, _ or -).');
    return false;
  }
}

  fetchChessBtn.disabled = true;
  fetchChessBtn.textContent = 'Fetching...';

  try{
    const fetchedData = await fetchChessProfile(username);

    if (chessInput.value.trim().toLowerCase() !== username.toLowerCase()) {
      return false;
    }

    chessData = fetched;
    showChessSummary();
    return true;

  } catch (err) {
    if (chessInput.value.trim().toLowerCase() !== username.toLowerCase()) {
      setChessError(err.message);
      return false;
    }
  } finally {
    fetchChessBtn.disabled = false;
    fetchChessBtn.textContent = FETCH_CHESS_LABEL;

    if (chessInput.value.trim().toLowerCase() !== username.toLowerCase()) scheduleLoadChessData();
  }

  let chessLoadTimeout = null;
  function scheduleFetchChessData() {
    clearTimeout(chessLoadTimeout);
    const name = chessInput.value.trim();
    if (!CHESS_USERNAME_RE.test(name)) {
      setChessError('Enter a Chess.com username (3-25 letters, numbers, _ or -).');
      return;
    }
    if (chessData.Chesscom && chessData.Chesscom.Username.toLowerCase() === name.toLowerCase()) {
      setChessError('');
      return;
    }
    chessTimer = setTimeout(() => { if (!fetchChessBtn.disabled) loadChessData(); }, 800);
    
  }

  fetchChessBtn.addEventListener('click', loadChessData);

  chessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    loadChessData();
  }
});


chessInput.addEventListener('input', () => {
  const info = chessData.Chesscom;
  if (info && info.Username.toLowerCase() !== chessInput.value.trim().toLowerCase()) {
    chessData = {};
    showChessSummary();
  }
  setChessError('');
  scheduleChessFetch();
});

chessInput.addEventListener('blur', () => {
  clearTimeout(chessTimer);
  const name = chessInput.value.trim();
  if (CHESS_USERNAME_RE.test(name) && !chessData.Chesscom && !fetchChessBtn.disabled) loadChessData();
});


async function sendToServer(profile) {
  let id = null;
  try { id = localStorage.getItem('profile_id'); } catch { /* ignore */ }

  const res = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...profile, id }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'The server refused the profile.');

  try { localStorage.setItem('profile_id', result.id); } catch { /* ignore */ }
  return result.id;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bio = getBioData();
  const location = getLocationData();
  const errors = validate(bio, location);
  showErrors(errors);

  if (Object.keys(errors).length > 0) {
    resultSection.hidden = true;
    return;
  }
  
  currentProfile = buildProfileJson(bio, location);
  const savedLocally = saveProfile(currentProfile);

  // try {
  //   const id = await sendToServer(currentProfile);
  //   statusEl.textContent = `Profile saved successfully! Your profile ID is ${id}.`;}
  //   catch (err) {
  //     const why = err instanceof TypeError ? 'Network error' : err.message;
  //     statusEl.textContent = (savedLocally ? 'Saved in the browser only': 'Not Saved') + '(${why}). You can still download the profile below.';
  //   }

  const preview = structuredClone(currentProfile);
  if (preview.bio_data.Picture) preview.bio_data.Picture = '(picture data...)';
  jsonOutput.textContent = JSON.stringify(preview, null, 2);
  resultSection.hidden = false;
});

clearBtn.addEventListener('click', () => {
  form.reset();
  setPicture('');
  bioCount.textContent = '0';
  showErrors({});
  resultSection.hidden = true;
  currentProfile = null;
});
 

 
applyStyles();
loadSavedProfile();
bioCount.textContent = bioInput.value.length;
