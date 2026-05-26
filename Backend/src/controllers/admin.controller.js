import {
  successResponse,
  errorResponse,
} from "../utils/responseHandler.js";

import {
  createUserByAdmin,
  createStore,
  getDashboardStats,
  getAllUsers,
  getAllStores,
} from "../services/admin.service.js";

export const createUser =
  async (req, res) => {
    try {
      const user =
        await createUserByAdmin(
          req.body
        );

      return successResponse(
        res,
        "User created successfully",
        user,
        201
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message,
        400
      );
    }
  };

export const addStore =
  async (req, res) => {
    try {
      const store =
        await createStore(
          req.body
        );

      return successResponse(
        res,
        "Store created successfully",
        store,
        201
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message,
        400
      );
    }
  };

export const dashboardStats =
  async (req, res) => {
    try {
      const stats =
        await getDashboardStats();

      return successResponse(
        res,
        "Dashboard stats fetched",
        stats
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  };

export const fetchAllUsers =
  async (req, res) => {
    try {
      const users =
        await getAllUsers(
          req.query
        );

      return successResponse(
        res,
        "Users fetched successfully",
        users
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  };

export const fetchAllStores =
  async (req, res) => {
    try {
      const stores =
        await getAllStores();

      return successResponse(
        res,
        "Stores fetched successfully",
        stores
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  };