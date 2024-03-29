  
function getElement(id: string): any {
    return document.getElementById(id);
  }
  
  function setMessage(message: string) {
    getElement('status').textContent = message;
  }
  
  function setCookeeValue(name: string, value: string, expirydays: number) {
    var today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 60 * 60 * 1000 * 24 * expirydays);
    var expiryString = expire.toUTCString();
  
    document.cookie = `${name}= ${escape(value)}; expires= ${expiryString}`;
  }
  
  function getCookieByName(name: string) {
    function escape(s: string) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? decodeURI(match[1]) : null;
  }
  
 export function checkUser() {
    var loggedInUser = getCookieByName("loggedInUser");
    if (!loggedInUser) {
        window.location.href = "/login";
    } else {
      getElement('loggedInUsertext').textContent = getCookieByName("loggedInUserName"); 
      var imgUrl = getCookieByName('loggedInUserImgUrl');
      if(imgUrl) {
        getElement('loggedinUserImg').style.display = 'block';
        getElement('loggedinUserImg').src = unescape(imgUrl);
      } else {
        getElement('loggedinUserImg').style.display = 'none';
      }
      
      
    }
  }
  
  
  function logoutUser() {
    setCookeeValue("loggedInUser", "", 0);
    setCookeeValue("loggedInUserName", "", 0);
    setCookeeValue('loggedInUserImgUrl', "", 0);
    checkUser();
  }
  
 