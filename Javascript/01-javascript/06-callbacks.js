const fs = require('fs');

// Leer 06-ejemplo.txt
console.log('1) Leer 06-ejemplo.txt'+ '\n')

fs.readFile('06-ejemplo.txt', 'utf8', (err, dataEjemplo) => {
  if (err) {
    console.error('Error al leer 06-ejemplo.txt:', err);
    return;
  }
  console.log(dataEjemplo);

// Leer 01-variables.js
console.log('2) Leer 01-variables.js'+ '\n')

  fs.readFile('01-variables.js', 'utf8', (err, dataVariables) => {
    if (err) {
      console.error('Error al leer 01-variables.js:', err);
      return;
    }
    console.log(dataVariables);

    // Crear un archivo con el contenido de los otros archivos:
    console.log('3) // Crear un archivo con el contenido de los otros archivos:'+ '\n')

    const contenidoNuevoArchivo = dataEjemplo + '\n' + dataVariables;
    fs.writeFile('06-nuevo-archivo.txt', contenidoNuevoArchivo, 'utf8', (err) => {
      if (err) {
        console.error('Error al crear 06-nuevo-archivo.txt:', err);
        return;
      }
      console.log('06-nuevo-archivo.txt ha sido creado correctamente.');
    });
  });
});