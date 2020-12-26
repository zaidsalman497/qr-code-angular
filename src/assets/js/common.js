  
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
  return match ? match[1] : null;
}

function isPageSecure() {
  var securePages = [ 'loggedin', 'download'];
  var isSecure = securePages.some(securePage => {
    return window.location.href.includes(securePage);
  });
  return isSecure;
}

function checkUser() {
  var loggedInUser = getCookieByName("loggedInUser");
  if (!loggedInUser && isPageSecure()) {
      window.location.href = "#/login";
  } 
}


function logoutUser() {
  setCookeeValue("loggedInUser", "", 0);
  checkUser();
}