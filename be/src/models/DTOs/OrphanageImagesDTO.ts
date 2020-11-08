import OrphanageImages from "../OrphanageImages";

export default {
  convert(orphanageImages: OrphanageImages) {
    return {
      id: orphanageImages.id, 
      url: `http://192.168.0.15:3333/orpanhages/images/${orphanageImages.path}`
    };
  },

  convertMany(orphanageImages: OrphanageImages[]){
    return orphanageImages.map( orphanageImage => this.convert(orphanageImage));
  }
}