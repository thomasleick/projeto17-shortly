import { Router } from "express";
import { validateNewUser } from "../middlewares/validateAuth.js";
import { postUser } from "../controllers/authController.js";

const router = Router();

router.post("/", validateNewUser, postUser);

export default router;
