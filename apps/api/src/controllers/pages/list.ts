import { Request, Response } from "express";

import Page from "../../models/Page";

async function list(req: Request, res: Response) {
  // Find the content in MongoDB
  const data = await Page.find();

  res.status(200).json({ message: "Success", data });
}

export default list;
