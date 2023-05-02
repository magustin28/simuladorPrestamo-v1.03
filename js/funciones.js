//Mostrar productos
function mostrarProductos() {
    const productos = document.querySelector('#productos');
    productos.innerHTML = ``;

    tiposProductos.forEach((producto) => {

        productos.innerHTML += `

        <div class="col-2 mx-2 d-flex flex-column justify-content-evenly align-items-center cardProductos">
            <p class="mb-0">${producto.nombre}</p>
            <p class="mb-0">${producto.disponible}</p>
        </div>
        `;
    });
}

// Mostrar detalle de prestamo
function mostrarPrestamos() {
    const div = document.querySelector('#prestamo');
    div.innerHTML = ``;

    tiposPrestamos.forEach((prestamo, index) => {

        const id = `collapse${index}`;
        div.innerHTML += `
    
            <div class="col mt-4 mx-2 accordion" id="accordionExample">
                <div class="accordion-item">
                    <p class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="true" aria-controls="${id}">
                        Linea de Préstamo: ${prestamo.nombre}
                        </button>
                    </p>
                    <div id="${id}" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <p>Edad mínima: ${prestamo.edadMinima} años</p>
                            <p>Edad límite: ${prestamo.edadMaxima} años</p>
                            <p>Monto máximo a solicitar: ${formatoPesos(prestamo.montoMaxino)}</p>
                            <p>Requiere de garantía: ${prestamo.garantia}</p>
                            <p>Tipo de garantía: ${prestamo.tipoGarantia}</p>
                            <p>Tasa: ${prestamo.tasa * 100}% TNA</p>
                            <p>Seguro: ${prestamo.seguro * 100}% sobre el capital solicitado</p>
                            <p>Mínimo de cuotas a solicitar: ${prestamo.cuotasMinimo} cuotas</p>
                            <p>Máximo de cuotas a solicitar: ${prestamo.cuotasMaximo} cuotas</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Formato Dinero/Pesos
function formatoPesos(valor) {
    return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

//Calcular la edad
function edad(valor) {
    let componentesFecha = valor.split("-");
    let fechaNacimiento = new Date(componentesFecha[0], componentesFecha[1] - 1, componentesFecha[2]);
    let diferenciaMilisegundos = new Date() - fechaNacimiento;
    let edad = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365));
    return edad;
}

//Elgir filtro según la edad
function selectorFiltro(funcionEdad) {
    let arraySeleccionado;

    if (funcionEdad >= 18 && funcionEdad <= 35) {
        arraySeleccionado = prestamoFiltro18a80;
    } else if (funcionEdad >= 65) {
        arraySeleccionado = prestamoFiltroMas80;
    } else {
        arraySeleccionado = prestamoFiltro35a80;
    }

    return arraySeleccionado;
}

//Mensaje de Tipos de Préstamos de acuerdo a la edad
function mensajePrestamoEdad(valor, filtro) {

    const mensajePrestamoEdad = document.querySelector('#mensajePrestamoEdad');
    mensajePrestamoEdad.innerHTML = `De acuerdo a su edad: ${edad(valor)} años, puede acceder a las siguentes opciones de préstamos:`;

    const mensajePrestamoEdadUl = document.querySelector('#mensajePrestamoEdadUl');
    mensajePrestamoEdadUl.innerHTML = ``;

    mensajePrestamoEdad.classList.add('mx-4');
    mensajePrestamoEdadUl.classList.add('mx-4');

    filtro.forEach((prestamo) => {
        mensajePrestamoEdadUl.innerHTML += `
        <li class="my-2">${prestamo.nombre}</li>
        `;
    });
}

//Listado de Tipos de Préstamos de acuerdo a la edad
function listadoPrestamos(filtro) {
    const listadoPrestamos = document.querySelector('#listadoPrestamos');
    listadoPrestamos.innerHTML = `<option></option>`;

    filtro.forEach((prestamo) => {
        listadoPrestamos.innerHTML += `
        <option>${prestamo.nombre}</option>
        `;
    });
}

//Buscar dentro de Objetos por Nombre
function buscarArraysPorNombre(array, valor) {
    selecion = array.find((objeto) => objeto.nombre == valor);
    return selecion;
}

//Consulta hitorial de simulaciones
function consultaHistorial() {
    historialSimulacionesGuardadas = JSON.parse(localStorage.getItem('historialSimulaciones')) || [];
}

//Crea copia de la simulcion realizada
function crearCopiaSimulacion(fechaNacimiento) {

    const nuevaSimulacion = new SimuladorHistorial();

    const fechaDia = new Date();
    const fechaDiaF = `${fechaDia.getDay()}/${fechaDia.getMonth()+1}/${fechaDia.getFullYear()}`;


    nuevaSimulacion.id = Math.floor(Math.random() * 100000) + 1;
    nuevaSimulacion.fechaSimulacion = fechaDiaF;
    nuevaSimulacion.fechaNacimiento = fechaNacimiento;
    nuevaSimulacion.edad = edad(fechaN);
    nuevaSimulacion.lineaPrestamo = buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).nombre;
    nuevaSimulacion.nivelIngresos = formatoPesos(parseInt(nivelIngresos.value));
    nuevaSimulacion.montoPrestamo = formatoPesos(parseInt(montoPrestamo.value));
    nuevaSimulacion.tasaPrestamo = buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).tasa;
    nuevaSimulacion.cantidadCuotas = parseInt(cantidadCuotas.value);
    nuevaSimulacion.valorCuota = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).valorCuota(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)));
    nuevaSimulacion.interes = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoInteres(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)));
    nuevaSimulacion.seguro = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoSeguro(montoPrestamo.value));
    nuevaSimulacion.iva = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoIva(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)));
    nuevaSimulacion.importeTotal = formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).totalAPagar(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)));
    nuevaSimulacion.cft = buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cft(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value));
    nuevaSimulacion.buscador = nuevaSimulacion.buscadorF();

    historialSimulacionesGuardadas.push(nuevaSimulacion);

    localStorage.setItem('historialSimulaciones', JSON.stringify(historialSimulacionesGuardadas));
}

//Consultar historial
function listadoHistorial(filtro) {
    const listadoHistorial = document.querySelector('#listadoHistorial');
    listadoHistorial.innerHTML = `<option></option>`;

    filtro.forEach((simulacion) => {
        listadoHistorial.innerHTML += `
        <option>Fecha: ${simulacion.fechaSimulacion} - Prestamo: ${simulacion.montoPrestamo}</option>
        `;
    });
}

//Buscar dentro de Objetos por Buscado
function buscarArraysPorBuscador(array, buscador) {
    selecion = array.find((objeto) => objeto.buscador == buscador);
    return selecion;
}