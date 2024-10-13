import { Request, Response } from "express";
import Site from "../../models/site";
import { htmlTemplate, buildMeta } from "../../libs/html";

async function get(req: Request, res: Response) {
  const data = (await Site.find())[0];

  res.status(200).json({ message: "Success", data });
}

async function getHTML(req: Request, res: Response) {
  const { id } = req.params;

  const data = await Site.findOne({ id });
  
  const meta = buildMeta(data);
  const html = htmlTemplate(data.name, "This is a body", meta);

  res.status(200).send(html);
}

export { get, getHTML };
