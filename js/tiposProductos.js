// Tipo de Productos
const cuentas = new Producto(1, 'Cuentas', '(Próximamente)');
const tarjetasCredito = new Producto(2, 'Tarjetas de Crédito', '(Próximamente)');
const prestamos = new Producto(3, 'Préstamos', `<a class="text-decoration-none btn btn-outline-info" href="pages/prestamo.html">Consultar</a>`);


// Array de tipo de Productos
const tiposProductos = [cuentas, tarjetasCredito, prestamos];

// Nuevo producto
const seguros = new Producto(4, 'Seguros', '(Próximamente)');
tiposProductos.push(seguros);