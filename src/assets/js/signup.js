function onSignUpButtonClicked() {
  getElement('btnSignUp').disabled = true;
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;

  setMessage('Calling create user...');
  createUser(email, password);

}


function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
      getElement('btnSignUp').disabled = false;
      document.getElementById('status').value = 'Sucessful signin :)';
      var user = firebase.auth().currentUser;
      // Signed in 
      user.updateProfile({
        displayName: getElement('inputusername').value //,  // photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function () {
        setMessage('Updated user name...');
        setMessage('Successful signin :)');
        setCookeeValue("loggedInUser", email, 2);
        setCookeeValue("loggedInUserName", getElement('inputusername').value, 2);
        setCookeeValue("loggedinUserImg", "", 2);
        window.location.href = "#/loggedin"


      }).catch(function (error) {
        // An error happened.
      });

    })

    .catch((error) => {
      getElement('btnSignUp').disabled = false;
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      setMessage(errorMessage);
    });
}
