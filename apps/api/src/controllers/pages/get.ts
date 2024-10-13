import { Request, Response } from "express";

import Component from "../../models/Component";
import Page from "../../models/Page";

import { getComponentsInTemplate, restoreComponentsInPageRequest } from "../../libs/template";
import { renderPageHTML } from "../../libs/renderer";

async function get(req: Request, res: Response) {
  const { id } = req.params;

  // Find the content in MongoDB
  let page = await Page.findOne({ id: id });

  if (!page) {
    res.status(404).json({
      message: "Error",
      error: "Page not found",
    });
  }

  const results = await getComponentsInTemplate(page.content);

  if (results.message === "Error") {
    res.status(404).json(results);
  }

  if (results.components!.length > 0) {
    const dbComponents = await Component.find({ ref: { $in: results.components!.map((component: any) => component.ref) } });
    page.content = restoreComponentsInPageRequest(page.content, dbComponents);
  }

  res.status(200).json({
    message: "Success",
    data: page,
  });
}

async function getHTML(req: Request, res: Response) {
  const { id } = req.params;

  // Find the content in MongoDB
  let page = await Page.findOne({ id: id });

  const results = await getComponentsInTemplate(page.content);

  if (results.message === "Error") {
    res.status(404).json(results);
  }

  if (results.components!.length > 0) {
    const dbComponents = await Component.find({ ref: { $in: results.components!.map((component: any) => component.ref) } });
    page.content = restoreComponentsInPageRequest(page.content, dbComponents);
  }

  // Turn the page content into HTML
  const html = await renderPageHTML(page);

  res.status(200).send(html);
}

export { get, getHTML };
