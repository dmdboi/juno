import { Router } from "express";
import { HTMLToJSON, JSONToHTML } from "html-to-json-parser";

import ComponentController from "./controllers/components";
import TemplateController from "./controllers/templates";
import PageController from "./controllers/pages";
import SiteController from "./controllers/sites";

import { validator } from "./middleware/validator";

import { CreateComponentValidator, UpdateComponentValidator } from "./validators/ComponentValidators";
import { CreatePageValidatora, UpdatePageValidator } from "./validators/PageValidators";
import { CreateSiteValidator, UpdateSiteValidator } from "./validators/SiteValidators";
import { CreateTemplateValidator } from "./validators/TemplateValidators";

const router = Router();

router.post("/site", validator(CreateSiteValidator), SiteController.store);
router.get("/site", SiteController.get);
router.put("/site/:id", validator(UpdateSiteValidator), SiteController.update);
router.get("/site/:id/html", SiteController.getHTML);

router.get("/components", ComponentController.list);
router.post("/components", validator(CreateComponentValidator), ComponentController.store);
router.get("/components/:id", ComponentController.get);
router.put("/components/:id", validator(UpdateComponentValidator), ComponentController.update);
router.get("/components/:id/html", ComponentController.getHTML);

router.get("/pages", PageController.list);
router.post("/pages", validator(CreatePageValidatora), PageController.store);
router.get("/pages/:id", PageController.get);
router.put("/pages/:id", validator(UpdatePageValidator), PageController.update);
router.get("/pages/:id/html", PageController.getHTML);

router.get("/templates", TemplateController.list);
router.post("/templates", validator(CreateTemplateValidator), TemplateController.store);
router.get("/templates/:id", TemplateController.get);
router.get("/templates/:id/html", TemplateController.getHTML);

router.post("/utils/json-to-html", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Missing body",
    });
  }

  const html = await JSONToHTML(req.body);

  res.status(200).send(html);
});

router.post("/utils/html-to-json", async (req, res) => {
  const { html } = req.body;

  if (!html) {
    res.status(400).json({
      message: "Missing html",
    });
  }

  const data = await HTMLToJSON(html);

  res.status(200).json({
    message: "Success",
    data,
  });
});

export default router;
