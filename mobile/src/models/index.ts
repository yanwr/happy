export interface Orphanage {
  id?:number;
  name:string; 
  latitude:number;
  longitude:number;
  descriptions:string; 
  instructions:string; 
  opening_hours:string; 
  open_on_weekend:boolean; 
  images:Array<OrphanageImage>;
}

export interface OrphanageForm {
  id?:number;
  name:string; 
  latitude:number;
  longitude:number;
  descriptions:string; 
  instructions:string; 
  opening_hours:string; 
  open_on_weekend:boolean; 
  images:Array<string>;
}

export interface OrphanageImage {
  id:number;
  url:string;
}