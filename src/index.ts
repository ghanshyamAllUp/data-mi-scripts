import express, { Request, Response } from "express";
import { AppDataSource } from "./connection/data-source";
import { Membership } from "./entities/membership";
import multer from "multer";
import * as XLSX from "xlsx";
import { Lead } from "./entities/Lead";
import { WorkoutLog } from "./entities/WorkoutLog";

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

app.get("/memberships", async (req: Request, res: Response) => {
  try {
    console.log("hello");
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: "Error fetching memberships", error });
  }
});

app.post(
  "/upload",
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
