function loadNavbar() {
    const xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const navbarContainer = document.getElementById('navbar-container');
        navbarContainer.innerHTML = xhr.responseText;
      }
    };
  
    xhr.open('GET', 'navbar.html');
    xhr.send();
  }
  
  loadNavbar();
