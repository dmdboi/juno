import { Request, Response } from "express";

import Template from "../../models/Template";

async function list(req: Request, res: Response) {
  // Find the content in MongoDB
  const data = await Template.find();

  res.status(200).json({ message: "Success", data });
}

export default list;
