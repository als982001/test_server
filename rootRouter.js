import express from "express";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  return res.status(200).json("Hello!");
});

export default rootRouter;
