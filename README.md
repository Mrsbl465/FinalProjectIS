# Trello

 [Enlace](https://trello.com/invite/b/q2yXLGNM/04a48536b6d5f02e8ac25edefeeedf0f/scooby-attendance)

# Práctica 09: Estilos de Programación

## Persistent Tables

Constraints:

- The input data of the problem is modeled as entities with relations between them

- The data is placed in tables, with columns potentially cross-referencing data in other tables

- Existence of a relational query engine

- The problem is solved by issuing queries over the tabular data


```javascript
async findByName(city) {
  const con = connectionDb.promise();
  const data = await con.query("SELECT * FROM city WHERE City_Name = ?", [
    city,
  ]);
  return data[0];
}
async getAll() {
  const connection = connectionDb.promise();
  const data = await con.query(
    "SELECT * FROM student INNER JOIN person ON student.PersonID = person.PersonID INNER JOIN city ON person.CityID = city.CityID"
  );
  return data[0];
}
```

## Declared Intentions

Constraints:

- Existence of a run-time typechecker

- Procedures and functions declare what types of arguments they expect

- If callers send arguments of types that are't expected, the
  procedures/functions are not executed
  
```javascript
  async deleteInscription(id, StudentId) {
    if (!id || !StudentId) {
      const error = new Error();
      error.status = 100;
      error.message = "El parámetro ID debe ser enviado";
      throw error;
    }
    const entity = await this.repository.deleteInscription(id, StudentId);
    if (!entity) {
      const error = new Error();
      error.status = 500;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }
```

## Things
Constraints:
- The larger problem is decomposed into 'things' that make sense for the problem domain.
- Each 'thing' is a capsule of data that exposes procedures to the rest of the world.
- Data is never accessed directly, only through these procedures.
- Capsules can reappropriate procedures defined in other capsules.

```javascript
class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  async get(id) {
    return this.model.get(id);
  }
  async getAll() {
    return this.model.getAll();
  }
  async getByName(name) {
    return this.model.getByName(name);
  }
  async create(entity) {
    return this.model.create(entity);
  }
  async update(entity) {
    return this.model.update(entity);
  }
  async delete(id) {
    return this.model.delete(id);
  }
}
```

 
 
# Práctica 10: Codificación Legible (Clean Code)


## Capitalize SQL special words
Se usa mayúsculas en las palabras reservadas al hacer uso de sentencias SQL, con la finalidad de mejorar el entendimiento del código.

```javascript
async getAll() {
  const con = connectionDb.promise();
  const data = await con.query(
    "SELECT * FROM student INNER JOIN person ON student.PersonID = person.PersonID INNER JOIN city ON person.CityID = city.CityID"
  );
  return data[0];
}
```

## Deep Nesting

A veces utilizamos bucles anidados que son difíciles de entender. La manera de manejar eso es extraer todos los bucles en funciones separadas en su lugar.

Supongamos que tenemos un array de otro array que contiene otro array, y queremos el valor del último array. Podemos escribir un bucle anidado que funcione para nuestros requisitos. Pero esta no es la forma adecuada.

```pug
each item in students
  tr
    td.text-center.align-middle
      img(src='https://picsum.photos/300')
      |  #{item.First_Name} - #{item.Last_Name}
    td.text-center.align-middle  #{item.StudentID} 
    td.text-center.align-middle  #{item.Email} 
    td.text-center.align-middle
       a(href = '/deletealumnos/#{id}/#{item.StudentID}') Eliminar
```

## Use Consistent Verbs per Concept

Esta es una de las convenciones de nomenclatura importantes. Si necesitamos una función CRUD, usamos create, get, o update con el nombre.

Si necesitamos obtener información del usuario de la base de datos, entonces el nombre de la función puede ser userInfo, user, o fetchUser, pero esta no es la convención. Debemos usar getUser.

```javascript
async createCourse(Course_Name, SectionID, TypeID, ProfessorID, Semester) {
   ...
}

async getSchedule(CourseID) {
   ...
}

async createSchedule(Day, Start, Finish, CourseID) {
   ...
}

async deleteCourse(id) {
   ...
}
 ```


# Práctica 11: Principios SOLID

## Liskov Substitution Principle
Cuando una Clase hija no puede realizar las mismas acciones que su Clase padre, esto puede causar errores.

Si tienes una clase y creas otra clase a partir de ella, ésta se convierte en padre y la nueva clase en hijo. La clase hija debe ser capaz de hacer todo lo que la clase padre puede hacer. Este proceso se llama Herencia.

La clase hija debe ser capaz de procesar las mismas peticiones y entregar el mismo resultado que la clase padre o puede entregar un resultado que sea del mismo tipo.

La imagen muestra que la clase padre entrega café (puede ser cualquier tipo de café). Es aceptable que la Clase hija entregue Cappucino porque es un tipo específico de Café, pero NO es aceptable que entregue Agua.

Si la Clase hija no cumple con estos requisitos, significa que la Clase hija ha cambiado completamente y viola este principio.

### Objetivo

Este principio tiene como objetivo reforzar la consistencia para que la Clase padre o su Clase hija puedan ser utilizadas de la misma manera sin ningún error.

```javascript
// PARENT

class BaseService {
  constructor(Repository) {
    this.repository = Repository;
  }
  async get(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "Parametro id debe ser enviado";
      throw error;
    }

    const entity = await this.repository.get(id);
    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }

  async getByName(name) {
    if (!name) {
      const error = new Error();
      error.status = 400;
      error.message = "Parametro name debe ser enviado";
      throw error;
    }

    const entity = await this.repository.getByName(name);
    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }

  async getAll() {
    const entity = await this.repository.getAll();
    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }

  async create(data) {
    const entity = await this.repository.create(data);
    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }

  async update(data) {
    const entity = await this.repository.update(data);
    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }

  async delete(id) {
    const entity = await this.repository.delete(id);
    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }
}

module.exports = BaseService;

// CHILD

const BaseService = require("./base.service");

class CityService extends BaseService {
  constructor(CityRepository) {
    super(CityRepository);
    this._cityRepository = CityRepository;
  }
}

module.exports = CityService;



 ```

## DIP - Dependency inversion principle

En primer lugar, hay que definir los términos utilizados aquí de forma más sencilla

**Módulo(o clase) de alto nivel:** Clase que ejecuta una acción con una herramienta.

**Módulo (o Clase) de bajo nivel:** La herramienta que se necesita para ejecutar la acción

**Abstracción:** Representa una interfaz que conecta las dos Clases.

**Detalles:** Cómo funciona la herramienta

Este principio dice que una Clase no debe fusionarse con la herramienta que utiliza para ejecutar una acción. Más bien, debe fusionarse con la interfaz que permitirá a la herramienta conectarse a la Clase.

También dice que tanto la clase como la interfaz no deben saber cómo funciona la herramienta. Sin embargo, la herramienta debe cumplir con la especificación de la interfaz.

### Objetivo

Este principio pretende reducir la dependencia de una Clase de alto nivel con respecto a la Clase de bajo nivel mediante la introducción de una interfaz.

```javascript

 ```
## OCP - Open/closed principle

Cambiar el comportamiento actual de una Clase afectará a todos los sistemas que utilicen esa Clase.
Si quiere que la Clase realice más funciones, lo ideal es añadir a las funciones que ya existen NO cambiarlas.

### Objetivo

Este principio pretende ampliar el comportamiento de una Clase sin cambiar el comportamiento existente de esa Clase. Esto es para evitar que se produzcan errores dondequiera que se utilice la Clase.


## ISP - Interface segregation principle




