// ======================================
// VARIABLES GLOBALES
// ======================================

const API_URL = "http://localhost:3000/productos";

const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const agregarBtn = document.getElementById("agregarBtn");
const sincronizarBtn = document.getElementById("sincronizarBtn");
const listaProductos = document.getElementById("listaProductos");
const mensaje = document.getElementById("mensaje");

// Array global
let productos = [];

// ======================================
// MENSAJES
// ======================================

function mostrarMensaje(texto, tipo = "success") {
    mensaje.textContent = texto;

    if (tipo === "error") {
        mensaje.style.color = "red";
    } else {
        mensaje.style.color = "green";
    }
}

// ======================================
// VALIDACIONES
// ======================================

function validarDatos(nombre, precio) {

    if (nombre.trim() === "") {
        mostrarMensaje("El nombre no puede estar vacío", "error");
        return false;
    }

    if (precio === "" || Number(precio) <= 0) {
        mostrarMensaje("El precio debe ser mayor que 0", "error");
        return false;
    }

    return true;
}

// ======================================
// LOCAL STORAGE
// ======================================

function guardarLocalStorage() {
    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}

function cargarLocalStorage() {

    const datos = localStorage.getItem("productos");

    if (datos) {
        productos = JSON.parse(datos);
        renderizarProductos();
    }
}

// ======================================
// DOM
// ======================================

function renderizarProductos() {

    listaProductos.innerHTML = "";

    productos.forEach(producto => {

        const li = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent =
            `${producto.nombre} - $${producto.precio}`;

        const acciones = document.createElement("div");
        acciones.classList.add("acciones");

        const btnEditar =
            document.createElement("button");

        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", () => {
            editarProducto(producto.id);
        });

        const btnEliminar =
            document.createElement("button");

        btnEliminar.textContent = "Eliminar";

        btnEliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });

        acciones.appendChild(btnEditar);
        acciones.appendChild(btnEliminar);

        li.appendChild(texto);
        li.appendChild(acciones);

        listaProductos.appendChild(li);
    });
}

// ======================================
// AGREGAR PRODUCTO
// ======================================

async function agregarProducto() {

    const nombre = nombreInput.value;
    const precio = precioInput.value;

    if (!validarDatos(nombre, precio)) {
        return;
    }

    const nuevoProducto = {
        id: Date.now(),
        nombre,
        precio: Number(precio)
    };

    productos.push(nuevoProducto);

    guardarLocalStorage();
    renderizarProductos();

    await crearProductoAPI(nuevoProducto);

    nombreInput.value = "";
    precioInput.value = "";

    mostrarMensaje("Producto agregado correctamente");
}

// ======================================
// ELIMINAR PRODUCTO
// ======================================

async function eliminarProducto(id) {

    productos = productos.filter(
        producto => producto.id !== id
    );

    guardarLocalStorage();
    renderizarProductos();

    await eliminarProductoAPI(id);

    mostrarMensaje("Producto eliminado");
}

// ======================================
// EDITAR PRODUCTO
// ======================================

async function editarProducto(id) {

    const producto =
        productos.find(p => p.id === id);

    const nuevoNombre =
        prompt("Nuevo nombre", producto.nombre);

    const nuevoPrecio =
        prompt("Nuevo precio", producto.precio);

    if (!validarDatos(nuevoNombre, nuevoPrecio)) {
        return;
    }

    producto.nombre = nuevoNombre;
    producto.precio = Number(nuevoPrecio);

    guardarLocalStorage();
    renderizarProductos();

    await actualizarProductoAPI(producto);

    mostrarMensaje("Producto actualizado");
}

// ======================================
// FETCH API
// ======================================

// GET

async function obtenerProductosAPI() {

    try {

        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        console.log("GET:", data);

        mostrarMensaje(
            "Datos obtenidos desde la API"
        );

    } catch (error) {

        console.error(error);

        mostrarMensaje(
            "Error al obtener datos",
            "error"
        );
    }
}

// POST

async function crearProductoAPI(producto) {

    try {

        const response =
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify(producto)
            });

        const data =
            await response.json();

        console.log("POST:", data);

    } catch (error) {

        console.error(error);
    }
}

// PUT

async function actualizarProductoAPI(producto) {

    try {

        const response =
            await fetch(
                `${API_URL}/${producto.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(producto)
                }
            );

        const data =
            await response.json();

        console.log("PUT:", data);

    } catch (error) {

        console.error(error);
    }
}

// DELETE

async function eliminarProductoAPI(id) {

    try {

        await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        console.log(
            `DELETE producto ${id}`
        );

    } catch (error) {

        console.error(error);
    }
}

// ======================================
// EVENTOS
// ======================================

agregarBtn.addEventListener(
    "click",
    agregarProducto
);

sincronizarBtn.addEventListener(
    "click",
    obtenerProductosAPI
);

// ======================================
// INICIO
// ======================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarLocalStorage();

        console.log(
            "Local Storage cargado"
        );
    }
);
