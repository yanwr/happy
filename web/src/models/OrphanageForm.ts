export default interface OrphanageForm {
  id?:number;
  name:string;
  latitude:number;
  longitude:number;
  descriptions:string;
  instructions:string;
  opening_hours:string;
  open_on_weekend:boolean;
  images: Array<File>;
};