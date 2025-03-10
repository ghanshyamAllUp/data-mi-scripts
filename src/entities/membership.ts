import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('membership')
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  membership!: string  ;

  @Column({ nullable: true })
  category!: string;

  @Column({ nullable: true })
  subCategory!: string;

  @Column({ nullable: true })
  period!: string;

  @Column({ nullable: true })
  time!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true }) 
  prices!: string;
}
