import { Router } from "express";
import UserController from "@/controller/api";

const router = Router();

router.post("/create-user-data", UserController.createUserController);
router.put("/update-user-data/:user_id", UserController.updateUserController);
router.get("/fetch-user-data", UserController.getUsersController);
router.get("/fetch-user-data/:user_id", UserController.getUserDetailController);

export default router;
