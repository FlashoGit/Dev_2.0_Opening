fetch('profile.json')
  .then(response => response.json())
  .then(profile => {
        localStorage.setItem("bio_data", JSON.stringify(profile.bio_data));
        localStorage.setItem("chess_com", JSON.stringify(profile.Chess_Data.Chesscom));
        localStorage.setItem("lichess", JSON.stringify(profile.Chess_Data.lichess));
        localStorage.setItem("fide", JSON.stringify(profile.Chess_Data.FIDE));
        localStorage.setItem("location_data", JSON.stringify(profile.Location_Data));
    });