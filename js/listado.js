const token = window.localStorage.getItem('access');
const getPayments = () => {
    // Realizar una petición GET a la API
    fetch('http://127.0.0.1:8000/api/payments/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            // Procesar la respuesta de la API
            if (data.success) {
                // Obtener los elementos de la tabla de pagos realizados y vencidos
                const paidTable = document.getElementById('paid-payments-table');
                const overdueTable = document.getElementById('overdue-payments-table');

                // Recorrer los pagos obtenidos de la respuesta de la API
                data.payments.forEach((payment) => {
                    // Crear un elemento <tr> para cada pago
                    const tr = document.createElement('tr');

                    // Crear elementos <td> con los datos de cada pago y agregarlos al elemento <tr>
                    const logoTd = document.createElement('td');
                    logoTd.innerHTML = `<img src="${payment.logoUrl}" alt="Logo del servicio">`;
                    tr.appendChild(logoTd);

                    const serviceTd = document.createElement('td');
                    serviceTd.textContent = payment.service;
                    tr.appendChild(serviceTd);

                    const dateTd = document.createElement('td');
                    dateTd.textContent = payment.date;
                    tr.appendChild(dateTd);

                    const amountTd = document.createElement('td');
                    amountTd.textContent = payment.amount;
                    tr.appendChild(amountTd);

                    // Si el pago está vencido, mostrar la penalidad
                    if (payment.overdue) {
                        const penaltyTd = document.createElement('td');
                        penaltyTd.textContent = payment.penalty;
                        tr.appendChild(penaltyTd);
                    }
                }
                )
            }
        })
};
