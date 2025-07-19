import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

import { errorHandler } from "./middleware/errorHandler.middleware.js";
import userRoutes from "./routes/user.route.js";
import businessRoutes from "./routes/business.route.js";
import contentRoutes from "./routes/content.route.js";

app.use("/api/v1", userRoutes);
app.use("/api/v1", businessRoutes);
app.use("/api/v1", contentRoutes);

app.get("/", (_, res) => {
  return res.json(
    "Hello from the server! Your request is like a clean commit—it's been received, and we're already processing it. Stay tuned for the response, which will be as polished as a well-crafted pull request!"
  );
});

app.use(errorHandler);

export { app };
