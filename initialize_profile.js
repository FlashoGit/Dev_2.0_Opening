//creates variables
var profile1, profile2, profile3, createdprofile;
async function initializeProfile() {

//creates an if statement that checks if the profile is in local storage and if not it fetches the profile from the json file and stores it in local storage
if (!localStorage.getItem("profile1")) {
  var response = await fetch('profile.json');
  var response_profile = await response.json();
  localStorage.setItem("profile1", JSON.stringify(response_profile));
}

  //if already in local storage it parses the profile and stores it in the variable
  profile1 = JSON.parse(localStorage.getItem("profile1"));


//same thing as the above but for profile2 and profile3
if (!localStorage.getItem("profile2")) {
  var response = await fetch('profile2.json');
  var response_profile = await response.json();
  localStorage.setItem("profile2", JSON.stringify(response_profile));
}

  profile2 = JSON.parse(localStorage.getItem("profile2"));

if (!localStorage.getItem("profile3")) {
  var response = await fetch('profile3.json');
  var response_profile = await response.json();
  localStorage.setItem("profile3", JSON.stringify(response_profile));
}

  profile3 = JSON.parse(localStorage.getItem("profile3"));

  createdprofile = JSON.parse(localStorage.getItem("profile"));
  initializeButtons();
}
//create a function that takes a profile and displays it in the profilediv
function displayProfiles(prof) {
  renderProfileLayout(prof, document.getElementById("profilediv"));
}
  function hideProfileDiv() {
    const profileDiv = document.getElementById("profilediv");
    profileDiv.innerHTML = "";
  }

document.addEventListener('DOMContentLoaded', initializeProfile);