document.getElementById("buttoninfouser1").innerHTML = profile1.Chess_Data.Chesscom.Username + " " + profile1.Chess_Data.Chesscom.Time_Control.Rapid.Elo + " " + profile1.Location_Data.City;
document.getElementById("buttoninfouser2").innerHTML = profile2.Chess_Data.Chesscom.Username + " " + profile2.Chess_Data.Chesscom.Time_Control.Rapid.Elo + " " + profile2.Location_Data.City;
document.getElementById("buttoninfouser3").innerHTML = profile3.Chess_Data.Chesscom.Username + " " + profile3.Chess_Data.Chesscom.Time_Control.Rapid.Elo + " " + profile3.Location_Data.City;
function myButton1() {
    document.getElementById("button1").style.display = "none";
    document.getElementById("button2").style.display = "none";
    document.getElementById("button3").style.display = "none";
    document.getElementById("buttoninfouser1").style.display = "none";
    document.getElementById("buttoninfouser2").style.display = "none";
    document.getElementById("buttoninfouser3").style.display = "none";
    displayProfiles(profile1);
  }
  function myButton2() {
    document.getElementById("button1").style.display = "none";
    document.getElementById("button2").style.display = "none";
    document.getElementById("button3").style.display = "none";
    document.getElementById("buttoninfouser1").style.display = "none";
    document.getElementById("buttoninfouser2").style.display = "none";
    document.getElementById("buttoninfouser3").style.display = "none";
    displayProfiles(profile2);
  }
  function myButton3() {
    document.getElementById("button1").style.display = "none";
    document.getElementById("button2").style.display = "none";
    document.getElementById("button3").style.display = "none";
    document.getElementById("buttoninfouser1").style.display = "none";
    document.getElementById("buttoninfouser2").style.display = "none";
    document.getElementById("buttoninfouser3").style.display = "none";
    displayProfiles(profile3);
  }