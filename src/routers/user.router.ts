import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.findAll);

router.get("/:id", userController.findById);

router.post("/", userMiddleware.isCreateValid, userController.create);

router.put("/:id", userController.updateById);

router.delete("/:id", userController.deleteById);

export const userRouter = router;
