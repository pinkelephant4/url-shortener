import { Router } from "express";
import * as urlControllers from "../controllers/urlControllers.js";
import validate from "../middlewares/validation.js";
import { createUrlSchema, updateUrlSchema } from "../validators/urlValidators.js";

const router = Router();

router.post("/shorten", validate(createUrlSchema), urlControllers.createShortUrl);
router.get("/shorten/:shortUrl", urlControllers.getOriginalUrl);
router.put("/shorten/:shortUrl", validate(updateUrlSchema), urlControllers.updateOriginalUrl);
router.delete("/shorten/:shortUrl", urlControllers.deleteUrl);
router.get("/shorten/:shortUrl/stats", urlControllers.getShortUrlStats);

export default router;
