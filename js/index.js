const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Enviar solicitud de inicio de sesión a la API
  fetch('http://127.0.0.1:8000/users/jwt/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((response) => response.json())
    .then((data) => {
      // Si la solicitud es exitosa, se recibe un token de autenticación
      const token = data.token
      // Almacenar el token en el almacenamiento local del navegador
      window.localStorage.setItem('access', token);
      const mitoken = window.localStorage.getItem('access');
      
fetch('http://127.0.0.1:8000/users/jwt/verify/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${mitoken}`
  }
})
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      // maneja el error, por ejemplo, mostrando un mensaje al usuario
      alert('Error al verificar el token');
    } else {
      // maneja el éxito, por ejemplo, permitiendo al usuario acceder a una página protegida
      window.location.href = "menu.html";
    }
  });
    })

    .catch((error) => {
      // Si hay un error, mostrar un mensaje de error al usuario
      console.error(error);
      alert('Error al iniciar sesión. Por favor, verifica tus datos.');
    });
});