import { Router } from "express";
import * as urlControllers from "../controllers/urlControllers.js";

const router = Router();

router.post("/shorten", urlControllers.createShortUrl);
router.get("/shorten/:shortUrl", urlControllers.getOriginalUrl);
router.put("/shorten/:shortUrl", urlControllers.updateOriginalUrl);
router.delete("/shorten/:shortUrl", urlControllers.deleteUrl);
router.get("/shorten/:shortUrl/stats", urlControllers.getShortUrlStats);

export default router;
