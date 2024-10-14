import { Request, Response } from "express";

import Component from "../../models/Component";

async function list(req: Request, res: Response) {
  // Find all content in MongoDB
  const data = await Component.find();

  res.status(200).json({ message: "Success", data });
}

export default list;
