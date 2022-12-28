function getEmailHash(email) {
    return CryptoJS.MD5(email.trim().toLowerCase());
  }
  
  var email = '[EMAIL ADDRESS]';
  var emailHash = getEmailHash(email);