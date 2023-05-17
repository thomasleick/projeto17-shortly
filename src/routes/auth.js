import { Router } from "express";
import { validateLogin, validateNewUser } from "../middlewares/validateAuth.js";
import {
  handleLogin,
  handleLogout,
  postUser,
} from "../controllers/authController.js";

const router = Router();

router.post("/signin", validateLogin, handleLogin);
router.post("/signup", validateNewUser, postUser);
router.post("/logout", handleLogout);

export default router;
