import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import roleMiddleware from "../middleware/role.middleware.js";

import {
  fetchStores,
  ownerDashboard,
} from "../controllers/store.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  fetchStores
);

router.get(
  "/owner/dashboard",
  authMiddleware,
  roleMiddleware("STORE_OWNER"),
  ownerDashboard
);

export default router;