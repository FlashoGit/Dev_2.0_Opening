function initializeButtons() {
  //Displays mini previews of the users profiles
  createButtons()
  document.getElementById("buttoninfouser1").innerHTML = "Elo: " + profile1.Chess_Data.Chesscom.Time_Control.Rapid.Elo + "  Location: " + profile1.Location_Data.City;
  document.getElementById("buttoninfouser2").innerHTML = "Elo: " + profile2.Chess_Data.Chesscom.Time_Control.Rapid.Elo + "  Location: " + profile2.Location_Data.City;
  document.getElementById("buttoninfouser3").innerHTML = "Elo: " + profile3.Chess_Data.Chesscom.Time_Control.Rapid.Elo + "  Location: " + profile3.Location_Data.City;
  if (createdprofile !== null) {
    document.getElementById("buttoninfouser4").innerHTML = "Location: " + createdprofile.Location_Data.City;
    buttoninfouser4.style.display = "block";
  }
  else {
    buttoninfouser4.style.display = "none";
  }
  button1.textContent = "View " + profile1.Chess_Data.Chesscom.Username + "'s Profile";
  button2.textContent = "View " + profile2.Chess_Data.Chesscom.Username + "'s Profile";
  button3.textContent = "View " + profile3.Chess_Data.Chesscom.Username + "'s Profile";
  if (createdprofile !== null) {
    button4.textContent = "View " + createdprofile.bio_data.Name + "'s Profile";
    button4.style.display = "block";
  }
  else {
    button4.style.display = "none";
  }
  document.getElementById("backbutton").style.display = "none";
  document.getElementById("chat").style.display = "none";
}
//functions that display the profiles when the buttons are clicked and hides other elements
function myButton1() {
  hideNecessaryElements()
  displayProfiles(profile1);
}
function myButton2() {
  hideNecessaryElements()
  displayProfiles(profile2);
}
function myButton3() {
  hideNecessaryElements()
  displayProfiles(profile3);
}

function myButton4() {
  if (createdprofile !== null) {
    hideNecessaryElements()
    displayProfiles(createdprofile);
  }
}
function backButton() {
  document.getElementById("chat").style.display = "none";
  document.getElementById("backbutton").style.display = "none";
  document.getElementById("button1").style.display = "block";
  document.getElementById("button2").style.display = "block";
  document.getElementById("button3").style.display = "block";
  document.getElementById("button4").style.display = "block";
  document.getElementById("buttoninfouser1").style.display = "block";
  document.getElementById("buttoninfouser2").style.display = "block";
  document.getElementById("buttoninfouser3").style.display = "block";
  document.getElementById("buttoninfouser4").style.display = "block";
  document.getElementById("button4").style.display = "block";
  document.getElementById("profileheader").style.display = "block";
  document.getElementById("createprofile").style.display = "block";
  hideProfileDiv();
}
function hideNecessaryElements() {
  document.getElementById("chat").style.display = "block";
  document.getElementById("backbutton").style.display = "block";
  document.getElementById("button1").style.display = "none";
  document.getElementById("button2").style.display = "none";
  document.getElementById("button3").style.display = "none";
  document.getElementById("button4").style.display = "none";
  document.getElementById("buttoninfouser1").style.display = "none";
  document.getElementById("buttoninfouser2").style.display = "none";
  document.getElementById("buttoninfouser3").style.display = "none";
  document.getElementById("buttoninfouser4").style.display = "none";
  document.getElementById("profileheader").style.display = "none";
  document.getElementById("createprofile").style.display = "none";
}