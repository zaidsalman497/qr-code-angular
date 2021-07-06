function onAdminLoginButtonClicked() {
  getElement('btnAdminLogin').disabled = true;
  const userAdminEmail = getElement("inputAdminEmail").value;
  const userAdminPass = getElement("inputAdminPassword").value;
  firebase.auth().signInWithEmailAndPassword(userAdminEmail, userAdminPass)
    .then((response) => {
      setCookeeValue("loggedInUser", response.user.email, 2);  
      setCookeeValue("loggedInUserName", response.user.displayName, 2); 
      window.location.href = "https://console.firebase.google.com/u/0/project/qr-code-website/authentication/users"
      getElement('btnAdminLogin').disabled = false;
    })
    .catch((error) => {
      var errorMessage = error.message;
      setMessage(errorMessage);
      getElement('btnAdminLogin').disabled = false;
    });
}