import express, { Request, Response } from "express";
import { AppDataSource } from "./connection/data-source";
import { Membership } from "./entities/membership";
import multer from "multer";
import * as XLSX from "xlsx";
import { console } from "inspector";

const app = express();
app.use(express.json());

const PORT = 4011;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");  
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);  
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      cb(null, true);  
    } else {
      cb(new Error("Please upload an Excel file."), false);  
    }
  };

const upload = multer({ storage, fileFilter });


app.get('/memberships', async (req: Request, res: Response) => {
    try {
      const memberships = await Membership.find();
      res.json(memberships);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching memberships', error });
    }
  });

  app.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded." });
      }else{
    
        console.log("hllo ghan")

      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0]; 
      console.log("sheetName:", sheetName)
      const worksheet = workbook.Sheets[sheetName];
  
    const jsonData : any[]= XLSX.utils.sheet_to_json(worksheet, { defval: null });
  
        console.log("hllo ghan2");
    const memberships = jsonData.map((row) => {
 
      
        const membershipData : Partial<Membership>= {
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
  });

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