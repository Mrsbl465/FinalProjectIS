const BaseRepository = require("./base.repository");

class SheduleRepository extends BaseRepository {
  constructor(SheduleDb) {
    super(SheduleDb);
  }
  async getAllWithoutPagination() {
    return this.model.find();
  }
}

module.exports = SheduleRepository;
