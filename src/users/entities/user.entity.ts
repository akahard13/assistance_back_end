import { ManyToOne, JoinColumn, BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Professors } from '../../professors/entities/professor.entity';
@Entity({ name: 'users' })
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn({ name: 'id_professor'})
    id_professor: Professors;

    @Column({ unique: true })
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    
}


/*

hqwnbqdjnduqw|dnqudbnqwidnjqwdid int auto_increment primary key,
  cod VARCHAR(30) unique,
  fullname VARCHAR(200) NOT NULL,
  email VARCHAR(100) NOT NULL,
  cellphone VARCHAR(12),
  grade INT(10),
    isProfessor boolean default false,
  isAdmin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP*/

  /*updated*/