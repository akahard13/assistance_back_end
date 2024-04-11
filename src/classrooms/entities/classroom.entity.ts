import { ClassSchedule } from 'src/class_schedule/entities/class_schedule.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToOne, OneToMany } from 'typeorm';

@Entity({ name: 'classrooms'})
export class Classrooms extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  name: string;

  @OneToMany(() => ClassSchedule, classSchedule=> classSchedule.id_classroom)
  classSchedule: ClassSchedule;
}
