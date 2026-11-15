//creates variables
var profile1, profile2, profile3, createdprofile;
async function initializeProfile() {

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