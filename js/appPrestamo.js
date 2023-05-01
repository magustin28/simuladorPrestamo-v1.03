mostrarPrestamos();

const consultarEdad = document.querySelector('#consultarEdad');
const fechaNacimiento = document.querySelector('#fechaNacimiento');

const fechaNacimientoClass = ['m-4', 'text-end'];

consultarEdad.addEventListener('click', function () {
    fechaN = document.querySelector('#fechaN').value;

    let componentesFecha = fechaN.split("-");
    let date = `${componentesFecha[2]}/${componentesFecha[1]}/${componentesFecha[0]}`;
    fechaNacimiento.innerHTML = `Fecha de Nacimiento: ${date}`;

    mensajePrestamoEdad(fechaN, selectorFiltro(edad(fechaN)));
    listadoPrestamos(selectorFiltro(edad(fechaN)));

    fechaNacimientoClass.forEach(clase => { fechaNacimiento.classList.add(clase) })
    mensajePrestamoEdad.classList.add('m-4');
    mensajePrestamoEdadUl.classList.add('m-4');
});

const seleccionarPrestamo = document.querySelector('#seleccionarPrestamo');
const prestamoSelecionado = document.querySelector('#prestamoSelecionado');

const montoMaximo = document.querySelector('#montoMaximo');
const cuotasMaximas = document.querySelector('#cuotasMaximas');

const montoPrestamo = document.querySelector('#montoPrestamo');
const cantidadCuotas = document.querySelector('#cantidadCuotas');

seleccionarPrestamo.addEventListener('click', function () {
    prestamoSelecionado.innerHTML = `Usted a seleccionado ${document.querySelector('#listadoPrestamos').value}<br>Para simular su préstamo vamos a necesitar que nos indique los siguientes datos:`;

    prestamoSelecionado.classList.add('m-4');

    montoMaximo.innerHTML = `Monto máximo a solicitar: ${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).montoMaxino)}`;

    cuotasMaximas.innerHTML = `Cantidad máxima de cuotas a solicitar: ${buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cuotasMaximo} cuotas`;

    montoPrestamo.dispatchEvent(new Event('change'));

    cantidadCuotas.dispatchEvent(new Event('change'));
});

const successClass = ['border', 'border-success', 'border-3'];
const dangerClass = ['border', 'border-danger', 'border-3'];

montoPrestamo.addEventListener('change', function () {
    if (montoPrestamo.value > buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).montoMaxino) {
        successClass.forEach(clase => { montoPrestamo.classList.remove(clase) })
        dangerClass.forEach(clase => { montoPrestamo.classList.add(clase) })
    } else if (montoPrestamo.value != 0) {
        dangerClass.forEach(clase => { montoPrestamo.classList.remove(clase) })
        successClass.forEach(clase => { montoPrestamo.classList.add(clase) })
    }
});

cantidadCuotas.addEventListener('change', function () {
    if (cantidadCuotas.value > buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cuotasMaximo) {
        successClass.forEach(clase => { cantidadCuotas.classList.remove(clase) })
        dangerClass.forEach(clase => { cantidadCuotas.classList.add(clase) })
    } else if (cantidadCuotas.value != 0) {
        dangerClass.forEach(clase => { cantidadCuotas.classList.remove(clase) })
        successClass.forEach(clase => { cantidadCuotas.classList.add(clase) })
    }
});

const btnSimular = document.querySelector('#btnSimular');
const resultadoSimulador = document.querySelector('#resultadoSimulador');


btnSimular.addEventListener('click', function () {

    if ((montoPrestamo.value <= buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).montoMaxino) && (cantidadCuotas.value <= buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cuotasMaximo) && (montoPrestamo.value !== 0) && (cantidadCuotas.value !== 0)) {

        let componentesFecha = fechaN.split("-");
        let date = `${componentesFecha[2]}/${componentesFecha[1]}/${componentesFecha[0]}`;

        resultadoSimulador.innerHTML = `
            <p class="mx-2">Le detallamos la simulación de su préstamo:</p>
            <div class="row d-flex justify-content-around">
                <div class="col-5">
                    <p>* Fecha de Nacimiento: ${date}</p>
                    <p>* Edad: ${edad(fechaN)} años</p>
                    <p>* Monto del préstamo a solicitar: ${formatoPesos(parseInt(montoPrestamo.value))}</p>
                    <p>* Tiene que ingresar ${cantidadCuotas.value} cuotas de ${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).valorCuota(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</p>
                </div>
                <div class="col-5">
                    <p>Capital: ${formatoPesos(parseInt(montoPrestamo.value))}</p>
                    <p>Interes: ${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoInteres(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</p>
                    <p>Seguro: ${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoSeguro(montoPrestamo.value))}</p>
                    <p>IVA: ${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoIva(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))} (sobre Int. y Seg.)</p>
                    <p>Importe total: ${formatoPesos(buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).totalAPagar(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</p>
                    <p>CFT: ${buscarArraysPorNombre(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cft(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value))}%</p>
                </div>
            </div>
            <div>
                <p class="mt-4 text-center">¿Quiere guardar la simulación calculada?</p>
                <div class="my-4 row d-flex justify-content-around">
                    <button class="col-3 mx-auto btn btn-success" type="button" id="guardarSimulacion">Si</button>
                    <button class="col-3 mx-auto btn btn-danger" type="button" id="reinicar">No</button>
                </div>
            </div>
        `;


        const guardarSimulacion = document.querySelector('#guardarSimulacion');
        const reinicar = document.querySelector('#reinicar');

        reinicar.addEventListener('click', function () {
            location.reload();
        });

    } else {
        resultadoSimulador.innerHTML = `
        <p class="mx-2">Ingrese los parámtros correctos</p>
        `;
    }
});