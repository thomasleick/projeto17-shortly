import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { validateUrl } from "../middlewares/ValidateUrl.js";
import { postShorten, getUrl } from "../controllers/urlController.js";
import { validateIdAsParams } from "../middlewares/validateParams.js";

const router = Router();

// Routes
router.get("/:id", validateIdAsParams, getUrl);
router.get("/open/:shortUrl");

router.use(verifyJWT);
// Protected Routes
router.post("/shorten", validateUrl, postShorten);
router.delete(":id");

export default router;
