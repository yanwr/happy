import { Orphanage } from "../models";
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