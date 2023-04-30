mostrarPrestamos();

const consultarEdad = document.querySelector('#consultarEdad');
const fechaNacimiento = document.querySelector('#fechaNacimiento');

consultarEdad.onclick = function () {
    fechaN = document.querySelector('#fechaN').value;

    let componentesFecha = fechaN.split("-");
    let date = `${componentesFecha[2]}/${componentesFecha[1]}/${componentesFecha[0]}`;
    fechaNacimiento.innerHTML = `Fecha de Nacimiento: ${date}`;

    mensajePrestamoEdad(fechaN, selectorFiltro(edad(fechaN)));
    listadoPrestamos(selectorFiltro(edad(fechaN)));
}

const seleccionarPrestamo = document.querySelector('#seleccionarPrestamo');
const prestamoSelecionado = document.querySelector('#prestamoSelecionado');

const montoMaximo = document.querySelector('#montoMaximo');
const cuotasMaximas = document.querySelector('#cuotasMaximas');

const montoPrestamo = document.querySelector('#montoPrestamo');
const cantidadCuotas = document.querySelector('#cantidadCuotas');

seleccionarPrestamo.onclick = function () {
    prestamoSelecionado.innerHTML = `Usted a seleccionado ${document.querySelector('#listadoPrestamos').value}<br>Para simular su préstamo vamos a necesitar que nos indique los siguientes datos:`;

    montoMaximo.innerHTML = `Monto máximo a solicitar: ${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).montoMaxino)}`;

    cuotasMaximas.innerHTML = `Cantidad máxima de cuotas a solicitar: ${buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cuotasMaximo} cuotas`;

    montoPrestamo.dispatchEvent(new Event('change'));

    cantidadCuotas.dispatchEvent(new Event('change'));
}

const success = ['border', 'border-success', 'border-3'];
const danger = ['border', 'border-danger', 'border-3'];

montoPrestamo.onchange = () => {
    if (montoPrestamo.value > buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).montoMaxino) {
        success.forEach(clase => { montoPrestamo.classList.remove(clase) })
        danger.forEach(clase => { montoPrestamo.classList.add(clase) })
    } else if(montoPrestamo.value != 0) {
        danger.forEach(clase => { montoPrestamo.classList.remove(clase) })
        success.forEach(clase => { montoPrestamo.classList.add(clase) })
    }
};

cantidadCuotas.onchange = () => {
    if (cantidadCuotas.value > buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cuotasMaximo) {
        success.forEach(clase => { cantidadCuotas.classList.remove(clase) })
        danger.forEach(clase => { cantidadCuotas.classList.add(clase) })
    } else if(cantidadCuotas.value != 0) {
        danger.forEach(clase => { cantidadCuotas.classList.remove(clase) })
        success.forEach(clase => { cantidadCuotas.classList.add(clase) })
    }
};