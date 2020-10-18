import Orphanage from "../Orphanage";
import OrphanageImagesDTO from "../DTOs/OrphanageImagesDTO";

export default {
  convert(orphanage: Orphanage) {
    return {
      id: orphanage.id, 
      name: orphanage.name, 
      latitude: orphanage.latitude, 
      longitude: orphanage.longitude, 
      descriptions: orphanage.descriptions, 
      instructions: orphanage.instructions, 
      opening_hours: orphanage.opening_hours, 
      open_on_weekend: orphanage.open_on_weekend,
      images: OrphanageImagesDTO.convertMany(orphanage.images),
    };
  },

  convertMany(orphanages: Orphanage[]){
    return orphanages.map( orphanage => this.convert(orphanage));
  }
}