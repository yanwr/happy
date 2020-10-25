import api from './api';
import OrphanageForm from '../models/OrphanageForm';
import Orphanage from '../models/Orphanage';

export async function createOrphanage(orphanage:OrphanageForm) {
  try {
    const imagesUrl = await uploadImages(orphanage.images);
    const body:Orphanage = {...orphanage, images: imagesUrl};
    const response = await api.post('/orphanages', body);
    alert('Orphanage created with success!');
  } catch (ex) {
    console.error('Error at OrphanageService.createOrphanage() : ', ex);
  }
}

async function uploadImages(images: File[]) {
  try {
    const body = new FormData();
    images.forEach(x => {
      body.append("images", x);
    });
    const response = await api.post('/orphanages/upload/images', body);
    return response.data;
  } catch (ex) {
    console.error('Error at OrphanageService.uploadImages() : ', ex);
  }
}

export async function loadOrphanages(id?:string) {
  try {
    let promise;
    if (id) {
      promise = api.get(`/orphanages/${id}`);
    } else {
      promise = api.get('/orphanages');
    }
    const response = await promise;
    console.log(`Response at OrphanageService.loadOrphanages(id?:${id}) :` , response);
    return response.data;
  } catch (ex) {
    console.error('Error at OrphanageService.loadOrphanages() : ', ex);
  }
}