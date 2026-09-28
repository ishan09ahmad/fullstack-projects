import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/task.routes.js";
import cors from "cors";
const app = express();
const origin = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Api is working fine");
});

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

export default app;
