const BaseRepository = require("./base.repository");

class InscriptionRepository extends BaseRepository {
  constructor(InscriptionDb) {
    super(InscriptionDb);
  }

  async deleteInscription(id, StudentId) {
    console.log("si entre :c -----------------------> ");
    return this.model.deleteInscription(id, StudentId);
  }
}

module.exports = InscriptionRepository;
