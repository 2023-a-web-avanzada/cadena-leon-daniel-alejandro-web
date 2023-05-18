// Mutables e inmutables

// Mutables (reasignadas)

var numeroUno = 1
let numeroDos = 2

numeroUno = 12
numeroDos = 8

numeroUno = true
numeroDos = false


// Variables inmutables

const configuracionArchivos = 'PDF'
// configuracionArchivos = 'XML' NO se pueden redefinir estas variables

// Vamos a preferir const > let > var (mejor no usarlo al menos que la librería lo exija)


// Tipos de variables (primitivas)

const numero = 1 // number
const sueldo = 1.2 // number
const texto = 'Daniel' // string
const otroTexto = "Cadena"
const booleano = true // booleano
const obj = null // objeto
const indefinido = undefined // undefined

console.log(typeof numero)
console.log(typeof sueldo)
console.log(typeof texto)
console.log(typeof otroTexto)
console.log(typeof booleano)
console.log(typeof obj)
console.log(typeof indefinido)

// Truty y Falsy

if (true) {
    console.log('Es verdadero')
} else {
    console.log('Es falso')
}

if ("") { // string vacío
    console.log('Es verdadero')
} else {
    console.log('Es falso') // FALSY
}

if ("Daniel") { // string no vacío
    console.log('Es verdadero')
} else {
    console.log('Es falso') // TRUTY
}

if (-1) { // número negativo
    console.log('Es verdadero')
} else {
    console.log('Es falso') // TRUTY
}

if (0) { // cero
    console.log('Es verdadero')
} else {
    console.log('Es falso') // FALSY
}

if (1) { // mayor a cero
    console.log('Es verdadero')
} else {
    console.log('Es falso') // TRUTY
}


if (null) { 
    console.log('Es verdadero')
} else {
    console.log('Es falso') // FALSY
}

if (undefined) {
    console.log('Es verdadero')
} else {
    console.log('Es falso') // FALSY
}

// Objetos

const player = {
    "username": "Jugador",
    'name': 'Nombre muy real',
    days: 3200,
    inventory: null,
    isActive: true,
    inventory: {
        head: 200,
        neck: 101,
    },

    friends: ['Jugador1', 'Jugador2', 'Jugador3'],

}

console.log(player)

// Acceder a las propiedades

console.log(player.username)
console.log(player["name"])

// Modificar valores

player.username = "Juan"
player["name"] = 'Felipe'

// Crear atributos

player.coins = 2000
console.log(player.coins)

player["isMod"] = false

console.log(Object.keys(player))
console.log(Object.values(player))

delete player.username