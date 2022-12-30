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
      // Si la solicitud es exitosa, se recibe un token de autenticación y el id del usuario
      const token = data.token
      const userId = data.id;
      // Almacenar el token en el almacenamiento local del navegador
      if (data.message === 'Correo inválido o contraseña incorrecta') {
        // Mostrar un mensaje de error al usuario
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.',
          footer: '<a href="register.html">Te as Registrado?</a>'
        })
      } else {
        // Almacenar el token en el almacenamiento local del navegador
        window.localStorage.setItem('access', token);
        window.localStorage.setItem('userId', userId);
        const mitoken = window.localStorage.getItem('access');
        console.log(mitoken);
        // Redirigir al usuario a otra página
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Te has registrado con éxito! Ya puedes iniciar sesión.',
          showConfirmButton: false,
          timer: 1500
        });
        
        setTimeout(() => {
          window.location.href = "menu.html";
        }, 1500);
        
      }
    })
    .catch((error) => {
      // Si hay un error, mostrar un mensaje de error al usuario
      console.error(error);
      if (error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.',
          footer: '<a href="register.html">Te as Registrado?</a>'
        })

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al iniciar sesión. Por favor, vuelve a intentarlo más tarde',
          footer: '<a href="register.html">Te as Registrado?</a>'
        })
      }
    });
});