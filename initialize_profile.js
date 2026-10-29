var profile1, profile2, profile3;
if (!localStorage.getItem("profile1")) {
  fetch('profile.json')
    .then(response => response.json())
    .then(profile => {
      localStorage.setItem("profile1", JSON.stringify(profile));
    
    });
}
else {
  profile1 = JSON.parse(localStorage.getItem("profile1"));
  
}
if (!localStorage.getItem("profile2")) {
  fetch('profile2.json')
    .then(response => response.json())
    .then(profile2 => {
      localStorage.setItem("profile2", JSON.stringify(profile2));
    });
}
else {
  profile2 = JSON.parse(localStorage.getItem("profile2"));
}
if (!localStorage.getItem("profile3")) {
  fetch('profile3.json')
    .then(response => response.json())
    .then(profile3 => {
      localStorage.setItem("profile3", JSON.stringify(profile3));
    });
}
else {
  profile3 = JSON.parse(localStorage.getItem("profile3"));
}
function displayProfiles(prof) {
  for (const [key, value] of Object.entries(prof)) {
    const profileDiv = document.getElementById("profilediv");
    const keyDiv = document.createElement("div");
    keyDiv.textContent = key + ": " + JSON.stringify(value);
    profileDiv.appendChild(keyDiv);
  }
}