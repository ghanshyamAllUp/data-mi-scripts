import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("leads") // Table name will be 'leads'
export class Lead extends BaseEntity {
  // Primary key column (auto-generated UUID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Date and Time
  @Column({ type: "date", nullable: true })
  date!: string;

  @Column({ type: "time", nullable: true })
  time!: string;

  // Personal Details
  @Column({ nullable: true })
  salutation!: string; // e.g., Mr., Mrs., Ms., Dr.

  @Column({ nullable: true })
  name!: string; // Full name of the lead

  @Column({ nullable: true })
  mobileNumber!: string; // Mobile number of the lead

  @Column({ nullable: true })
  emailAddress!: string; // Email address of the lead

  @Column({ nullable: true })
  occupation!: string; // Occupation of the lead

  // Lead Details
  @Column({ nullable: true })
  leadSource!: string; // Source of the lead (e.g., Website, Referral, Social Media)

  @Column({ nullable: true })
  campaign!: string; // Campaign associated with the lead

  @Column({ nullable: true })
  salesPerson!: string; // Name of the salesperson handling the lead

  @Column({ nullable: true })
  leadType!: string; // Type of lead (e.g., Hot, Warm, Cold)

  // Location Details
  @Column({ nullable: true })
  nationality!: string; // Nationality of the lead

  @Column({ nullable: true })
  city!: string; // City of the lead

  @Column({ nullable: true })
  address!: string; // Address of the lead

  // Company Details
  @Column({ nullable: true })
  companyName!: string; // Name of the lead's company

  @Column({ nullable: true })
  companyIndustry!: string; // Industry of the lead's company

  // Rate
  @Column({ type: "text", nullable: true })
  rate!: string; // Rate associated with the lead (e.g., budget, pricing)
}
