function initializeButtons() {
  //Displays mini previews of the users profiles
  document.getElementById("chatbutton").style.display = "none";
  document.getElementById("backbutton").style.display = "none";
  createButtons()
}
function hideNecessaryElements() {
  
  for (const button of document.getElementsByClassName("profile-button")) {
    button.style.display = "none";
  }
  for (const text of document.getElementsByClassName("profile-text")) {
    text.style.display = "none";
  }
  document.getElementById("backbutton").style.display = "block";
  document.getElementById("createprofile").style.display = "none";
  document.getElementById("profileheader").style.display = "none";
  document.getElementById("chatbutton").style.display = "block";
}
function backButton() {
  for (const button of document.getElementsByClassName("profile-button")) {
    button.style.display = "block";
  }
  for (const text of document.getElementsByClassName("profile-text")) {
    text.style.display = "block";
  }
  document.getElementById("backbutton").style.display = "none";
  document.getElementById("profilediv").style.display = "none";
  document.getElementById("createprofile").style.display = "block";
  document.getElementById("profileheader").style.display = "block";
  document.getElementById("chatbutton").style.display = "none";
}
function loginButtonUsername(){
  const loginForm = document.createElement("input");
  loginForm.setAttribute("type", "text");
  loginForm.setAttribute("id", "loginform");
  loginForm.setAttribute("placeholder", "Enter your username"); 
  document.body.appendChild(loginForm);
}
function loginButtonPassword(){
  const password = document.createElement("input");
  password.setAttribute("type", "text");
  password.setAttribute("id", "password");
  password.setAttribute("placeholder", "Enter your password");
  document.body.appendChild(password);
}
async function loginButton(){
  const loginButton = document.createElement("button");
  loginButton.setAttribute("id", "loginbutton");
  loginButton.textContent = "Login";
  document.body.appendChild(loginButton);
  const profiles = await get_profiles();
  loginButton.addEventListener("click", () => {
    for (let i = 0; i < profiles.length - 1; i++) {
    if (loginform.value === profiles[i].Account_Data.Username) {
      if (password.value === profiles[i].Account_Data.Password) {
        console.log("Login successful");
      }
    }
  }
  });
}