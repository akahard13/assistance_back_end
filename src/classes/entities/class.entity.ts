import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { ClassGroup } from 'src/class_groups/entities/class_group.entity';

@Entity({ name: 'classes' })
export class Classes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column()
    grade: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => ClassGroup, classGroup => classGroup.id_class)
    classGroup: ClassGroup;
}
