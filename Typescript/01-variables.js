// let nombre: string = 'Daniel'; // Primitivo
// let nombre2: String = 'Daniel'; // Clase String
// tsc 01-variables.ts --target es3 --ignoreDeprecations 5.0
// tsc 01-variables.ts --target es6
var edad = 32;
var casado = false;
var fecha = new Date();
var sueldo;
sueldo = 12.4;
// Duck typing 
var apellido = 'Cadena'; // String ->
// apellido = 1; Error, no es un string
apellido = 'Gutierrez';
apellido.toUpperCase();
var marihuana = 2;
marihuana = '2';
marihuana = true;
marihuana = function () { return '2'; };
var edadMultiple = '2';
edadMultiple = '2';
edadMultiple = 'dos';
edadMultiple = new Date();
edadMultiple = 2222;
var numeroUnico = 1;
numeroUnico = numeroUnico + Math.pow(edadMultiple, 2);
