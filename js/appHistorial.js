consultaHistorial();

const verHistorial = document.querySelector('#verHistorial');
const verSimulacion = document.querySelector('#verSimulacion');

if (historialSimulacionesGuardadas.length == 0) {
    verHistorial.innerHTML = `
        <p class="col-9 mb-0 me-2 text-center fs-5">No tiene historial para revisar</p>
        <a class="col-2 btn btn-outline-info" href="prestamo.html">Regresar a Préstamos</a>
        `;
} else {
    verHistorial.innerHTML = `
        <p class="col-3 mb-0 ">Seleccione una de las opciones</p>
        <select class="col-3" id="listadoHistorial"></select>
        <div class="col-5 row d-flex align-items-center justify-content-evenly">
            <button class="col-3 my-2 me-2 btn btn-outline-success" type="button" id="seleccionarHistorial">Consultar</button>
            <button class="col-3 my-2 me-2 btn btn-outline-danger" type="button" id="borrarSimulacion">Eliminar</button>
            <button class="col-3 my-2 me-2 btn btn-outline-secondary" type="button" id="limpiarConsulta">Limpiar</button>
            <button class="col-3 my-2 me-2 btn btn-danger" type="button" id="borrarHistorial">Eliminar Todo</button>
            <a class="col-5 btn btn-outline-info" href="prestamo.html">Regresar a Préstamos</a>
        </div>
    `;

    listadoHistorial(historialSimulacionesGuardadas);

    const seleccionarHistorial = document.querySelector('#seleccionarHistorial');
    const borrarSimulacion = document.querySelector('#borrarSimulacion');
    const limpiarConsulta = document.querySelector('#limpiarConsulta');
    const borrarHistorial = document.querySelector('#borrarHistorial');

    seleccionarHistorial.addEventListener('click', function () {

        verSimulacion.innerHTML = `
            <p class="mx-4">Detalles de la simulación guardada:</p>
            <div class="row d-flex justify-content-evenly p-3 border border-secondary header-card">
                <div class="col-5">
                    <p>* Fecha de Simulacion: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).fechaSimulacion}</p>
                    <p>* Fecha de Nacimiento: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).fechaNacimiento}</p>
                    <p>* Edad: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).edad} años</p>
                    <p>* Línea: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).lineaPrestamo}</p>
                    <p>* Nivel de Ingreso: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).nivelIngresos}</p>
                    <p>* Monto del préstamo a solicitar: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).montoPrestamo}</p>
                    <p>* Tasa: ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).tasaPrestamo * 100}% TNA</p>
                    <p>* Tiene que ingresar ${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).cantidadCuotas} cuotas de ${formatoPesos(buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).valorCuota)}</p>
                </div>
                <table class="col-4">
                    <tr>
                        <td class="col-2">Capital:</td>
                        <td class="col-3 text-end">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).montoPrestamo}</td>
                    </tr>
                    <tr>
                        <td class="col-2">Interes:</td>
                        <td class="col-3 text-end">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).interes}</td>
                    </tr>
                    <tr>
                        <td class="col-2">Seguro:</td>
                        <td class="col-3 text-end">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).seguro}</td>
                    </tr>
                    <tr>
                        <td class="col-2">IVA (sobre Int. y Seg.):</td>
                        <td class="col-3 text-end">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).iva}</td>
                    </tr>
                    <tr>
                        <td class="col-2">Importe total:</td>
                        <td class="col-3 text-end">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).importeTotal}</td>
                    </tr>
                    <tr>
                        <td class="col-2"">CFT:</td>
                        <td class="col-3 text-end">${buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value)).cft}%</td>
                    </tr>
              </table>
        `;
    });

    borrarSimulacion.addEventListener('click', function () {

        const simulacionABorrar = buscarArraysPorBuscador(historialSimulacionesGuardadas, (document.querySelector('#listadoHistorial').value));
        const indiceABorrar = historialSimulacionesGuardadas.indexOf(simulacionABorrar);
        historialSimulacionesGuardadas.splice(indiceABorrar,1);
        localStorage.setItem('historialSimulaciones', JSON.stringify(historialSimulacionesGuardadas));
        alert('Se ha eliminado la simulación del historial');
        verSimulacion.innerHTML = ``;
        listadoHistorial(historialSimulacionesGuardadas);
    });

    
    limpiarConsulta.addEventListener('click', function () {
        
        verSimulacion.innerHTML = ``;
        listadoHistorial(historialSimulacionesGuardadas);
    });

    borrarHistorial.addEventListener('click', function () {

        historialSimulacionesGuardadas.splice(0);
        localStorage.clear();
        alert('Se elimino su historial de simulaciones\nGracias por visitarnos. Esperamos que vuelta pronto!');
        location.reload();
    });
}/*























let componentesFecha = fechaN.split("-");
        let date = `${componentesFecha[2]}/${componentesFecha[1]}/${componentesFecha[0]}`;

        resultadoSimulador.innerHTML = `
            <p class="mx-2">Le detallamos la simulación de su préstamo:</p>
            <div class="row d-flex justify-content-around">
                <div class="col-4">
                    <p>* Fecha de Nacimiento: ${date}</p>
                    <p>* Edad: ${edad(fechaN)} años</p>
                    <p>* Monto del préstamo a solicitar: ${formatoPesos(parseInt(montoPrestamo.value))}</p>
                    <p>* Tasa: ${buscarArraysPorBuscador(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).tasa * 100}% TNA</p>
                    <p>* Tiene que ingresar ${cantidadCuotas.value} cuotas de ${formatoPesos(buscarArraysPorBuscador(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).valorCuota(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</p>
                </div>
                <table class="col-6">
                    <tr>
                        <td class="col-4">Capital:</td>
                        <td class="text-end">${formatoPesos(parseInt(montoPrestamo.value))}</td>
                    </tr>
                    <tr>
                        <td class="col-4">Interes:</td>
                        <td class="text-end">${formatoPesos(buscarArraysPorBuscador(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoInteres(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</td>
                    </tr>
                    <tr>
                        <td class="col-4">Seguro:</td>
                        <td class="text-end">${formatoPesos(buscarArraysPorBuscador(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoSeguro(montoPrestamo.value))}</td>
                    </tr>
                    <tr>
                        <td class="col-4">IVA (sobre Int. y Seg.):</td>
                        <td class="text-end">${formatoPesos(buscarArraysPorBuscador(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).calculoIva(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</td>
                    </tr>
                    <tr>
                        <td class="col-4">Importe total:</td>
                        <td class="text-end">${formatoPesos(buscarArraysPorBuscador(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).totalAPagar(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value)))}</td>
                    </tr>
                    <tr>
                        <td class="col-4">CFT:</td>
                        <td class="text-end">${buscarArraysPorBuscador(tiposPrestamos, (document.querySelector('#listadoPrestamos').value)).cft(parseInt(montoPrestamo.value), parseInt(cantidadCuotas.value))}%</td>
                    </tr>
              </table>

              */