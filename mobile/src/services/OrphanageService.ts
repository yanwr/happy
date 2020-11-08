import { Orphanage, OrphanageForm } from "../models";
import api from "./api";

export async function loadAllOrphanages() {
  try {
    const response = await api.get<Array<Orphanage>>('/orphanages');
    return response.data;
  } catch (ex) {
    console.error(ex);
    throw new Error(ex);
  }
}

export async function loadOneOrphanages(id:number) {
  try {
    const response = await api.get<Orphanage>(`/orphanages/${id}`);
    return response.data;
  } catch (ex) {
    console.error(ex);
    throw new Error(ex);
  }
}

export async function createOrphanage(orphanage:OrphanageForm) {
  try {
    const imagesUrl = await uploadImages(orphanage.images);
    const body:Orphanage = {...orphanage, images: imagesUrl};
    const response = await api.post('/orphanages', body);
    alert('Orphanage created with success!');
  } catch (ex) {
    console.error(ex);
    throw new Error(ex);
  }
}

async function uploadImages(images: string[]) {
  try {
    const body = new FormData();
    images.forEach((url, index) => {
      body.append("images", {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: url
      } as any);
    });
    const response = await api.post('/orphanages/upload/images', body);
    return response.data;
  } catch (ex) {
    console.error(ex);
    throw new Error(ex);
  }
}