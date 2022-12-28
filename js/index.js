loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Enviar solicitud de inicio de sesión a la API
  fetch('http://127.0.0.1:8000/users/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then((response) => response.json())
    .then((data) => {
      // Si la solicitud es exitosa, se recibe un token de autenticación
      const token = data.token
      // Almacenar el token en el almacenamiento local del navegador
      if (data.message === 'Correo inválido o contraseña incorrecta') {
        // Mostrar un mensaje de error al usuario
        alert('Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.');
      } else {
        // Almacenar el token en el almacenamiento local del navegador
        window.localStorage.setItem('access', token);
        const mitoken = window.localStorage.getItem('access');
        console.log(mitoken);
        // Redirigir al usuario a otra página
        window.location.href = "menu.html";
      }
    })
    .catch((error) => {
      // Si hay un error, mostrar un mensaje de error al usuario
      console.error(error);
      if (error.response.status === 401) {
        alert('Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.');
      } else {
        alert('Error al iniciar sesión. Por favor, vuelve a intentarlo más tarde.');
      }
    });
});