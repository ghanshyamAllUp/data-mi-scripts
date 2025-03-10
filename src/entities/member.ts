import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('member')
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  salesStatus!: string;

  @Column({ nullable: true })
  member!: string;

  @Column({ nullable: true })
  sales!: string;

  @Column({ nullable: true })
  trainer!: string;

  @Column({ nullable: true })
  gender!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  membershipCode!: string;

  @Column({ nullable: true })
  nationality!: string;

  @Column({ nullable: true, type: 'date' })
  birthDay!: Date;

  @Column({ nullable: true })
  reference!: string;

  @Column({ nullable: true })
  clientType!: string;

  @Column({ nullable: true })
  clientCampaign!: string;

  @Column({ nullable: true })
  notes!: string;

  @Column({ nullable: true })
  membershipName!: string;

  @Column({ nullable: true, type: 'date' })
  activationDate!: Date;

  @Column({ nullable: true, type: 'date' })
  expiredDate!: Date;

  @Column({ nullable: true, type: 'date' })
  joinDate!: Date;

  @Column({ nullable: true })
  membershipType!: string;

  @Column({ nullable: true })
  originalPricePlan!: string;

  @Column({ nullable: true })
  totalInvoiceWithVAT!: string;

  @Column({ nullable: true })
  totalInvoiceWithoutVAT!: string;

  @Column({ nullable: true })
  payment!: string;

  @Column({ nullable: true })
  totalPayment!: string;

  @Column({ nullable: true })
  paymentType!: string;

  @Column({ nullable: true })
  treasury!: string;

  @Column({ nullable: true })
  status!: string;

  @Column({ nullable: true })
  invoiceNo!: string;
}
