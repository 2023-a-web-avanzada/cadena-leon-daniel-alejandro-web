// 05-destructuracion.js
// Destructuracion de OBJETOS -> ORDEN SI importa!
const Daniel = {
    nombre: "Daniel",
};
const Juan = {
    nombre: "Juan",
    apellido: "Fernández",
};
const DanielJuan = { // Crea una nueva REFERENCIA (VALOR)
    ...Juan, // 1 el orden es importante para propiedades que se repiten
    ...Daniel,   // El ultimo reemplaza a los anteriores
};
console.log('DanielJuan', DanielJuan);

// Destructuracion de arreglos
const arregloUno = [1, 2, 3, 4, 5];
const arregloDos = [6, 7, 8, 9, 10];
const superArreglo = [
    ...arregloUno, // El orden importa
    ...arregloDos,
]; // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('superArreglo', superArreglo);