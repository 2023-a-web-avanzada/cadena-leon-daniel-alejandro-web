// 02-arreglos
let arreglo = [6, 7, 8, 9, 10]

// for of

for (let numero of arreglo) {
    console.log('numero', numero)
}
// for in

for (let indice in arreglo) {
    console.log('indices', indice)
}

// Añadir al final un elemento
arreglo.push(11)

// Eliminar al final un elemento
arreglo.pop()

// Añadir al principio del arreglo
arreglo.unshift(4)

// splice (indice donde empezar, número de elementos eliminados, items a agregar)

arreglo.splice(0, 0, 1, 2, 3)
console.log(arreglo)
const indiceNueve = arreglo.indexOf(9)