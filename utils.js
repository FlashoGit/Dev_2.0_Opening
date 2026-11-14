//Define a function to unwrap and object into.
function unwrap(object, object_key){
    //Storing attributes of the object as new objects.
    for(const [key, value] of Object.entries(object)){
        localStorage.setItem(key, value);
    }
    //Deleting the object now that it has been unwrapped
    localStorage.removeItem(object, object_key);
}

//Define a function to wrap data in localStorage into an object
//this object is then stored in localStorage and returned.
function wrap(wrapper_key, ...keys){
    //Initialize the final object
    let wrapped = {};

    //Iterate through the keys.
    for(const key of keys){
        //Retrieve and parse the value at the current key.
        const value = JSON.parse(localStorage.getItem(key));
        //Add the current value to the object.
        wrapped = { ...wrapped, ...value };
        //Remove the value at the key.
        localStorage.removeItem(key);
    }

    //Store the object in localStorage
    localStorage.setItem(wrapper_key, JSON.stringify(wrapped));
    //Return the object
    return wrapped;
}

//Define a function to post an object as a JSON.
async function post_profile(object, file_name){
    console.log("POST profile.");
    //Define a constant for the address for POST requests.
    const REQUEST_ADDRESS = "/json_post/profiles/" + file_name;

    try {
        //Send a POST request containing the object as a JSON.
        const response = await fetch((REQUEST_ADDRESS), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        });

        //Debug: Print the response from the server.
        console.log("Server response:", await response.json());
    }
    catch(e){
        console.error(e);
    }
}

//Define a function to return a profile of a given file name (firstnamelastnameage.json).
async function get_profile(file_name){
    //Define a constant for the address for POST requests.
    const REQUEST_ADDRESS = "/json_get/profiles/" + file_name;

    try {
        //Send a GET request for the JSON.
        const response = await fetch(REQUEST_ADDRESS);

        //Get result object of the response
        const result = await response.json();

        //Debug: Print the response from the server.
        console.log("Server response:", result);

        //Return the object contained in the JSON.
        return result;
    }
    catch(e){
        console.error(e);
    }
}

//Define a function to return an array of profile objects and one null object 
//as the last element. This function will return all profiles.
async function get_profiles(){
    //Define an address for the request.
    const REQUEST_ADDRESS = "json_gets/profiles";

    try{
        //Perform the GET request.
        const response = await fetch(REQUEST_ADDRESS);

        //Parse the response to an array of objects.
        const result = await response.json()

        //Debug: Log the result.
        console.log(result);

        return result;
    }
    catch(e){
        console.error(e);
    }
}

//create a function that takes a profile and displays it in the profilediv
function displayProfiles(prof) {
  for (const [key, value] of Object.entries(prof)) {
    const profileDiv = document.getElementById("profilediv");
    const keyDiv = document.createElement("div");
    keyDiv.textContent = key + ": " + JSON.stringify(value);
    profileDiv.appendChild(keyDiv);
  }
}

async function createButtons(){
    const profiles = await get_profiles();
    for (let i = 0; i < profiles.length - 1; i++) {
        const button = document.createElement("button");
        button.textContent = "View " + profiles[i].Chess_Data.Chesscom.Username + "'s Profile";
        button.addEventListener("click", () => {
            hideNecessaryElements();
            displayProfiles(profiles[i]);
        });
        document.body.appendChild(button);
    }
}


