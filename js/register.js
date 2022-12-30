const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('password-confirmation').value;

    // Validar los campos del formulario (asegurarse de que todos los campos estén llenos y que las contraseñas coincidan)
    if (!name || !email || !password || !passwordConfirmation || password !== passwordConfirmation) {
        // Mostrar un mensaje de error al usuario
        Swal.fire({
            title: 'Has llenado Todo los campos?',
            text: "Por favor, verifica que hayas llenado todos los campos y que las contraseñas coincidan.",
            icon: 'warning',
          })
        
        return;
    }

    // Enviar solicitud de registro a la API
    fetch('http://127.0.0.1:8000/users/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: name,
            email: email,
            password: password
        })
    })
        .then((response) => response.json())
        .then((data) => {
            // Si la solicitud es exitosa, mostrar un mensaje de éxito al usuario y redirigirlo a la página de inicio de sesión
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Te has registrado con éxito! Ya puedes iniciar sesión.',
                showConfirmButton: false,
                timer: 1300
              }).then(() => {
                window.location.href = "index.html";
              });
        })
        .catch((error) => {
            // Si hay un error, mostrar un mensaje de error al usuario
            console.error(error);
            if (error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al registrarse. Por favor, verifica que hayas llenado todos los campos correctamente.',
                    
                  })
                
            } else if (error.response.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al registrarse. Ya existe un usuario con ese correo electrónico.',
                    
                  })
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al registrarse. Por favor, vuelve a intentarlo más tarde.',
                    
                  })
                
            }
        });
});