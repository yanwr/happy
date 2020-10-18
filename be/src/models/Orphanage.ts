import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'; 
import OrphanageImages from './OrphanageImages';

@Entity('orphanage')
export default class Orphanage {

  constructor(name:string, latitude:number, longitude:number, descriptions:string, instructions:string, opening_hours:string, open_on_weekend:boolean, images:OrphanageImages[] ){
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.descriptions = descriptions;
    this.instructions = instructions;
    this.opening_hours = opening_hours;
    this.open_on_weekend = open_on_weekend; 
    this.images = images; 
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  descriptions: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekend: boolean;

  @OneToMany(() => OrphanageImages, orphanageImages => orphanageImages.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' })
  images:OrphanageImages[];
}