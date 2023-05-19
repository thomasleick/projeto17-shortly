import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getUserInfo } from "../controllers/userController.js";

const router = Router();

router.use(verifyJWT);
router.get("/me", getUserInfo);

export default router;
