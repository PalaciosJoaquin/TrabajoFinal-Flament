// Funciones para enviar los formularios de cada año
document.getElementById('form-anio1').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        anio: 1,
        anecdota: document.getElementById('anecdota-anio1').value
    };
    await enviarDatos(data);
});

// Repetir lo mismo para los demás formularios (anio2, anio3, etc.)
document.getElementById('form-anio2').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        anio: 2,
        anecdota: document.getElementById('anecdota-anio2').value
    };
    await enviarDatos(data);
});

document.getElementById('form-anio3').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        anio: 3,
        anecdota: document.getElementById('anecdota-anio3').value
    };
    await enviarDatos(data);
});

// Función para guardar datos en la base de datos
async function enviarDatos(data) {
    const response = await fetch('/insertar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.text();
    alert(result);  // Mostrar mensaje de confirmación

    // Después de guardar, recargar las anécdotas
    cargarExperiencias();
}

// Función para enviar las anécdotas de los usuarios
document.getElementById('form-anecdotas').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        anio: 0,  // Para indicar que es una anécdota de usuario
        anecdota: document.getElementById('anecdota-usuario').value
    };
    await enviarDatos(data);
});

// Función para cargar las experiencias de los usuarios desde la base de datos
async function cargarExperiencias() {
    const response = await fetch('/experiencias');
    const experiencias = await response.json();

    const listado = document.getElementById('listado-experiencias');
    listado.innerHTML = '';

    experiencias.forEach((exp) => {
        const div = document.createElement('div');
        div.classList.add('experiencia');
        div.textContent = exp['anecdota que contar'];
        listado.appendChild(div);
    });
}

// Cargar las experiencias cuando la página se carga
window.onload = cargarExperiencias;
