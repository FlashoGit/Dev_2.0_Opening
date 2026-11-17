function initializeButtons() {
  //Displays mini previews of the users profiles
  document.getElementById("chatbutton").style.display = "none";
  document.getElementById("backbutton").style.display = "none";
  createButtons()
}
function hideNecessaryElements() {
  
  for (const button of document.getElementsByClassName("profile-button")) {
    button.style.display = "none";
  }
  for (const text of document.getElementsByClassName("profile-text")) {
    text.style.display = "none";
  }
  document.getElementById("backbutton").style.display = "block";
  document.getElementById("createprofile").style.display = "none";
  document.getElementById("profileheader").style.display = "none";
  document.getElementById("chatbutton").style.display = "block";
}
function backButton() {
  for (const button of document.getElementsByClassName("profile-button")) {
    button.style.display = "block";
  }
  for (const text of document.getElementsByClassName("profile-text")) {
    text.style.display = "block";
  }
  document.getElementById("backbutton").style.display = "none";
  document.getElementById("profilediv").style.display = "none";
  document.getElementById("createprofile").style.display = "block";
  document.getElementById("profileheader").style.display = "block";
  document.getElementById("chatbutton").style.display = "none";

}