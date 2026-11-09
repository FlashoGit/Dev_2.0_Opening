function initializeButtons() {
//Displays mini previews of the users profiles
document.getElementById("buttoninfouser1").innerHTML = "Elo: " + profile1.Chess_Data.Chesscom.Time_Control.Rapid.Elo + "  Location: " + profile1.Location_Data.City;
document.getElementById("buttoninfouser2").innerHTML = "Elo: " + profile2.Chess_Data.Chesscom.Time_Control.Rapid.Elo + "  Location: " + profile2.Location_Data.City;
document.getElementById("buttoninfouser3").innerHTML = "Elo: " + profile3.Chess_Data.Chesscom.Time_Control.Rapid.Elo + "  Location: " + profile3.Location_Data.City;
document.getElementById("buttoninfouser4").innerHTML =  "Location: " + createdprofile.Location_Data.City;
button1.textContent = "View " + profile1.Chess_Data.Chesscom.Username + "'s Profile";
button2.textContent = "View " + profile2.Chess_Data.Chesscom.Username + "'s Profile";
button3.textContent = "View " + profile3.Chess_Data.Chesscom.Username + "'s Profile";
button4.textContent = "View " + createdprofile.Chess_Data.Chesscom.Username + "'s Profile";
document.getElementById("backbutton").style.display = "none";
document.getElementById("chat").style.display = "none";
}
//functions that display the profiles when the buttons are clicked and hides other elements
function myButton1() {
  document.getElementById("backbutton").style.display = "block";
  document.getElementById("chat").style.display = "block";
  document.getElementById("button1").style.display = "none";
  document.getElementById("button2").style.display = "none";
  document.getElementById("button3").style.display = "none";
  document.getElementById("buttoninfouser1").style.display = "none";
  document.getElementById("buttoninfouser2").style.display = "none";
  document.getElementById("buttoninfouser3").style.display = "none";
  document.getElementById("buttoninfouser4").style.display = "none";
  document.getElementById("profileheader").style.display = "none";
  displayProfiles(profile1);
}
function myButton2() {
  document.getElementById("chat").style.display = "block";
  document.getElementById("backbutton").style.display = "block";
  document.getElementById("button1").style.display = "none";
  document.getElementById("button2").style.display = "none";
  document.getElementById("button3").style.display = "none";
  document.getElementById("buttoninfouser1").style.display = "none";
  document.getElementById("buttoninfouser2").style.display = "none";
  document.getElementById("buttoninfouser3").style.display = "none";
  document.getElementById("buttoninfouser4").style.display = "none";
  document.getElementById("profileheader").style.display = "none";
  displayProfiles(profile2);
}
function myButton3() {
  document.getElementById("chat").style.display = "block";
  document.getElementById("backbutton").style.display = "block";
  document.getElementById("button1").style.display = "none";
  document.getElementById("button2").style.display = "none";
  document.getElementById("button3").style.display = "none";
  document.getElementById("buttoninfouser1").style.display = "none";
  document.getElementById("buttoninfouser2").style.display = "none";
  document.getElementById("buttoninfouser3").style.display = "none";
  document.getElementById("buttoninfouser4").style.display = "none";
  document.getElementById("profileheader").style.display = "none";
  displayProfiles(profile3);
}

function myButton4() {
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
  displayProfiles(createdprofile);
}
function backButton() {
  document.getElementById("chat").style.display = "none";
  document.getElementById("backbutton").style.display = "none";
  document.getElementById("button1").style.display = "block";
  document.getElementById("button2").style.display = "block";
  document.getElementById("button3").style.display = "block";
  document.getElementById("buttoninfouser1").style.display = "block";
  document.getElementById("buttoninfouser2").style.display = "block";
  document.getElementById("buttoninfouser3").style.display = "block";
  document.getElementById("buttoninfouser4").style.display = "block";
  document.getElementById("button4").style.display = "block"; 
  document.getElementById("profileheader").style.display = "block";
  hideProfileDiv(); 
}