const form = document.querySelector('form');
const token = window.localStorage.getItem('access');

fetch('http://127.0.0.1:8000/pagos/', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Do something with the response data
  })
  .catch(error => {
    console.error(error);
  });
form.addEventListener('submit', event => {
  event.preventDefault();

  // Collect the form data
  const fechaVencimiento = document.querySelector('#fechaVencimiento').value;
  const servicio = document.querySelector('#servicio').value;
  const monto = document.querySelector('#monto').value;

  // Create the payload object
  const payload = {
    fecha_pago: fechaVencimiento,
    servicio: servicio,
    monto: monto,
  };

  // Make the POST request
  fetch('http://127.0.0.1:8000/pagos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Do something with the response data
    })
    .catch(error => {
      console.error(error);
    });
});