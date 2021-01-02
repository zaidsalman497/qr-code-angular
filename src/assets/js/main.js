firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
  
    }
    if (user) {}
  });
  
  function onLoginButtonClicked() {
    getElement('btnLogin').disabled = true;
    const useradminEmail = getElement("inputAdminEmail").value;
    const useradminPass = getElement("inputAdminPassword").value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass, useradminEmail, useradminPass)
      .then((response) => {
        setCookeeValue("loggedInUser", response.user.email, 2);  
        setCookeeValue("loggedInUserName", response.user.displayName, 2); 
        window.location.href = "#loggedin"
        getElement('btnLogin').disabled = false;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setMessage(errorMessage);
        getElement('btnLogin').disabled = false;
      });
  }