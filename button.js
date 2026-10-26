function myButton1() {
    document.getElementById("button1").style.display = "none";
    document.getElementById("button2").style.display = "none";
    document.getElementById("button").style.display = "none";
    document.getElementById("profile").style.display = "none";
    fetch('profile.json')
  .then(response => response.json())
  .then(profile => {
    
    document.getElementById("buttoninfouser").innerHTML = profile.Chess_Data.Chesscom.Username;
    document.getElementById("buttoninfouser1").innerHTML = profile.Chess_Data.Chesscom.Time_Control.Rapid.Elo;
    document.getElementById("buttoninfouser2").innerHTML = profile.Location_Data.City;
  })}