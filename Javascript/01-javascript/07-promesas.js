const fs = require('fs')

function promesaEsPar(numero) {
    const miPrimeraPromesa = new Promise(
        (resolve, reject) => {
            if (numero % 2 === 0) {
                resolve(numero)
            } else {
                reject('no es par xd')
            }
        }
    )
    return miPrimeraPromesa
}

function promesaElevarAlCuadrado(numero) {
    return new Promise((res) => res(Math.pow(numero, 2)))
}

promesaEsPar(4)
    .then(
        (data) => {
            console.log('Data: ', data)
            return promesaElevarAlCuadrado(data)
        }
    )
    .then(
        (data) => {
            console.log('Data: ', data)
            return promesaElevarAlCuadrado(data)
        }
    )
    .catch(
        (error) => {
            console.log('Error: ', error)
        }
    )
    .finally(
        () => {
            console.log('Finally')
        }
    )