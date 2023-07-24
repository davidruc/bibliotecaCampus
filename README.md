
# BIBLIOTECA CAMPUS

## Problema planteado: 
* La biblioteca necesita una solución tecnológica que le permita llevar un registro organizado y centralizado de su catálogo de libros, así como de las personas que realizan préstamos y reservas. Actualmente, la biblioteca lleva un registro manual en hojas de papel, lo que resulta en pérdida de tiempo y dificultades para obtener información actualizada en tiempo real. Además, debido a la falta de una base de datos estructurada, es común que se produzcan errores en el registro de préstamos y reservas, lo que afecta la eficiencia de la biblioteca y la satisfacción de sus usuarios

## Consultas solicitadas: 

2. Obtener todos los autores y su nacionalidad.
3. Listar todas las categorías disponibles.
4. Mostrar todas las editoriales y sus direcciones.
5. Obtener los estados de los libros y sus descripciones.
6. Mostrar todos los libros con su título, autor y editorial.
7. Listar los préstamos realizados con fecha de préstamo, fecha de devolución y estado.
8. Obtener todas las reservas realizadas con su fecha de reserva y estado.
9. Mostrar los libros disponibles para préstamo con su título y autor. 
10. Obtener los libros prestados y su fecha de devolución.
11. Listar los usuarios y sus correos electrónicos.
12. Mostrar los libros escritos por un autor específico(ejemplo: Gabriel García)
13. Obtener los libros de cierta categoría (ejemplo: Novela).
14. Listar los préstamos realizados por un usuario (ejemplo: Juan Pérez).
15. Mostrar los libros con más de 500 páginas y su autor.
16. Obtener los libros prestados a un usuario específico (ejemplo: María Gómez). 
17. Listar los autores de nacionalidad española.
18. Mostrar los libros que están en reserva actualmente.
19. Obtener los libros de cierta editorial (ejemplo: Editorial Planeta).
20. Listar los préstamos con fecha de préstamo y usuario que los realizó.
21. Mostrar los libros con título que contengan la palabra "Tokio".


## SOLUCION A CONSULTAS: 

2. EndPoint para obtener todos los autores y su nacionalidad: *http://127.10.16.15:5020/autores*

3. EndPoint para listar todas las categorías disponibles de libros: *http://127.10.16.15:5020/categorias*

4. EndPoint para mostras todas las editoriales y sus direcciones: *http://127.10.16.15:5020/editoriales*
 
5. EndPoint para mostrar los estados de los libros y su descripción: *http://127.10.16.15:5020/estado*

6. EndPoint que muestra todos los libros con su título, autor y editorial: *http://127.10.16.15:5020/libros*

7. EndPoint que lista todos los prestamos realizados con fecha de préstamo, fecha de devolución y estado del prestamo *http://127.10.16.15:5020/prestamo*
    
8. EndPoint que muestra todas las reservas realizadas con su fecha de reserva y estado: *http://127.10.16.15:5020/reservas* 

9. EndPoint que muestra los libros disponibles para prestamo con su título y autor: *http://127.10.16.15:5020/disponibles*
    * Para este endpoint utilizamos la data suministrada y haciendo uso de un condicional WHERE tomamos el id la tabla estado_libro que tenía como nombre "disponible"

10. EndPoint que obtiene los libros prestados y su fecha de entrega : *http://127.10.16.15:5020/librosPrestados*
    
11. EndPoint que lista los usuarios y sus correos electrónicos: *http://127.10.16.15:5020/usuario*

12. EndPoint para mostrar todos los libros escritos por un autor en específico: *http://127.10.16.15:5020/libros/:id_autor*
    * Para este endPoint se ingresa el id del autor que se desea observar y el endPoint devolverá todos los libros registrados con ese id, además de información adicional del autor

13. EndPoint para obtener los libros de cierta categoría: *http://127.10.16.15:5020/categorias/:id_categoria*
    * Para este endPoint se debe pasar como parámetro el id de la catagoría de la que se quieren observar todos los libros de dicha categoría.

14. EndPoint para listar los préstamos realizados por un usuario: *http://127.10.16.15:5020/prestamo/:id_usuario*
    * Para este endPoint se debe pasar como parámetro el id del usuario del cual se desean observar todos los prestamos realizados. 

15. Endpoint para mostrar los libros con más de 500 páginas y su autor: *http://127.10.16.15:5020/longBooks*

16. EndPoint que obtiene los libros prestados a un usuario específico: *http://127.10.16.15:5020/librosPrestados/:id_usuario*
    * Para este endPoint se debe pasar como parámetro el id del usuario donde se verán datos detallados de los libros prestados. 







## Instrucciones para la instalación del proyecto:

Para la correcta instalación del proyecto siga las siguientes instrucciones: 

1. Clone el repositorio del proyecto y abra el archivo del proyecto en su editor de código. (Recomdación: utilizar Visual studio code)
2. Una vez lo tenga en forma local, abra una terminal y acceda a la ruta ./backend, de la siguiente forma: 
```bash
    cd backend
``` 
3. Una vez la terminal se encuentre en la ruta backend, implemente las dependencias que están en el package.json usando el siguiente comando:
```bash
    npm update
``` 
De esta forma verá que la carpeta "*node_modules*" y el archivo "*package-lock.json*" se crean después de contados segundos. 

4. Para poder correr el proyecto de manera local es necesario configurar las variables de entorno. Por lo que puede dirigirse al archivo .env.example y observar la configuración del proyecto.

    * Dentro de la ruta backend cree un archivo que se llame ".env".
    * Luego de tener el archivo .env, copie y pegue la estructura que se observa en el .env.example.
    * Ingrese los datos requeridos. En el caso de manejar el proyecto local, el host sería localhost. 
    * El nombre de la base de datos que ejecutará más adelante es "petheaven", por lo que en el campo database puede ingresar este nombre.
    * En el campo de MY_CONFIG ingrese un hostname y un puerto a su elección. Recuerde que por defecto el local host requiere que el host name es 127.0.0.1. 
    * Verifique que el puerto que va a utilizar no esté en uso. Para evitar confisión mate todos los puertos que tiene abiertos en su máquina.
    * Por último la llave privada del JWT puede ser cualquier cadena de texto a su elección.

5. Una vez configuradas las dependencias del proyecto y definidas las variables de entorno sigue ejecutar la base de datos.
*   En este caso está pública para facilidad de la persona que evalúa.  
    * Dirijase a la ruta ./backend/src/db, ahí encontrará el archivo llamado db.sql
    * Para ejecutar este archivo instale la extensión de visual studio code "**MySQL**". Una vez instalada la extensión va a observar en la barra lateral izquiersa un cilindro. Al darle click se abrirá la barra lateral, seleccione el botón **+** ubicado en la parte superior (*add conecction*) y se desplegará una ventana donde se va a poder configurar la extensión para crear la conexión. Por defecto toda la configuración se dirige a una conección local, daremos en el botón de guardar y por último connect.
    * Si no desea utilizar esta extensión también puede ir ejecutando el script de la base de datos desde la consola usando MySQL. 
    * El script de la base de datos está en orden, por lo que para su ejecución y para evitar problemas es recomendado que se realice en orden.

6. Cuando ya tenga la base de datos localmente se dirigirá nuevamente a la terminal que había abierto anteriormente y levantará el servidor de manera local usando el siguiente comando: 
```bash
    npm run dev
``` 

Una vez levantado el servidor podrá utilizar una herramienta como Thunder-cliente o postman para realizar y verificar los endPoints generados y explicados anteriormente.

## Tecnologías

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="50" height="50"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="50" height="50"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="60" height="60"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="60" height="60"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="50" height="50"/> 

## Dependencias utilizadas

Para el presente proyecto se van a utilizar las siguientes dependencias en sus respectivas versiones:

  ```json
    "class-transformer": "0.5.1",
    "class-validator": "0.14.0",
    "cookie-parser": "1.4.6",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "express-session": "1.17.3",
    "jose": "4.14.4",
    "mysql2": "3.5.2",
    "nodemon": "3.0.1",
    "reflect-metadata": "0.1.13",
    "typescript": "5.1.6"
  ```