import express, { Request, Response } from "express";
import { AppDataSource } from "./connection/data-source";
import { Membership } from "./entities/membership";
const app = express();
app.use(express.json());

const PORT = 4011;

app.get('/memberships', async (req: Request, res: Response) => {
    try {
        console.log("hello");
      const memberships = await Membership.find();
      res.json(memberships);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching memberships', error });
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