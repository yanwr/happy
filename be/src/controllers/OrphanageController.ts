import { Response, Request } from 'express';
import Orphanage from '../models/Orphanage';
import OrphanageService from '../services/OrphanageService';
import * as Yup from 'yup';

const orphanageService:OrphanageService = new OrphanageService();

class OrphanageController {

  async index(request: Request, response: Response) {
    const orphanagesDTO = await orphanageService.index();
    return response.json(orphanagesDTO);
  }

  async show(request: Request, response: Response) {
    const orphanageId = request.params.id;
    const orphanageDTO = await orphanageService.show(orphanageId);
    return response.json(orphanageDTO);
  }

  async create(request: Request, response: Response) {
    const { name, latitude, longitude, descriptions, instructions, opening_hours, open_on_weekend, images } = request.body;
    const orphanage:Orphanage = new Orphanage( name, latitude, longitude, descriptions, instructions, opening_hours, open_on_weekend, images );
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      descriptions: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekend: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    });
    await schema.validate(orphanage, { abortEarly: false });
    const _orphanage = await orphanageService.create(orphanage);
    return response.status(201).json(_orphanage);
  }

  async storeImages(request: Request, response: Response) {
    const images = request.files as Express.Multer.File[];
    const pathNames = images.map(image => ({ path: image.filename }));
    return response.status(201).json(pathNames);
  }
}

export default new OrphanageController();