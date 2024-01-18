import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    userId!: number;
    
    @Column()
    note!: string;
    
    @Column()
    date!: string;
}