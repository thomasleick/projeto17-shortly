import { Router } from "express";
import { validateLogin } from "../middlewares/validateAuth.js";
import { handleLogin } from "../controllers/authController.js";

const router = Router();

router.post("/", validateLogin, handleLogin);

export default router;
