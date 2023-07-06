/*
* Una funcion que acepte como parametro una variable
* del "path" del archivo y otra variable con el "contenidoArchivo".
* Utilizar el modulo 'fs' para leer el archivo en ese "path" y anadir el
* "contenidoArchivo" a ese archivo.
* */

const fs = require('fs')

function leerArchivo(path) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                path,
                'utf-8',
                (errorLectura, contenido) => {
                    if (errorLectura) {
                        console.log(errorLectura)
                        reject('Error leyendo primer archivo')
                    } else {
                        console.log(contenido)
                        resolve(contenido)
                    }
                }
            )
        }
    )
}

function escribirArchivo(path, contenido) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(path,
                contenido,
                'utf8',
                (errorEscritura) => {
                    if (errorEscritura) {
                        console.log(errorEscritura);
                        reject('Error escribiendo archivo')
                    } else {
                        resolve(contenido)
                    }
                }
            )

        }
    )
}

function ejercicio() {
    leerArchivo('08-ejemplo.txt')
        .then((data) => {
            return leerArchivo('08-promesas.js').then((variable) => {
                return { data, variable };
            });
        })
        .then((result) => {
            const contenido = result.data + '\n' + result.variable;
            return escribirArchivo('08-test.txt', contenido);
        })
        .then(() => {
            console.log('Archivo 08-test.txt escrito correctamente');
        })
        .catch((error) => {
            console.error(error);
        });
}

ejercicio()

//async

async function ejercicioConAwait() {
    const pathUno = '01-variables.js'
    const pathDos = '06-ejemplo.txt'
    const pathTres = '08-ejemplo-respuesta.txt'

    try {
        const contenidoUno = await leerArchivo(pathUno)
        const contenidoDos = await leerArchivo(pathDos)
        const contenidoTotal = contenidoUno + contenidoDos

        await escribirArchivo(pathTres, contenidoTotal)
    } catch (error) {
        console.error(error)
    }
}

await ejercicioConAwait()