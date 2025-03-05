import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('membership')
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  membership!: string;

  @Column()
  category!: string;

  @Column({ nullable: true })
  subCategory!: string;

  @Column()
  period!: string;

  @Column()
  time!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column() 
  prices!: string;
}
