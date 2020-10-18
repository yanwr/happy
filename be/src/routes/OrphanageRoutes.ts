import express, { Router } from 'express';
import path from 'path';
import 'express-async-errors';

import orphanageController from '../controllers/OrphanageController';
import uploadImagesController from '../config/UploadImagesConfig';

const routes = Router();

routes.get('/orphanages', orphanageController.index);
routes.get('/orphanages/:id', orphanageController.show);
routes.post('/orphanages', orphanageController.create);

// Upload Images / Get Images
routes.post(
  '/orphanages/upload/images', 
  uploadImagesController.array('images'),
  orphanageController.storeImages
);
routes.use('/orpanhages/images', express.static(
  path.join(__dirname, '..', '..', 'resources', 'upload')
));

export default routes;