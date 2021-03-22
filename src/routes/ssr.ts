import express from "express";
import config from "../config";
import * as SSRController from "../controller/SSRController";

const ssrRoutes = express.Router();

ssrRoutes.get("/", (req, res) =>
  SSRController.getList(req, res, { view: "Home", tag: "home" })
);

ssrRoutes.get("/about", (req, res) =>
  SSRController.getStaticView(req, res, { view: "About" })
);

ssrRoutes.get("/articles", (req, res) =>
  SSRController.getList(req, res, {
    view: "PostList",
    tag: "article",
    title: "Articles",
  })
);

ssrRoutes.get("/articles/:slug([\\w-]{1,100})", (req, res) =>
  SSRController.getSingle(req, res, { view: "PostSingle" })
);

ssrRoutes.get("/portfolio", (req, res) =>
  SSRController.getList(req, res, {
    view: "PortfolioList",
    tag: "portfolio",
    title: "Portfolio",
  })
);

ssrRoutes.get("/portfolio/:slug([\\w-]{1,100})", (req, res) =>
  SSRController.getSingle(req, res, { view: "PortfolioSingle" })
);

ssrRoutes.get("/tag/:tag([\\w-]{1,100})", SSRController.getPostsByTag);
ssrRoutes.use("/static", express.static(config.STATIC, { index: false }));

export default ssrRoutes;