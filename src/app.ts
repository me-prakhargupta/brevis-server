import express from "express";
import cors from "cors";
import type { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Brevis is active.");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
import userRouter from "./routes/user.route.js";
import thoughtRouter from "./routes/thought.route.js";
import messsageRouter from "./routes/message.route.js";
import responseRouter from "./routes/response.route.js";

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/thought", thoughtRouter);
app.use("/api/v1/message", messsageRouter);
app.use("/api/v1/users", responseRouter);

// Error middleware
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

export default app;