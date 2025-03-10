import express, { Request, Response } from "express";
import { AppDataSource } from "./connection/data-source";
import { Membership } from "./entities/membership";
import { PrivateCoachingContracts } from "./entities/private-coaching-contracts";
import { Lead } from "./entities/Lead";
import { WorkoutLog } from "./entities/WorkoutLog";
import { Member } from "./entities/member";
import multer from "multer";
import * as XLSX from "xlsx";

const app = express();
app.use(express.json());

const PORT = 4011;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please upload an Excel file."), false);
  }
};

const upload = multer({ storage, fileFilter });

app.get("/getmemberships", async (req: Request, res: Response) => {
  try {
    console.log("hello");
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: "Error fetching memberships", error });
  }
});

// app.post(
//   "/upload",
//   upload.single("file"),
//   async (req: Request, res: Response) => {
// app.get('/getmemberships', async (req: Request, res: Response) => {
//     try {
//         console.log("hello");
//       const memberships = await Membership.find();
//       res.json(memberships);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching memberships', error });
//     }
//   });

app.post(
  "/uploadmemberships",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded." });
      } else {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        console.log("sheetName:", sheetName);
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: null,
        });

        const memberships = jsonData.map((row) => {
          const membershipData: Partial<Membership> = {
            membership: row["Membership"],
            category: row["Category"],
            subCategory: row["Sub Category"],
            period: row["Period"],
            time: row["Time"],
            isActive: row["IsActive"] !== "Deactivated",
            prices: row["Prices"],
          };

          return Membership.create(membershipData);
        });
        await Membership.save(memberships);

        res.status(200).json({ message: "Data imported successfully!" });
      }
    } catch (error) {
      console.error("Error during file processing:", error);
      res.status(500).json({ message: "Error processing file", error });
    }
  }
);

app.post(
  "/uploadLeadsData",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded." });
      } else {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        console.log("sheetName:", sheetName);
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: null,
        });

        const leads = jsonData.map((row) => {
          const leadData: Partial<Lead> = {
            date: row["Date"],
            time: row["Time"],
            salutation: row["Salutation"],
            name: row["Name"],
            mobileNumber: row["Mobile Number"],
            emailAddress: row["E-mail Address"],
            occupation: row["Occupation"],
            leadSource: row["Lead Source"],
            campaign: row["Campaign"],
            salesPerson: row["Sales Person"],
            leadType: row["Lead Type"],
            nationality: row["Nationality"],
            city: row["City"],
            address: row["Address"],
            companyName: row["Company Name"],
            companyIndustry: row["Company Industry"],
            rate: row["Rate"], // Use `undefined` instead of `null`
          };

          return Lead.create(leadData);
        });
        await Lead.save(leads);

        res.status(200).json({ message: "Data imported successfully!" });
      }
    } catch (error) {
      console.error("Error during file processing:", error);
      res.status(500).json({ message: "Error processing file", error });
    }
  }
);

app.post(
  "/uploadWorkoutLogsData",
  upload.single("file"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded." });
        return;
      }

      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        defval: null,
      });

      const workoutLogs = jsonData.map((row) => {
        const logData: Partial<WorkoutLog> = {
          trainerName: row["Trainer Name"],
          clientName: row["Client Name"],
          membershipCode: row["Membership Code"],
          serviceName: row["Service Name"],
          serviceCost: row["Service Cost"] || 0,
          date: row["Date"],
          paymentDate: row["Payment Date"],
          clientAttend: row["Client Attend"] === "Yes",
          trainerAttend: row["Trainer Attend"] === "Yes",
          archived: row["Archived"] === "Yes",
        };

        return WorkoutLog.create(logData);
      });

      await WorkoutLog.save(workoutLogs);
      res.status(200).json({ message: "Data imported successfully!" });
    } catch (error) {
      console.error("Error during file processing:", error);
      res.status(500).json({ message: "Error processing file", error });
    }
  }
);
app.post(
  "/uploadprivatecoachingcontracts",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded." });
      } else {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        console.log("sheetName:", sheetName);
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: null,
        });

        const invoices = jsonData.map((row) => {
          const invoiceData: Partial<PrivateCoachingContracts> = {
            invoiceNumber: row["Invoice #"],
            client: row["Client"],
            membershipCode: row["Membership Code"],
            services: row["Services"],
            employee: row["Employee"],
            transactionDate: row["Transaction Date"],
            startDate: row["Start Date"] === "'-" ? null : row["Start Date"],
            endDate: row["End Date"] === "'-" ? null : row["End Date"],
            cost: row["Cost"],
            payment: row["Payment"],
            isArchived: row["is archived"] === "NO", // is archived
            isPaid: row["Paid"] === "Yes", // Paid
            takenSessions: row["Taken Sessions :"], // Taken Sessions
            remainingSessions: row["Remaining Sessions :"], // Remaining Sessions
            notes: row["Notes"], // Notes
            actions: row["Actions"], // Actions
          };

          return PrivateCoachingContracts.create(invoiceData);
        });

        await PrivateCoachingContracts.save(invoices);

        res.status(200).json({ message: "Invoices imported successfully!" });
      }
    } catch (error) {
      console.error("Error during file processing:", error);
      res.status(500).json({ message: "Error processing file", error });
    }
  }
);

app.post(
  "/uploadmembers",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded." });
      } else {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: null,
        });

        const members = jsonData.map((row) => {
          const memberData: Partial<Member> = {
            salesStatus: row["Sales Status"],
            member: row["Member"],
            sales: row["Sales"],
            trainer: row["Trainer"],
            gender: row["Gender"],
            phone: row["Phone"],
            email: row["Email:"],
            membershipCode: row["MemberShip Code:"],
            nationality: row["Nationality"],
            birthDay:
              row["Birth Day:"] === "-" || !row["Birth Day:"]
                ? null
                : row["Birth Day:"],
            reference: row["Reference:"],
            clientType: row["Client Type:"],
            clientCampaign: row["Client Campaign:"],
            notes: row["Notes:"],
            membershipName: row["Membership Name:"],
            activationDate:
              row["Activation Date:"] === "-" || !row["Activation Date:"]
                ? null
                : row["Activation Date:"],
            expiredDate:
              row["Expired Date:"] === "-" || !row["Expired Date:"]
                ? null
                : row["Expired Date:"],
            joinDate:
              row["Join Date"] === "-" || !row["Join Date"]
                ? null
                : row["Join Date"],
            membershipType: row["Membership Type"],
            originalPricePlan: row["Original Price Plan:"],
            totalInvoiceWithVAT: row["Total Invoice with VAT:"],
            totalInvoiceWithoutVAT: row["Total Invoice without VAT:"],
            payment: row["Payment:"],
            totalPayment: row["Total Payment:"],
            paymentType: row["Payment Type:"],
            treasury: row["Treasury:"],
            status: row["Status"],
            invoiceNo: row["Invoice No:"],
          };

          return Member.create(memberData);
        });

        await Member.save(members);

        res.status(200).json({ message: "Members imported successfully!" });
      }
    } catch (error) {
      console.error("Error during file processing:", error);
      res.status(500).json({ message: "Error processing file", error });
    }
  }
);

app.listen(PORT, () => {
  console.log("Server running on PORT: " + PORT);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.log("Error during Data Source initialization:", error);
  });
