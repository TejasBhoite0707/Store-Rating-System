import {
  getAllStores,
  getStoreOwnerDashboard,
} from "../services/store.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/responseHandler.js";


export const fetchStores =
  async (req, res) => {
    try {
      const search =
        req.query.search || "";

      const stores =
  await getAllStores(
    search,
    req.user.id
  );

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

export const ownerDashboard =
  async (req, res) => {
    try {
      const dashboard =
        await getStoreOwnerDashboard(
          req.user.id
        );

      return successResponse(
        res,
        "Store owner dashboard fetched",
        dashboard
      );
    } catch (error) {
      return errorResponse(
        res,
        error.message
      );
    }
  };