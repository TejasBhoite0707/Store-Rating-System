import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import roleMiddleware from "../middleware/role.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
  ratingSchema,
} from "../validations/rating.validation.js";

import {
  submitStoreRating,
} from "../controllers/rating.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("USER"),
  validate(ratingSchema),
  submitStoreRating
);

export default router;