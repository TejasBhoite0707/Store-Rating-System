import {
  submitRating,
} from "../services/rating.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/responseHandler.js";

export const submitStoreRating =
  async (req, res) => {
    try {
      const rating =
        await submitRating(
          req.user.id,
          req.body
        );

      return successResponse(
        res,
        "Rating submitted successfully",
        rating
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message,
        400
      );
    }
  };