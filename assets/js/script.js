// ==========================================
// Carrito de compras
// ==========================================

var carrito = [];

function agregarAlCarrito(nombre, precio) {
    // Verificar si ya está en el carrito
    var encontrado = false;
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombre) {
            carrito[i].cantidad++;
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    actualizarCarrito();
    alert("¡\"" + nombre + "\" fue agregado al carrito!");
}

function quitarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    var contenedor = document.getElementById("carrito-items");
    var totalEl = document.getElementById("carrito-total");
    var botonCarrito = document.getElementById("btn-carrito");

    if (!contenedor) return;

    // Actualizar contador del botón
    var totalItems = 0;
    for (var i = 0; i < carrito.length; i++) {
        totalItems += carrito[i].cantidad;
    }
    if (botonCarrito) {
        botonCarrito.textContent = "🛒 Carrito (" + totalItems + ")";
    }

    // Mostrar items
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='carrito-vacio'>El carrito está vacío</p>";
        if (totalEl) totalEl.textContent = "Total: $0.00";
        return;
    }

    var html = "";
    var total = 0;

    for (var j = 0; j < carrito.length; j++) {
        var item = carrito[j];
        var subtotal = item.precio * item.cantidad;
        total += subtotal;
        html += "<div class='carrito-item'>";
        html += "<span>" + item.nombre + " x" + item.cantidad + "</span>";
        html += "<span>$" + subtotal.toFixed(2) + "</span>";
        html += "<button onclick='quitarDelCarrito(" + j + ")'>✕</button>";
        html += "</div>";
    }

    contenedor.innerHTML = html;
    if (totalEl) totalEl.textContent = "Total: $" + total.toFixed(2);
}

function toggleCarrito() {
    var panel = document.getElementById("carrito-panel");
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}


// ==========================================
// Filtros en página de productos
// ==========================================

function aplicarFiltros() {
    var checkboxes = document.querySelectorAll(".filtro-genero");
    var precioMax = document.getElementById("precio-rango");
    var libros = document.querySelectorAll(".libro-card");

    var generosSeleccionados = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            generosSeleccionados.push(checkboxes[i].value);
        }
    }

    var precioLimite = precioMax ? parseFloat(precioMax.value) : 9999;

    var contador = 0;
    for (var j = 0; j < libros.length; j++) {
        var libro = libros[j];
        var generoLibro = libro.getAttribute("data-genero");
        var precioLibro = parseFloat(libro.getAttribute("data-precio"));

        var pasaGenero = generosSeleccionados.length === 0 || generosSeleccionados.indexOf(generoLibro) !== -1;
        var pasaPrecio = precioLibro <= precioLimite;

        if (pasaGenero && pasaPrecio) {
            libro.style.display = "block";
            contador++;
        } else {
            libro.style.display = "none";
        }
    }

    var contadorEl = document.getElementById("contador-libros");
    if (contadorEl) {
        contadorEl.textContent = "Mostrando " + contador + " libros";
    }
}

function actualizarPrecio() {
    var rango = document.getElementById("precio-rango");
    var etiqueta = document.getElementById("precio-valor");
    if (rango && etiqueta) {
        etiqueta.textContent = "$" + rango.value;
    }
    aplicarFiltros();
}


// ==========================================
// Validación del formulario de contacto
// ==========================================

function validarFormulario(event) {
    event.preventDefault();

    var hayError = false;

    // Limpiar errores anteriores
    var grupos = document.querySelectorAll(".form-grupo");
    for (var i = 0; i < grupos.length; i++) {
        grupos[i].classList.remove("tiene-error");
    }

    // Validar nombre
    var nombre = document.getElementById("nombre");
    if (!nombre.value.trim()) {
        mostrarError("nombre", "El nombre es obligatorio.");
        hayError = true;
    } else if (nombre.value.trim().length < 3) {
        mostrarError("nombre", "El nombre debe tener al menos 3 caracteres.");
        hayError = true;
    }

    // Validar ciudad
    var ciudad = document.getElementById("ciudad");
    if (!ciudad.value.trim()) {
        mostrarError("ciudad", "La ciudad es obligatoria.");
        hayError = true;
    }

    // Validar email
    var email = document.getElementById("email");
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        mostrarError("email", "El email es obligatorio.");
        hayError = true;
    } else if (!regexEmail.test(email.value.trim())) {
        mostrarError("email", "El email no tiene un formato válido (ej: correo@ejemplo.com).");
        hayError = true;
    }

    // Validar asunto
    var asunto = document.getElementById("asunto");
    if (!asunto.value) {
        mostrarError("asunto", "Por favor selecciona un asunto.");
        hayError = true;
    }

    // Validar descripción
    var descripcion = document.getElementById("descripcion");
    if (!descripcion.value.trim()) {
        mostrarError("descripcion", "La descripción es obligatoria.");
        hayError = true;
    } else if (descripcion.value.trim().length < 10) {
        mostrarError("descripcion", "La descripción debe tener al menos 10 caracteres.");
        hayError = true;
    }

    // Si no hay errores, mostrar mensaje de éxito
    if (!hayError) {
        document.getElementById("formulario-contacto").style.display = "none";
        document.getElementById("mensaje-exito").style.display = "block";
    }
}

function mostrarError(campoId, mensaje) {
    var campo = document.getElementById(campoId);
    var grupo = campo.closest(".form-grupo");
    var errorEl = grupo.querySelector(".error-texto");
    grupo.classList.add("tiene-error");
    errorEl.textContent = mensaje;
}


// ==========================================
// Menú responsive (hamburguesa simple)
// ==========================================

function toggleMenu() {
    var menu = document.getElementById("menu-nav");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}
