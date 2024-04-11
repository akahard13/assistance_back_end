import { BaseEntity, Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { Encodings } from './../../encodings/entities/encoding.entity';

@Entity({ name: 'students' })
export class Students extends BaseEntity {
    @PrimaryColumn({ length: 30 })
    carnet: string;
  
    @Column({ length: 200 })
    fullname: string;
  
    @Column({ length: 100 })
    email: string;
  
    @Column({ length: 12, nullable: true })
    cellphone: string;
  
    @Column()
    grade: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @OneToOne(() => Encodings, encoding => encoding.student)
    encoding: Encodings;
}
