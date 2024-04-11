import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { ClassGroup } from 'src/class_groups/entities/class_group.entity';
@Entity({ name: 'professors' })
export class Professors extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200, nullable: false })
    fullname: string;

    @Column({ length: 100, nullable: false })
    email: string;

    @Column({ length: 12, nullable: true })
    cellphone: string;

    @Column({ default: false })
    isAdmin: boolean;

    @OneToMany(() => ClassGroup, classGroup => classGroup.id_professor)
    classGroup: ClassGroup;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
