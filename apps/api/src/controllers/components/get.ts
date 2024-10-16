import { Request, Response } from "express";
import { JSONToHTML } from "html-to-json-parser";

import Component from "../../models/Component";

async function get(req: Request, res: Response) {
  const { id } = req.params;

  // Find all content in MongoDB
  const data = await Component.findOne({ id: id });

  res.status(200).json({ message: "Success", data });
}

export { get };
