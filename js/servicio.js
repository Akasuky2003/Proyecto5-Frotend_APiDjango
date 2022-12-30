// Archivo forms.js

// Obtener el formulario "Añadir nuevo Servicio"
const addForm = document.getElementById('Anadir-Nuevo-servicio');

// Función para manejar el envío del formulario "Añadir nuevo Servicio"
const handleAddSubmit = (event) => {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const name = document.getElementById('nombre').value;
    const prefix = document.getElementById('prefijo').value;
    const logoUrl = document.getElementById('urllogo').value;

    // Obtener el token de autenticación almacenado en el almacenamiento local del navegador
    const token = window.localStorage.getItem('access');

    // Realizar una petición POST a la API con los datos del formulario y el token de autenticación
    fetch('http://127.0.0.1:8000/api/services/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            prefix: prefix,
            logoUrl: logoUrl
        })
    })
        .then((response) => response.json())
        .then((data) => {
            // Procesar la respuesta de la API
            if (data.success) {
                // Mostrar un mensaje de éxito al usuario
                alert('Servicio añadido con éxito');
            } else {
                // Mostrar un mensaje de error al usuario
                alert('Error al añadir el servicio. Por favor, vuelve a intentarlo más tarde.');
            }
        })
        .catch((error) => {
            // Procesar el error de la petición
            console.error(error);
            alert('Error al añadir el servicio. Por favor, vuelve a intentarlo más tarde.');
        });
};

// Asignar la función como controlador del evento 'submit' del formulario "Añadir nuevo Servicio"
addForm.addEventListener('submit', handle)
// Obtener el formulario "Modificar Servicio"
const modifyForm = document.getElementById('Modificar-servicio');

// Función para manejar el envío del formulario "Modificar Servicio"
const handleModifySubmit = (event) => {
    event.preventDefault();

    // Obtener el valor seleccionado en el campo "Servicio"
    const serviceId = document.getElementById('servicio').value;

    // Obtener los valores de los demás campos del formulario
    const name = document.getElementById('nombre').value;
    const prefix = document.getElementById('prefijo').value;
    const logoUrl = document.getElementById('urllogo').value;

    // Obtener el token de autenticación almacenado en el almacenamiento local del navegador
    const token = window.localStorage.getItem('access');

    // Realizar una petición PUT a la API con los datos del formulario y el token de autenticación
    fetch(`http://127.0.0.1:8000/api/services/${serviceId}/`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            prefix: prefix,
            logoUrl: logoUrl
        })
    })
        .then((response) => response.json())
        .then((data) => {
            // Procesar la respuesta de la API
            if (data.success) {
                // Mostrar un mensaje de éxito al usuario
                alert('Servicio modificado con éxito');
            } else {
                // Mostrar un mensaje de error al usuario
                alert('Error al modificar el servicio. Por favor, vuelve a intentarlo más tarde.');
            }
        })
        .catch((error) => {
            // Procesar el error de la petición
            console.error(error);
            alert('Error al modificar el servicio. Por favor, vuelve a intentarlo más tarde.');
        });
};
