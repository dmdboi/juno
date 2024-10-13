import { Request, Response } from "express";

import { renderPageHTML } from "../../libs/renderer";
import Template from "../../models/Template";
import { getComponentsInTemplate, restoreComponentsInPageRequest } from "../../libs/template";
import Component from "../../models/Component";

async function get(req: Request, res: Response) {
  const { id } = req.params;

  // Find the content in MongoDB
  let template = await Template.findOne({ id: id });

  const results = await getComponentsInTemplate(template.content);

  if (results.message === "Error") {
    res.status(404).json(results);
  }

  if (results.components!.length > 0) {
    const dbComponents = await Component.find({ id: { $in: results.components!.map((component: any) => component.componentRef) } });
    template.content = restoreComponentsInPageRequest(template.content, dbComponents);
  }

  res.status(200).json({
    message: "Success",
    data: template,
  });
}

async function getHTML(req: Request, res: Response) {
  const { id } = req.params;

  // Find the content in MongoDB
  let template = await Template.findOne({ id: id });

  const results = await getComponentsInTemplate(template.content);

  if (results.message === "Error") {
    res.status(404).json(results);
  }

  if (results.components!.length > 0) {
    const dbComponents = await Component.find({ ref: { $in: results.components!.map((component: any) => component.ref) } });
    template.content = restoreComponentsInPageRequest(template.content, dbComponents);
  }

  // Turn the page content into HTML
  const html = await renderPageHTML(template);

  res.status(200).send(html);
}

export { get, getHTML };
