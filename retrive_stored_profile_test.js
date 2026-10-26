//define an output buffer
let output = "";

//Loop through bio_data.
for(const value of localStorage.getItem("bio_data")){
    //Add current value to the buffer.
    output += value;
}

//Print the buffer.
console.log(output);

//Clear the buffer.
output = ""

//Loop through chess_com.
for(const value of localStorage.getItem("chess_com")){
    //Add current value to the buffer.
    output += value;
}

//Print the buffer.
console.log(output);

//Clear the buffer.
output = ""

//Loop through lichess.
for(const value of localStorage.getItem("lichess")){
    //Add current value to the buffer
    output += value;
}

//Print the buffer.
console.log(output);

//Clear the buffer.
output = ""

//Loop through fide.
for(const value of localStorage.getItem("fide")){
    //Add current value to the buffer.
    output += value;
}

//Print the buffer.
console.log(output);

//Clear the buffer.
output = ""

//Loop through location_data.
for(const value of localStorage.getItem("location_data")){
    //Add current value to the buffer.
    output += value;
}

//Print the buffer.
console.log(output);

//Wrap chess_com, lichess and fide together.
console.log(JSON.stringify(wrap("chess_data", "chess_com", "lichess", "fide")));

