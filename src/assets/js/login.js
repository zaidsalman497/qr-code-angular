firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

  }
  if (user) {}
});

function onLoginButtonClicked() {
  getElement('btnLogin').disabled = true;
  var userEmail = getElement("inputEmail").value
  var userPass = getElement("inputPassword").value

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then((response) => {
      setCookeeValue("loggedInUser", response.user.email, 2);  
      setCookeeValue("loggedInUserName", response.user.displayName, 2); 
      window.location.href = "#/loggedin"
      getElement('btnLogin').disabled = false;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      setMessage(errorMessage);
      getElement('btnLogin').disabled = false;
    });
}