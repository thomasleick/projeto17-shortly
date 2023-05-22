import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import urlSchema from "../schemas/urlSchema.js";
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
router.post("/shorten", schemaValidator(urlSchema), postShorten);
router.delete("/:id", validateIdAsParams, deleteShorten);

export default router;
