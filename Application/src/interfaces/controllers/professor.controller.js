const express = require("express");
const router = express.Router();
const PersonModel = require("../../domain/models/person.model");
const personDb = new PersonModel();
const data = require("../../domain/models/login.model");
const loginDb = new data();
const ProfessorModel = require("../../domain/models/professor.model");
const professorDb = new ProfessorModel();
const InscriptionModel = require("../../domain/models/inscription.model");
const inscriptionDb = new InscriptionModel();
const CourseModel = require("../../domain/models/course.model");
const courseDb = new CourseModel();
const CourseStudentsModel = require("../../domain/models/course_student.model");
const courseStudentsDb = new CourseStudentsModel();
const SheduleModel = require("../../domain/models/shedule.model");
const sheduleDb = new SheduleModel();

const ProfessorService = require("../../aplication/services/professor.service");
const ProfessorRepository = require("../../domain/repository/professor.repository");

const InscriptionService = require("../../aplication/services/inscription.service");
const InscriptionRepository = require("../../domain/repository/inscription.repository");

const SheduleService = require("../../aplication/services/shedule.service");
const SheduleRepository = require("../../domain/repository/shedule.repository");

const CourseService = require("../../aplication/services/course.service");
const CourseRepository = require("../../domain/repository/course.repository");

const PersonService = require("../../aplication/services/person.service");
const PersonRepository = require("../../domain/repository/person.repository");

const LoginService = require("../../aplication/services/login.service");
const LoginRepository = require("../../domain/repository/login.repository");

const CourseStudentsService = require("../../aplication/services/courseStudents.service");
const CourseStudentsRepository = require("../../domain/repository/courseStudents.repository");

class ProfessorController {
  async getAll() {
    const instanceProfessorRepository = new ProfessorRepository(professorDb);
    const instanceProfessorService = new ProfessorService(
      instanceProfessorRepository
    );
    const result = instanceProfesorService.getAll();
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }

  async findBydCode(code) {
    const instanceProfessorRepository = new ProfessorRepository(professorDb);
    const instanceProfessorService = new ProfessorService(
      instanceProfessorRepository
    );
    const result = instanceProfessorService.findBydCode(code);
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }

  async studentInscription(StudentID, CourseID) {
    const instanceInscriptionRepository = new InscriptionRepository(
      inscriptionDb
    );
    const instanceInscriptionService = new InscriptionService(
      instanceInscriptionRepository
    );

    const data = await instanceInscriptionService
      .create({ StudentID, CourseID })
      .catch((err) => {
        console.log("Professor Controller Error", err);
        return null;
      });
    console.log(data.insertId);
    if (data.insertId) {
      const instanceCourseRepository = new CourseRepository(courseDb);
      const instanceCourseService = new CourseService(instanceCourseRepository);
      const dataCourseUpdate = await instanceCourseService
        .updateCantEstIn(CourseID)
        .catch((err) => {
          console.error("Professor Controller Error", err);
          return null;
        });

      console.log(dataCourseUpdate);
    }

    return data;
  }

  async NuevoHorario(Day, Start, Finish, CourseID) {
    const instanceSheduleRepository = new SheduleRepository(sheduleDb);
    const instanceSheduleService = new SheduleService(
      instanceSheduleRepository
    );
    const result = instanceSheduleService.create({
      Day,
      Start,
      Finish,
      CourseID,
    });
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }

  async GetHorario(CourseID) {
    const instanceSheduleRepository = new SheduleRepository(sheduleDb);
    const instanceSheduleService = new SheduleService(
      instanceSheduleRepository
    );
    const result = instanceSheduleService.get(CourseID);
    const data = await result.catch((err) => {
      console.log("Professor Controller Error Get Horario ", err);
      return null;
    });
    return data;
  }

  async NuevoCourse(Course_Name, SectionID, TypeID, ProfessorID, Semestre) {
    const instanceCourseRepository = new CourseRepository(courseDb);
    const instanceCourseService = new CourseService(instanceCourseRepository);
    const result = instanceCourseService.create({
      Course_Name,
      SectionID,
      TypeID,
      ProfessorID,
      Semestre,
    });
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });

    return data;
  }

  async register(
    First_Name,
    Last_Name,
    Email,
    DNI,
    Mobile_Phone,
    CityID,
    Department,
    Password,
    idDNI
  ) {
    const instancePersonRepository = new PersonRepository(personDb);
    const instancePersonService = new PersonService(instancePersonRepository);

    const instanceProfessorRepository = new ProfessorRepository(professorDb);
    const instanceProfessorService = new ProfessorService(
      instanceProfessorRepository
    );

    const instanceLoginRepository = new LoginRepository(loginDb);
    const instanceLoginService = new LoginService(instanceLoginRepository);

    const result = instancePersonService.create({
      First_Name,
      Last_Name,
      Email,
      DNI,
      Mobile_Phone,
      CityID,
    });

    const dataId = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });

    const resultProfessor = instanceProfessorService.create({
      Department,
      dataId,
      idDNI,
    });

    const dataProfessor = await resultProfessor.catch((err) => {
      console.log("Professor Controller Error Professor", err);
      return null;
    });

    console.log("Se creo el profito -------------->", dataProfessor);
    const resultLogin = instanceLoginService.create({ Email, Password, idDNI });
    const dataLogin = await resultLogin.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });

    console.log("Se creo el data Login ----------> ", dataLogin);
    return dataLogin;
  }

  async login(email, password) {
    const instanceLoginRepository = new LoginRepository(loginDb);
    const instanceLoginService = new LoginService(instanceLoginRepository);
    const resulLogin = instanceLoginService.authenticate(email, password);
    const dataLogin = await resulLogin.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return dataLogin;
  }

  async getAllCourses(id) {
    const instanceCourseRepository = new CourseRepository(courseDb);
    const instanceCourseService = new CourseService(instanceCourseRepository);

    const resultCourse = await instanceCourseService
      .findByIdProfessor(id)
      .catch((err) => {
        console.log("Professor Controller Error", err);
        return null;
      });
    return resultCourse;
  }

  async getProfessorToCourse(token) {
    const instanceProfessorRepository = new ProfessorRepository(professorDb);
    const instanceProfessorService = new ProfessorService(
      instanceProfessorRepository
    );

    const resultProfessor = instanceProfessorService.findByDNI(token);
    const dataProfessor = await resultProfessor.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return dataProfessor;
  }

  async getStudentsOfCourses(token) {
    const instanceCourseStudentsRepository = new CourseStudentsRepository(
      courseStudentsDb
    );
    const instanceCourseStudentsService = new CourseStudentsService(
      instanceCourseStudentsRepository
    );

    const resultStudentsCourse =
      instanceCourseStudentsService.studentsForCourse(token);
    const dataStudentsCourse = await resultStudentsCourse.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return dataStudentsCourse;
  }

  async deleteCourse(id) {
    const instanceCourseRepository = new CourseRepository(courseDb);
    const instanceCourseService = new CourseService(instanceCourseRepository);

    const result = instanceCourseService.delete(id);
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }

  async getCourse(id) {
    const instanceCourseRepository = new CourseRepository(courseDb);
    const instanceCourseService = new CourseService(instanceCourseRepository);

    const result = instanceCourseService.get(id);
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }

  async updateCourse(name, section, type, semestre, id) {
    const instanceCourseRepository = new CourseRepository(courseDb);
    const instanceCourseService = new CourseService(instanceCourseRepository);

    const result = instanceCourseService.update({
      name,
      section,
      type,
      semestre,
      id,
    });
    const data = await result.catch((err) => {
      console.log("Professor Controller Error", err);
      return null;
    });
    return data;
  }
}

module.exports = ProfessorController;
