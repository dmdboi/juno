import { Request, Response } from "express";

import Content from "../../models/Component";
import { JSONToHTML } from "html-to-json-parser";

async function get(req: Request, res: Response) {
  const { id } = req.params;

  // Find all content in MongoDB
  const data = await Content.findOne({ id: id });

  res.status(200).json({ message: "Success", data });
}

async function getHTML(req: Request, res: Response) {
  const { id } = req.params;

  // Find all content in MongoDB
  const data = await Content.find({ id: id });
  const html = await JSONToHTML(data);

  res.status(200).send(html);
}

export { get, getHTML };
