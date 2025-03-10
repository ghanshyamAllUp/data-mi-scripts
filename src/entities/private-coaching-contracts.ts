import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('invoice')
export class PrivateCoachingContracts extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  invoiceNumber!: string; 

  @Column({ nullable: true })
  client!: string; 

  @Column({ nullable: true })
  membershipCode!: string; 

  @Column({ nullable: true })
  services!: string; 

  @Column({ nullable: true })
  employee!: string; 

  @Column({ type: 'date', nullable: true })
  transactionDate!: string; 

  @Column({ type: 'date', nullable: true })
  startDate!: string; 

  @Column({ type: 'date', nullable: true })
  endDate!: string; 

  @Column({ nullable: true })
  cost!: number; // Cost

  @Column({ nullable: true })
  payment!: string; // Payment

  @Column({ default: false })
  isArchived!: boolean; // is archived

  @Column({ default: false })
  isPaid!: boolean; 

  @Column({ nullable: true , default: 0})
  takenSessions!: number; 

  @Column({ nullable: true })
  remainingSessions!: number; 

  @Column({ nullable: true, type: 'text' })
  notes!: string; // Notes

  @Column({ nullable: true })
  actions!: string; // Actions
}
