function initializeButtons() {
  //Displays mini previews of the users profiles
  document.getElementById("chatbutton").style.display = "none";
  document.getElementById("backbutton").style.display = "none";
  document.getElementById("createprofile").style.display = "none";
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
  const counter = 0;
  loginButton.addEventListener("click", () => {
    for (let i = 0; i < profiles.length - 1; i++) {
    if (loginform.value === profiles[i].Account_Data.Username) {
      if (password.value === profiles[i].Account_Data.Password) {
        console.log("Login successful");
        window.location.href = "index.html";
        counter = 1;
      }
    }
  }
  if (counter === 0){
    alert("Login failed. Please check your username and password.");
  }
  });
}
function signupButton(){
  const signupButton = document.createElement("button");
  signupButton.setAttribute("id", "signupbutton");
  signupButton.textContent = "Sign Up";
  document.body.appendChild(signupButton);
  signupButton.addEventListener("click", () => {
    window.location.href = "user_pass.html";
  });
}
async function setUsername_Password(){
  const usernamePasswordButton = document.createElement("button");
  usernamePasswordButton.setAttribute("id", "usernamepasswordbutton");
  usernamePasswordButton.textContent = "Set Username and Password";
  document.body.appendChild(usernamePasswordButton);
  const profiles = await get_profiles();
  counter = 0;
  usernamePasswordButton.addEventListener("click", () => {
    counter = 0;
    if (counter === 0){
    for (let i = 0; i < profiles.length - 1; i++) {
    if (loginform.value === profiles[i].Account_Data.Username) {
      alert("Username or password already exists. Please choose a different one.");
      counter = 1;
    }
    else if (password.value === profiles[i].Account_Data.Password) {
        alert("Username or password already exists. Please choose a different one.");
        counter = 1;
      }
    else if (counter === 0){
      profilenumber = i;
    }
    }
      if (loginform.value === "" || password.value === "") {
      alert("Please enter a username and password");
      counter = 1;
    }
  }
    if (counter === 0){
      const password = document.getElementById("password").value;
      const username = document.getElementById("loginform").value;
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      alert("Sucess!!");
      window.location.href = "profile.html";
    }
  });
}
