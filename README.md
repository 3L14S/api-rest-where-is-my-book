

Practica de api rest 
CATEGORIA:



POST '/categoria' recibe: {nombre: string} retorna: status: 200, {id: numerico, nombre: string} - status: 413, que puede ser: "no ingresaste el nombre", "el nombre es demasiado corto", "La categoria ya existe".



GET '/categoria' retorna: status 200  y [{id:numerico, nombre:string}]  - status: 413 y [].



GET '/categoria/:id' retorna: status 200 y {id: numerico, nombre:string} - status: 413,que puede ser: "no existe la categoria".



DELETE '/categoria/:id' retorna: status 200 y {mensaje: "se borro correctamente"} - status: 413, que puese ser: "No se pudo eliminar la categoria porque tiene libros asociados, por favor remueva los libros antes de eliminar esta categoria", "La categoria no existe"
