const BaseService = require("./base.service");

class InscriptionService extends BaseService {
  constructor(InscriptionRepository) {
    super(InscriptionRepository);
    this._InscriptionRepository = InscriptionRepository;
  }

  async deleteInscription(id, StudentId) {
    if (!id || !StudentId) {
      const error = new Error();
      error.status = 400;
      error.message = "Parametro id debe ser enviado";
      throw error;
    }

    const entity = await this.repository.deleteInscription(id, StudentId);

    if (!entity) {
      const error = new Error();
      error.status = 400;
      error.message = "Entidad no encontrada";
      throw error;
    }
    return entity;
  }
}

module.exports = InscriptionService;
