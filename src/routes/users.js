import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";

const router = Router();

router.use(verifyJWT);
router.get("/me");

export default router;
