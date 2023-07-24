
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

17. 