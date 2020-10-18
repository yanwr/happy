import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

@EntityRepository(Orphanage)
class OrphanageRepository extends Repository<Orphanage> {}

export default () => getCustomRepository(OrphanageRepository);