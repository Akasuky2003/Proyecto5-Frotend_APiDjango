function getEmailHash(email) {
    return CryptoJS.MD5(email.trim().toLowerCase());
  }
document.addEventListener('DOMContentLoaded', () => {
    const userId = window.localStorage.getItem('userId');
    getUserById(userId);
    console.log(userId);
});

function getUserById(userId) {
    fetch(`http://127.0.0.1:8000/users/10/`)
        .then(response => response.json())
        .then(json => {
            // aquí puedes hacer algo con el usuario obtenido
            console.log(json);
            const email = json.email;
            const userName = json.username;

            const userNameElement = document.getElementById('usernamenavbar');
            userNameElement.textContent = userName;
            userNameElement.innerHTML = userName;
            const emailElement = document.getElementById('emailnavbar');
            emailElement.textContent = email;
            emailElement.innerHTML = email;

            const idHash = getEmailHash(userId);
            const gravatarUrl = `https://www.gravatar.com/monsterid/${idHash}`;
            const gravatarImg = document.getElementById('gravatar');
            gravatarImg.src = gravatarUrl;
            
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener el usuario:', error);
        });
}