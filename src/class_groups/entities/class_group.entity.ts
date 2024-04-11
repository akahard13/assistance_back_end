import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, BaseEntity, JoinColumn, OneToMany } from 'typeorm';
import { Classes } from '../../classes/entities/class.entity';
import { Professors } from '../../professors/entities/professor.entity';
import { Classrooms } from '../../classrooms/entities/classroom.entity';
import { ClassSchedule } from 'src/class_schedule/entities/class_schedule.entity';

@Entity({ name: 'class_groups' })
@Unique(['time', 'day', 'id_class', 'id_professor', 'id_classroom'])
export class ClassGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Classes, { eager: true })
  @JoinColumn({ name: 'id_class' })
  id_class: Classes;

  @ManyToOne(() => Professors, { eager: true })
  @JoinColumn({ name: 'id_professor' })
  id_professor: Professors;
  @OneToMany(() => ClassSchedule, classSchedule=> classSchedule.id_group)
  classSchedule: ClassSchedule;
}
