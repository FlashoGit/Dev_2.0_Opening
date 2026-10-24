document.getElementById("demo").innerHTML = "Hello World";
fetch('profile.json')
  .then(response => response.json())
  .then(profile => {
    for (const [key, value] of Object.entries(profile)) {
      const profileDiv = document.getElementById("profile");
      const keyDiv = document.createElement("div");
      keyDiv.textContent = key + ": "+ JSON.stringify(value);
      profileDiv.appendChild(keyDiv); 
     }
    });
  