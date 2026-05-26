import {
  successResponse,
} from "../utils/responseHandler.js";

export const getCurrentUser = async (
  req,
  res
) => {
  return successResponse(
    res,
    "Current user fetched successfully",
    req.user
  );
};