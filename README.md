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

