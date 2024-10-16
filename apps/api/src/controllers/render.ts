import { Request, Response } from "express";
import { JSONToHTML } from "html-to-json-parser";
import { writeFile } from "fs/promises";

import Page from "../models/Page";
import Site from "../models/Site";
import Component from "../models/Component";

import { getComponentsInTemplate, restoreComponentsInPageRequest } from "../libs/template";
import { renderPageHTML } from "../libs/renderer";
import { htmlTemplate } from "../libs/html";

export const render = async (req: Request, res: Response) => {
  const { type, id, save } = req.query;

  try {
    const site = await Site.findOne();

    if (!site) {
      res.status(404).json({
        message: "Error",
        error: "Site not found",
      });
    }

    let resource;

    switch (type) {
      case "page":
        resource = await Page.findOne({ id });
        break;
      case "component":
        resource = await Component.findOne({ id });
        break;
      default:
        throw new Error("Invalid resource type");
    }

    let html: string;
    let templatedHTML: string = "No content found";

    /** Handle page rendering as we need to resolve components */
    if (type === "page") {
      const results = await getComponentsInTemplate(resource.content);

      if (results.message === "Error") {
        res.status(404).json(results);
      }

      if (results.components!.length > 0) {
        const dbComponents = await Component.find({ ref: { $in: results.components!.map((component: any) => component.ref) } });
        resource.content = restoreComponentsInPageRequest(resource.content, dbComponents);
      }

      console.log(resource.meta, site.meta);

      // Turn the page content into HTML
      html = await renderPageHTML(resource);
      templatedHTML = htmlTemplate(html, resource.meta ?? site.meta);
    }

    if (type === "component") {
      templatedHTML = (await JSONToHTML(resource.content[0])) as string;
    }

    /** If 'save' query param is present, save to /storage folder  */
    if (save) {
      await writeFile(`../../storage/${resource.ref}.html`, templatedHTML);
    }

    res.status(200).send(templatedHTML);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error",
      // @ts-ignore
      error: error.message,
    });
  }
};
