import OrphanageImages from "../OrphanageImages";

export default {
  convert(orphanageImages: OrphanageImages) {
    return {
      id: orphanageImages.id, 
      url: `http://localhost:3333/orpanhages/images/${orphanageImages.path}`
    };
  },

  convertMany(orphanageImages: OrphanageImages[]){
    return orphanageImages.map( orphanageImage => this.convert(orphanageImage));
  }
}