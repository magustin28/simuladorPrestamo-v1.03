//Mostrar productos
function mostrarProductos() {
    const div = document.querySelector('#productos');
    div.innerHTML = ``;

    tiposProductos.forEach((producto) => {

        div.innerHTML += `

        <div class="col mt-4 mx-2 text-center cardProductos">
            <p>${producto.nombre}</p>
            <p>${producto.disponible}</p>
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
                    <div id="${id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>Edad mínima: ${prestamo.edadMinima} años</p>
                            <p>Edad límite: ${prestamo.edadMaxima} años</p>
                            <p>Monto máximo a solicitar: ${formatoPesos(prestamo.montoMaxino)}</p>
                            <p>Requiere de garantía: ${prestamo.garantia}</p>
                            <p>Tipo de garantía: ${prestamo.tipoGarantia}</p>
                            <p>Tasa: ${prestamo.tasa * 100}% TNA</p>
                            <p>Seguro: ${prestamo.seguro * 100}% sobre el capital solicitado</p>
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
    } else if (funcionEdad >= 80) {
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

    filtro.forEach((prestamo) => {
        mensajePrestamoEdadUl.innerHTML += `
        <li>${prestamo.nombre}</li>
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