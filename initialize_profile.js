//creates variables
var profile1, profile2, profile3;

//creates an if statement that checks if the profile is in local storage and if not it fetches the profile from the json file and stores it in local storage
if (!localStorage.getItem("profile1")) {
  fetch('profile.json')
    .then(response => response.json())
    .then(profile => {
      localStorage.setItem("profile1", JSON.stringify(profile));

    });
}
else {
  //if already in local storage it parses the profile and stores it in the variable
  profile1 = JSON.parse(localStorage.getItem("profile1"));

}
//same thing as the above but for profile2 and profile3
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
//create a function that takes a profile and displays it in the profilediv
function displayProfiles(prof) {
  for (const [key, value] of Object.entries(prof)) {
    const profileDiv = document.getElementById("profilediv");
    const keyDiv = document.createElement("div");
    keyDiv.textContent = key + ": " + JSON.stringify(value);
    profileDiv.appendChild(keyDiv);
  }
}