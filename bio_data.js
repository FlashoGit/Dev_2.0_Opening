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
  .forEach((el) => (el.computedStyleMap.borderColor = COLORS.border));

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
  try {
    localStorage.setItem('profile', JSON.stringify(profile));
    return true;
  } catch {
    return false; 
  }
}
 
function loadSavedProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const bio = profile.bio_data;
    const location = profile.location;
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
  return { bio_data: bio, Chess_Data: {}, Location_Data: location };
}
 

bioInput.addEventListener('input', () => {
  bioCount.textContent = bioInput.value.length;
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
  const savedLocally = saveProfile(bio, location);

  try {
    const id = await sendToServer(currentProfile);
    statusEl.textContent = `Profile saved successfully! Your profile ID is ${id}.`;}
    catch (err) {
      const why = err instanceof TypeError ? 'Network error' : err.message;
      statusEl.textContent = (savedLocally ? 'Saved in the browser only': 'Not Saved') + '(${why}). You can still download the profile below.';
    }

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