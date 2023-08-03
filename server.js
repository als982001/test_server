import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import flash from "express-flash";
import https from "https";
import fs from "fs";
import path from "path";
import MongoStore from "connect-mongo";
import rootRouter from "./rootRouter";

const cookieParser = require("cookie-parser");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const logger = morgan("dev");

app.use(
  session({
    // secret: process.env.COOKIE_SECRET, // 쿠키에 sign 할 때 사용하는 string
    secret: "secret", // 쿠키에 sign 할 때 사용하는 string
    resave: false,
    saveUninitialized: true, // 세션이 새로 만들어지고 수정된 적이 없을 때 => uninitialized
    cookie: {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    },
    // store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(flash());

app.use(
  "/images",
  express.static(path.join(__dirname, "../uploads")),
  rootRouter
);

app.use("/", rootRouter);

export default app;
