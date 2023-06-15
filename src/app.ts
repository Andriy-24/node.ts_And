import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/user.model";
import { IUser } from "./types/user.type";

const users = [
  {
    name: "Oleh",
    age: 20,
    gender: "male",
  },
  {
    name: "Anton",
    age: 15,
    gender: "male",
  },
  {
    name: "Andriy",
    age: 19,
    gender: "male",
  },
  {
    name: "Anastasiya",
    age: 17,
    gender: "female",
  },
  {
    name: "Victoria",
    age: 15,
    gender: "female",
  },
];

const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

// CRUD - create, read, update, delete

app.get(
  "/users",
  async (_req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json(users[+id]);
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const createdUser = await User.create(req.body);

    return res.status(201).json(createdUser);
  } catch (e) {
    console.log(e);
  }
});

app.put("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(201).json({
    message: "User updated",
    data: users[+id],
  });
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  users.splice(+id, 1);
  res.status(200).json({
    message: "User deleted",
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT}`);
});
