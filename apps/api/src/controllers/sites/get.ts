import { Request, Response } from "express";
import Site from "../../models/Site";

async function get(req: Request, res: Response) {
  const data = (await Site.find())[0];

  res.status(200).json({ message: "Success", data });
}

export { get };
