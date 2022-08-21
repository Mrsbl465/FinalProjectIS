const BaseRepository = require("./base.repository");

class CourseRepository extends BaseRepository {
  constructor(CourseDb) {
    super(CourseDb);
  }

  async getAllWithoutPagination() {
    return this.model.find();
  }

  async findByIdProfessor(id) {
    return this.model.findByIdProfessor(id);
  }

  async updateCantEstIn(id) {
    return this.model.updateCantEstIn(id);
  }

  async updateCantEstDe(id) {
    return this.model.updateCantEstDe(id);
  }
}

module.exports = CourseRepository;
