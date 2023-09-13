// Definir la entidad ConjuntoHabitacional
class ConjuntoHabitacional {
    constructor(nombre, ubicacion, fundacion, enUso, departamentos) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.fundacion = fundacion;
        this.enUso = enUso;
        this.departamentos = departamentos;
    }
}

// Definir la entidad Departamento
class Departamento {
    constructor(numero, area, amueblado, precio, fechaEstreno) {
        this.numero = numero;
        this.area = area;
        this.amueblado = amueblado;
        this.precio = precio;
        this.fechaEstreno = fechaEstreno;
    }
}