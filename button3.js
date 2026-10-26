function myButton3() {
    document.getElementById("button1").style.display = "none";
    document.getElementById("button2").style.display = "none";
    document.getElementById("button").style.display = "none";
    document.getElementById("profile").style.display = "none";
    fetch('profile3.json')
  .then(response => response.json())
  .then(profile3 => {
    
    document.getElementById("buttoninfouser").innerHTML = profile3.Chess_Data.Chesscom.Username;
    document.getElementById("buttoninfouser1").innerHTML = profile3.Chess_Data.Chesscom.Time_Control.Rapid.Elo;
    document.getElementById("buttoninfouser2").innerHTML = profile3.Location_Data.City;
  })}