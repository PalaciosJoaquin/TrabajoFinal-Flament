let carrito = [];

function agregarAlCarrito(producto, cantidad, precio) {
    const item = carrito.find((articulo) => articulo.producto === producto);
    if (item) {
        item.cantidad += cantidad;
        item.precio += precio;
    } else {
        carrito.push({ producto, cantidad, precio });
    }
    actualizarCarrito();
}

function quitarDelCarrito(producto) {
    const itemIndex = carrito.findIndex((articulo) => articulo.producto === producto);
    if (itemIndex !== -1) {
        carrito.splice(itemIndex, 1);
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const tablaCarrito = document.querySelector("#tabla-carrito tbody");
    tablaCarrito.innerHTML = "";

    carrito.forEach((item) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.producto}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
        `;
        tablaCarrito.appendChild(fila);
    });
}

function realizarCompra() {
    const nombre = document.getElementById("nombre").value;
    const dni = document.getElementById("dni").value;

    if (!nombre || !dni || carrito.length === 0) {
        alert("Por favor, completa tu nombre, DNI y añade productos al carrito.");
        return;
    }

    carrito.forEach((item) => {
        fetch("procesar_compra.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dni,
                nombre,
                camiseta: item.producto,
                cantidad: item.cantidad,
                deuda: item.precio,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Compra realizada con éxito.");
                carrito = [];
                actualizarCarrito();
            })
            .catch((error) => {
                console.error("Error al procesar la compra:", error);
            });
    });
}
