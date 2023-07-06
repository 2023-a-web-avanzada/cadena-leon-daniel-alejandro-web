// let nombre: string = 'Daniel'; // Primitivo
// let nombre2: String = 'Daniel'; // Clase String

// tsc 01-variables.ts --target es3 --ignoreDeprecations 5.0
// tsc 01-variables.ts --target es6

let edad: number = 32;
let casado:   boolean = false;
let fecha: Date = new Date();
let sueldo: number;
sueldo = 12.4;

// Duck typing 
let apellido = 'Cadena'; // String ->
// apellido = 1; Error, no es un string
apellido = 'Gutierrez';
apellido.toUpperCase();

let marihuana: any = 2;
marihuana = '2';
marihuana = true;

marihuana = () => '2';

let edadMultiple: number | string | Date = '2';
edadMultiple = '2';
edadMultiple = 'dos';
edadMultiple = new Date();
edadMultiple = 2222;

let numeroUnico: number = 1;
numeroUnico = numeroUnico + Math.pow((edadMultiple as number), 2);