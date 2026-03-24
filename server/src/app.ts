import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./app/routes";
import { env } from "./config/env";
import { APP_CONSTANTS } from "./common/constants/app.constants";
import { errorMiddleware } from "./common/middlewares/error.middleware";
import { globalRateLimiter } from "./common/middlewares/ratelimit.middleware";
import { notFoundMiddleware } from "./common/middlewares/notFound.middleware";
import { requestIdMiddleware } from "./common/middlewares/requestId.middleware";

const app = express();

app.use(requestIdMiddleware);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://writemyfile.netlify.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]"),
);

app.use(globalRateLimiter);

app.use(express.json({ limit: APP_CONSTANTS.REQUEST.JSON_LIMIT }));
app.use(
  express.urlencoded({
    extended: true,
    limit: APP_CONSTANTS.REQUEST.URL_ENCODED_LIMIT,
  }),
);

app.use("/api/v1", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
