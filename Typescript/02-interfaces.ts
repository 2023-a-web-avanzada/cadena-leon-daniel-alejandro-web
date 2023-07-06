export class A implements B {
    edad = 1;
    nombre = 'a';
}

export interface B {
    nombre: string;
    edad: number;

}

export type C = {
    nombre: string;
    edad: number;
}

type Usuario = {
    nombre: string;
    apellido: string,
    edad?: number | undefined; // opcional
    sueldo?: number;
    casado: boolean | 0 | 1;
    estado: 'AC' | 'IN' | 'BN';

    imprimirUsuario: (mensake: string) => string | 'BN';
    calcularImpuesto: (impuesto: number) => number;
    estadoActual?: () => 'AP' | 'AF' | 'AT'; //opcional
}