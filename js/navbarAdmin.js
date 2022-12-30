const token = window.localStorage.getItem('access');
// Enviar una solicitud HTTP para obtener la información del usuario
fetch('http://127.0.0.1:8000/api/users/me/', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
  .then(response => response.json())
  .then(data => {
    // Verificar si el usuario es un superusuario
    if (data.is_superuser) {
      ('#admin-link').removeClass('d-none');
      console.log('El usuario es un superusuario');
    } else {
      console.log('El usuario no es un superusuario');
    }
  })
  .catch(error => {
    console.error(error);
  });