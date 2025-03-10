import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("workout_logs")
export class WorkoutLog extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  trainerName!: string;

  @Column({ nullable: true })
  clientName!: string;

  @Column({ nullable: true })
  membershipCode!: string;

  @Column({ nullable: true })
  serviceName!: string;

  @Column({ nullable: true })
  serviceCost!: number;

  @Column({ type: "date", nullable: true })
  date!: string;

  @Column({ nullable: true })
  paymentDate!: string;

  @Column({ default: false })
  clientAttend!: boolean;

  @Column({ default: false })
  trainerAttend!: boolean;

  @Column({ default: false })
  archived!: boolean;
}
