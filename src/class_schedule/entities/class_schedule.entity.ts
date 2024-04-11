import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Classrooms } from '../../classrooms/entities/classroom.entity';
import { ClassGroup } from '../../class_groups/entities/class_group.entity';

@Entity()
@Unique(['time_class', 'day_class', 'id_classroom'])
export class ClassSchedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClassGroup)
  @JoinColumn({ name: 'id_group' })
  id_group: ClassGroup;

  @ManyToOne(() => Classrooms)
  @JoinColumn({ name: 'id_classroom' })
  id_classroom: Classrooms;

  @Column()
  time_class: string;

  @Column()
  day_class: string;
}
