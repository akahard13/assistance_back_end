import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToOne } from 'typeorm';
import { Students } from './../../students/entities/student.entity';

@Entity({ name: 'encodings'})
export class Encodings extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  id_student: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => Students, student => student.encoding)
  student: Students;
}
