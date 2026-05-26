import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import roleMiddleware from "../middleware/role.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
  createUserSchema,
} from "../validations/user.validation.js";

import {
  createStoreSchema,
} from "../validations/store.validation.js";

import {
  createUser,
  addStore,
  dashboardStats,
  fetchAllUsers,
  fetchAllStores,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.use(
  roleMiddleware("ADMIN")
);

router.post(
  "/users",
  validate(createUserSchema),
  createUser
);

router.post(
  "/stores",
  validate(createStoreSchema),
  addStore
);

router.get(
  "/dashboard",
  dashboardStats
);

router.get(
  "/users",
  fetchAllUsers
);

router.get(
  "/stores",
  fetchAllStores
);

export default router;