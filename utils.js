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
