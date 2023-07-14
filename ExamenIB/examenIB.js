const fs = require('fs');
const inquirer = require('inquirer');

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

// Función para guardar los datos en un archivo JSON
function guardarDatos(datos, archivo) {
  fs.writeFileSync(archivo, JSON.stringify(datos, null, 2));
  console.log(`Los datos se han guardado en ${archivo}.`);
}

// Función para cargar los datos desde un archivo JSON
function cargarDatos(archivo) {
  if (fs.existsSync(archivo)) {
    const datos = fs.readFileSync(archivo, 'utf8');
    return JSON.parse(datos);
  }
  return [];
}

// Función para mostrar el menú principal
function mostrarMenuPrincipal() {
  console.log('\n===== MENÚ PRINCIPAL =====');
  console.log('1. Crear Conjunto Habitacional');
  console.log('2. Leer Conjuntos Habitacionales');
  console.log('3. Actualizar Conjunto Habitacional');
  console.log('4. Eliminar Conjunto Habitacional');
  console.log('5. Menú Departamentos');
  console.log('6. Salir');

  inquirer.prompt([
    {
      type: 'number',
      name: 'opcion',
      message: 'Elige una opción:',
      validate: function (input) {
        if (input >= 1 && input <= 6) {
          return true;
        } else {
          return 'Por favor, ingresa un número válido.';
        }
      }
    }
  ]).then(answer => {
    switch (answer.opcion) {
      case 1:
        crearConjuntoHabitacional();
        break;
      case 2:
        leerConjuntosHabitacionales();
        break;
      case 3:
        actualizarConjuntoHabitacional();
        break;
      case 4:
        eliminarConjuntoHabitacional();
        break;
      case 5:
        mostrarMenuDepartamentos();
        break;
      case 6:
        console.log('¡Hasta luego!');
        break;
      default:
        break;
    }
  });
}

// Función para mostrar el menú Departamentos
function mostrarMenuDepartamentos() {
  console.log('\n===== MENÚ DEPARTAMENTOS =====');
  console.log('1. Crear Departamento');
  console.log('2. Leer Departamentos');
  console.log('3. Actualizar Departamento');
  console.log('4. Eliminar Departamento');
  console.log('5. Regresar al Menú Principal');

  inquirer.prompt([
    {
      type: 'number',
      name: 'opcion',
      message: 'Elige una opción:',
      validate: function (input) {
        if (input >= 1 && input <= 5) {
          return true;
        } else {
          return 'Por favor, ingresa un número válido.';
        }
      }
    }
  ]).then(answer => {
    switch (answer.opcion) {
      case 1:
        crearDepartamento();
        break;
      case 2:
        leerDepartamentos();
        break;
      case 3:
        actualizarDepartamento();
        break;
      case 4:
        eliminarDepartamento();
        break;
      case 5:
        mostrarMenuPrincipal();
        break;
      default:
        break;
    }
  });
}

// Función para crear un Conjunto Habitacional
function crearConjuntoHabitacional() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'nombre',
      message: 'Nombre del Conjunto Habitacional:'
    },
    {
      type: 'input',
      name: 'ubicacion',
      message: 'Ubicación del Conjunto Habitacional:'
    },
    {
      type: 'input',
      name: 'fundacion',
      message: 'Fecha de fundación del Conjunto Habitacional (YYYY-MM-DD):',
      validate: function (input) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(input)) {
          return true;
        } else {
          return 'Por favor, ingresa una fecha válida en formato YYYY-MM-DD.';
        }
      }
    },
    {
      type: 'confirm',
      name: 'enUso',
      message: '¿El Conjunto Habitacional está en uso?'
    }
  ]).then(answers => {
    const conjuntosHabitacionales = cargarDatos('conjuntosHabitacionales.json');
    const numeroDepartamento = conjuntosHabitacionales.reduce((maxNumero, conjunto) => {
      const conjuntoMaxNumero = conjunto.departamentos.reduce((max, departamento) => {
        if (departamento.numero > max) {
          return departamento.numero;
        }
        return max;
      }, 0);
      if (conjuntoMaxNumero > maxNumero) {
        return conjuntoMaxNumero;
      }
      return maxNumero;
    }, 0);

    const conjuntoHabitacional = new ConjuntoHabitacional(answers.nombre, answers.ubicacion, answers.fundacion, answers.enUso, []);
    conjuntosHabitacionales.push(conjuntoHabitacional);
    guardarDatos(conjuntosHabitacionales, 'conjuntosHabitacionales.json');
    console.log('Conjunto Habitacional creado con éxito.');

    mostrarMenuPrincipal();
  });
}

// Función para crear un Departamento
function crearDepartamento() {
  const conjuntosHabitacionales = cargarDatos('conjuntosHabitacionales.json');
  if (conjuntosHabitacionales.length === 0) {
    console.log('No hay Conjuntos Habitacionales registrados.');
    mostrarMenuDepartamentos();
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'conjuntoHabitacional',
        message: 'Selecciona un Conjunto Habitacional:',
        choices: conjuntosHabitacionales.map(conjuntoHabitacional => conjuntoHabitacional.nombre)
      }
    ]).then(answer => {
      const conjuntoHabitacional = conjuntosHabitacionales.find(conjunto => conjunto.nombre === answer.conjuntoHabitacional);
      if (conjuntoHabitacional) {
        const numeroDepartamento = conjuntoHabitacional.departamentos.length + 1;
        inquirer.prompt([
          {
            type: 'input',
            name: 'area',
            message: `Área del Departamento ${numeroDepartamento}:`
          },
          {
            type: 'confirm',
            name: 'amueblado',
            message: `¿El Departamento ${numeroDepartamento} está amueblado?`
          },
          {
            type: 'number',
            name: 'precio',
            message: `Precio del Departamento ${numeroDepartamento}:`,
            validate: function (input) {
              if (input > 0) {
                return true;
              } else {
                return 'Por favor, ingresa un número válido.';
              }
            }
          },
          {
            type: 'input',
            name: 'fechaEstreno',
            message: `Fecha de estreno del Departamento ${numeroDepartamento} (YYYY-MM-DD):`,
            validate: function (input) {
              const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
              if (dateRegex.test(input)) {
                return true;
              } else {
                return 'Por favor, ingresa una fecha válida en formato YYYY-MM-DD.';
              }
            }
          }
        ]).then(answers => {
          const departamento = new Departamento(numeroDepartamento, answers.area, answers.amueblado, answers.precio, answers.fechaEstreno);
          conjuntoHabitacional.departamentos.push(departamento);
          guardarDatos(conjuntosHabitacionales, 'conjuntosHabitacionales.json');
          console.log('Departamento creado con éxito.');

          mostrarMenuDepartamentos();
        });
      } else {
        console.log('Conjunto Habitacional no encontrado.');
        mostrarMenuDepartamentos();
      }
    });
  }
}

// Función para leer los Conjuntos Habitacionales
function leerConjuntosHabitacionales() {
  const conjuntosHabitacionales = cargarDatos('conjuntosHabitacionales.json');
  if (conjuntosHabitacionales.length === 0) {
    console.log('No hay Conjuntos Habitacionales registrados.');
  } else {
    console.log('\n--- Conjuntos Habitacionales ---');
    conjuntosHabitacionales.forEach(conjuntoHabitacional => {
      console.log('Nombre:', conjuntoHabitacional.nombre);
      console.log('Ubicación:', conjuntoHabitacional.ubicacion);
      console.log('Fecha de fundación:', conjuntoHabitacional.fundacion);
      console.log('En uso:', conjuntoHabitacional.enUso);
      console.log('Departamentos:', conjuntoHabitacional.departamentos.length);
      console.log('----------------------------------');
    });
  }

  mostrarMenuPrincipal();
}

// Función para leer los Departamentos
function leerDepartamentos() {
  const conjuntosHabitacionales = cargarDatos('conjuntosHabitacionales.json');
  if (conjuntosHabitacionales.length === 0) {
    console.log('No hay Conjuntos Habitacionales registrados.');
    mostrarMenuDepartamentos();
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'conjuntoHabitacional',
        message: 'Selecciona un Conjunto Habitacional:',
        choices: conjuntosHabitacionales.map(conjuntoHabitacional => conjuntoHabitacional.nombre)
      }
    ]).then(answer => {
      const conjuntoHabitacional = conjuntosHabitacionales.find(conjunto => conjunto.nombre === answer.conjuntoHabitacional);
      if (conjuntoHabitacional) {
        const departamentos = conjuntoHabitacional.departamentos;
        if (departamentos.length === 0) {
          console.log('No hay Departamentos registrados en este Conjunto Habitacional.');
        } else {
          console.log(`--- Departamentos del Conjunto Habitacional ${conjuntoHabitacional.nombre} ---`);
          departamentos.forEach(departamento => {
            console.log('Número:', departamento.numero);
            console.log('Área:', departamento.area);
            console.log('Amueblado:', departamento.amueblado);
            console.log('Precio:', departamento.precio);
            console.log('Fecha de estreno:', departamento.fechaEstreno);
            console.log('----------------------------------');
          });
        }
      } else {
        console.log('Conjunto Habitacional no encontrado.');
      }
      mostrarMenuDepartamentos();
    });
  }
}

// Función para actualizar un Departamento
function actualizarDepartamento() {
  const conjuntosHabitacionales = cargarDatos('conjuntosHabitacionales.json');
  if (conjuntosHabitacionales.length === 0) {
    console.log('No hay Conjuntos Habitacionales registrados.');
    mostrarMenuDepartamentos();
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'conjuntoHabitacional',
        message: 'Selecciona un Conjunto Habitacional:',
        choices: conjuntosHabitacionales.map(conjuntoHabitacional => conjuntoHabitacional.nombre)
      }
    ]).then(answer => {
      const conjuntoHabitacional = conjuntosHabitacionales.find(conjunto => conjunto.nombre === answer.conjuntoHabitacional);
      if (conjuntoHabitacional) {
        const departamentos = conjuntoHabitacional.departamentos;
        if (departamentos.length === 0) {
          console.log('No hay Departamentos registrados en este Conjunto Habitacional.');
          mostrarMenuDepartamentos();
        } else {
          inquirer.prompt([
            {
              type: 'number',
              name: 'numero',
              message: 'Ingresa el número del Departamento que deseas actualizar:'
            }
          ]).then(answer => {
            const departamento = departamentos.find(depto => depto.numero === answer.numero);
            if (departamento) {
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'area',
                  message: 'Nuevo valor para el área:'
                },
                {
                  type: 'confirm',
                  name: 'amueblado',
                  message: '¿El Departamento está amueblado?'
                },
                {
                  type: 'number',
                  name: 'precio',
                  message: 'Nuevo valor para el precio:',
                  validate: function (input) {
                    if (input > 0) {
                      return true;
                    } else {
                      return 'Por favor, ingresa un número válido.';
                    }
                  }
                },
                {
                  type: 'input',
                  name: 'fechaEstreno',
                  message: 'Nueva fecha de estreno (YYYY-MM-DD):',
                  validate: function (input) {
                    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                    if (dateRegex.test(input)) {
                      return true;
                    } else {
                      return 'Por favor, ingresa una fecha válida en formato YYYY-MM-DD.';
                    }
                  }
                }
              ]).then(answers => {
                departamento.area = answers.area;
                departamento.amueblado = answers.amueblado;
                departamento.precio = answers.precio;
                departamento.fechaEstreno = answers.fechaEstreno;

                guardarDatos(conjuntosHabitacionales, 'conjuntosHabitacionales.json');
                console.log('Departamento actualizado con éxito.');
                mostrarMenuDepartamentos();
              });
            } else {
              console.log('Departamento no encontrado.');
              mostrarMenuDepartamentos();
            }
          });
        }
      } else {
        console.log('Conjunto Habitacional no encontrado.');
        mostrarMenuDepartamentos();
      }
    });
  }
}

// Función para eliminar un Departamento
function eliminarDepartamento() {
  const conjuntosHabitacionales = cargarDatos('conjuntosHabitacionales.json');
  if (conjuntosHabitacionales.length === 0) {
    console.log('No hay Conjuntos Habitacionales registrados.');
    mostrarMenuDepartamentos();
  } else {
    inquirer.prompt([
      {
        type: 'list',
        name: 'conjuntoHabitacional',
        message: 'Selecciona un Conjunto Habitacional:',
        choices: conjuntosHabitacionales.map(conjuntoHabitacional => conjuntoHabitacional.nombre)
      }
    ]).then(answer => {
      const conjuntoHabitacional = conjuntosHabitacionales.find(conjunto => conjunto.nombre === answer.conjuntoHabitacional);
      if (conjuntoHabitacional) {
        const departamentos = conjuntoHabitacional.departamentos;
        if (departamentos.length === 0) {
          console.log('No hay Departamentos registrados en este Conjunto Habitacional.');
          mostrarMenuDepartamentos();
        } else {
          inquirer.prompt([
            {
              type: 'number',
              name: 'numero',
              message: 'Ingresa el número del Departamento que deseas eliminar:'
            }
          ]).then(answer => {
            const departamentoIndex = departamentos.findIndex(depto => depto.numero === answer.numero);
            if (departamentoIndex !== -1) {
              departamentos.splice(departamentoIndex, 1);
              guardarDatos(conjuntosHabitacionales, 'conjuntosHabitacionales.json');
              console.log('Departamento eliminado con éxito.');
            } else {
              console.log('Departamento no encontrado.');
            }
            mostrarMenuDepartamentos();
          });
        }
      } else {
        console.log('Conjunto Habitacional no encontrado.');
        mostrarMenuDepartamentos();
      }
    });
  }
}

// Función principal
function iniciarPrograma() {
  console.log('Bienvenido al programa de Conjuntos Habitacionales y Departamentos.');
  mostrarMenuPrincipal();
}

// Iniciar el programa
iniciarPrograma();