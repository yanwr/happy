import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import OrphanageImages from "../models/OrphanageImages";

@EntityRepository(OrphanageImages)
class OrphanageImagesRepository extends Repository<OrphanageImages> {}

export default () => getCustomRepository(OrphanageImagesRepository);