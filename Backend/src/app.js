import express from "express";
import cors from "cors";
import prisma from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import storeRoutes from "./routes/store.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Store Rating API Running",
  });
});

app.get("/test-db",async(req,res)=>{
    const users = await prisma.user.findMany();

  res.json({
    success: true,
    data: users,
  });
});

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/ratings", ratingRoutes);

export default app;