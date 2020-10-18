import Orphanage from '../models/Orphanage';
import OrphanageDTO from '../models/DTOs/OrphanageDTO';

import orphanageRepository from '../repositories/OrphanageRepository';

export default class OrphanageService {

  async index() {
    try {
      const orphanages:Orphanage[] = await orphanageRepository().find({ relations: ['images'] });
      return OrphanageDTO.convertMany(orphanages);
    } catch (ex) {
      console.error("Exception at OrphanageService.index : ", ex);
      throw new Error(ex);
    }
  }

  async show(id:string) {
    try {
      const orphanage:Orphanage = await orphanageRepository().findOneOrFail(id, { relations: ['images'] });
      return OrphanageDTO.convert(orphanage);
    } catch (ex) {
      console.error("Exception at OrphanageService.show : ", ex);
      throw new Error();
    }
  }

  async create(orphanage:Orphanage) {
    try {
      return await orphanageRepository().save(orphanage);
    } catch (ex) {
      console.error("Exception at OrphanageService.create : ", ex);
      throw new Error(ex);
    }
  }
}