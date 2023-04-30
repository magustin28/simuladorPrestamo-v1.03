// Tipo de Préstamos

const prestamoJoven = new Prestamo(1, 'Préstamo Jóven', 18, 35, 0, 1500000, 'No', 'N/A', 0.50, 0.01, 0.21, 0, 12);

const prestamoGarantizado = new Prestamo(2, 'Préstamo Garantizado', 18, 60, 0, 4500000, 'Si', 'A solo firma', 0.70, 0.015, 0.21, 4, 18);

// Array de tipo de Préstamos

const tiposPrestamos = [prestamoJoven, prestamoGarantizado];

// Crea nuevo prestamo y se agrega al array

const prestamoJubilado = new Prestamo(3, 'Préstamo Jubliado', 80, 100, 0, 2500000, 'No', 'N/A', 0.60, 0.01, 0.21, 0, 12);

tiposPrestamos.push(prestamoJubilado);

// Filtros de Préstamos

const prestamoFiltro18a80 = tiposPrestamos.filter((prestamo) => prestamo.edadMinima == 18 && prestamo.edadMaxima <= 80);
const prestamoFiltro35a80 = tiposPrestamos.filter((prestamo) => prestamo.edadMaxima > 35 && prestamo.edadMaxima <= 80);
const prestamoFiltroMas80 = tiposPrestamos.filter((prestamo) => prestamo.edadMinima == 80);