import { Router } from "express";

import { userController } from "../controllers";

const router = Router();

router.get("/", userController.findAll);

router.get("/:id", userController.findById);

router.post("/", userController.create);

router.put("/:id", userController.updateById);

router.delete("/:id", userController.deleteById);

export const userRouter = router;
