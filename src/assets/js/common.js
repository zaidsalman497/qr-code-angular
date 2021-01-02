  
function getElement(id) {
  return document.getElementById(id);
}

function setMessage(message) {
  document.getElementById('status').textContent = message;
}

function setCookeeValue(name, value, expirydays) {
  var today = new Date();
  var expire = new Date();
  expire.setTime(today.getTime() + 60 * 60 * 1000 * 24 * expirydays);
  var expiryString = expire.toGMTString();

  document.cookie = `${name}= ${escape(value)}; expires= ${expiryString}`;
}

function getCookieByName(name) {
  function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? decodeURI(match[1]) : null;
}

function checkUser() {
  var loggedInUser = getCookieByName("loggedInUser");
  if (!loggedInUser) {
      window.location.href = "#/login";
  } else {
    getElement('loggedInUsertext').textContent = getCookieByName("loggedInUserName"); 
  }
}


function logoutUser() {
  setCookeeValue("loggedInUser", "", 0);
  checkUser();
}

function emailsandpasswords() {
  displayuser()
}

function displayuser() {
  display = userInfo;
}