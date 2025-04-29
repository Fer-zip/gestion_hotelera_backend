<!-- Inicializacion del backend -->
<!-- Fecha: (24.04.25) -->


Paso 1: Conexion de la bd
- Activar el apache y el mysql en el panel de control del Xampp (No es necesario tener instalado MySQL Workbeanch)
- Tener una base de datos con el nombre 'gestion-hotelera'.
- En esa base de datos importamos el archivo 'gestion-hotelera.sql' ubicada en esta misma carpeta
- Ejecutar el archivo 'config.js' para comprobar su conexion:
Forma 1: Tener el archivo abierto y en el teclado presionar: (Ctrl + Alt + N), para ejecutar el codigo.
Forma 2: En la consola(Ubicarte en la carpeta Gestion-Hotelera): 
<!--  -->
cd backend/db 
node config.js
<!--  -->
En caso de que la ejecucion siga activa despues de comprobar la conexion, detener la ejecucion.



Paso 2: Correr el servidor:
- Ejecutar el archivo 'server.js' para poder consumir la api:
Forma 1: Tener el archivo abierto y en el teclado presionar: (Ctrl + Alt + N), para ejecutar el codigo.
Forma 2: En la consola(Ubicarte en la carpeta Gestion-Hotelera): 
<!--  -->
cd backend
node server.js
<!--  -->



<!-- CONSUMO DE LA API -->
<!-- Fecha: (24.04.25) -->


Tener Instalado Postman, algun programa o tener una forma de probar la api.
(Tutorial en postman):
Paso 1: Iniciar en Postman:
- Una vez hayan corrido el archivo 'server.js' van a copiar el link que les devuelva en la consola deberia ser: http://localhost:3000
- Ese link lo van a pegar en Postman con el metodo GET y presionaran 'send', eso les devolvera un mensaje en formato json:
{
    mensaje: 'Servidor funcionando correctamente'
}


Paso 2: Prueba de los endpoints:
- En el archivo server.js van a ver, estos son las 3 bases de los endpoints:
app.use('/empleados', empleadosRouter)
app.use('/habitaciones', habitacionesRouter)
app.use('/servicios', seriviciosRouter)

- Para poder usarlos van a tener que agregar al link principal: 'http://localhost:3000'+'/empleados'
Que se terminaria viendose asi:

http://localhost:3000/empleados

- Dentro de '/empleados' tiene sus propios endpoints, los cuales lo podran ver en su respectivo archivo en la carpeta 'backend/routes/'
- Ahi se les mostrara algo asi:

router.get('/',empleados.getEmpleados);
router.get('/:dni',empleados.getEmpleado);
router.put('/:dni',empleados.updateEmpleado);
router.delete('/:dni',empleados.deleteEmpleado);
router.post('/',empleados.createEmpleado);

router.post('/login',empleados.processLogin);

- Si quisieramos usar este endpoint en postman: router.get('/',empleados.getEmpleados);

Hariamos lo siguiente:
Tenerlo en metodo GET, poner el link http://localhost:3000/empleados/ y clickear 'send'


- Si quisieramos usar este: router.get('/:dni',empleados.getEmpleado);
Tenerlo en metodo GET
Y en lugar se solo poner el link tenemos que pasarle un parametro valido a este endpoint para que nos devuelva algo, en este caso este endpoint espera recibir un dni (para buscar el empleado por el dni):
El link quedaria algo asi: http://localhost:3000/empleados/87654321
clickear 'send'


Y asi sucesivamente, tener el cuenta cambiar el metodo (GET,POST,DELETE,PUT, etc...) segun lo establecido en el endpoint, de lo contrario este mismo no funcionara o funcionara de una manera incorrecta.