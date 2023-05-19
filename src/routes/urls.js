import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { validateUrl } from "../middlewares/ValidateUrl.js";
import {
  postShorten,
  getUrl,
  redirectTo,
  deleteShorten,
} from "../controllers/urlController.js";
import {
  validateIdAsParams,
  validateNanoIdAsParams,
} from "../middlewares/validateParams.js";

const router = Router();

// Routes
router.get("/:id", validateIdAsParams, getUrl);
router.get("/open/:shortUrl", validateNanoIdAsParams, redirectTo);

router.use(verifyJWT);
// Protected Routes
router.post("/shorten", validateUrl, postShorten);
router.delete("/:id", validateIdAsParams, deleteShorten);

export default router;
