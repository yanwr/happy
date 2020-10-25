import OrphanageImages from "./OrphanageImages";

export default interface Orphanage {
  id?:number;
  name:string;
  latitude:number;
  longitude:number;
  descriptions:string;
  instructions:string;
  opening_hours:string;
  open_on_weekend:boolean;
  images?: Array<OrphanageImages>;
};