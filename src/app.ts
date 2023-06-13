import express, { Request, Response } from "express";

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

app.get("/users", (_req: Request, res: Response) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json(users[+id]);
});

app.post("/users", (req: Request, res: Response) => {
  users.push(req.body);

  res.status(201).json({
    message: "User created",
  });
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

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
