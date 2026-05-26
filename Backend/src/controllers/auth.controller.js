import {
  signupUser,
  loginUser,
} from "../services/auth.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/responseHandler.js";

export const signup = async (req, res) => {
  try {
    const user = await signupUser(req.body);

    return successResponse(
      res,
      "User registered successfully",
      user,
      201
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);

    return successResponse(
      res,
      "Login successful",
      data
    );
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};