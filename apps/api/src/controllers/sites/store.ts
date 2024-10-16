import { Request, Response } from "express";
import { ulid } from "ulid";

import Site from "../../models/Site";

async function store(req: Request, res: Response) {
  const payload = req.body;

  const data = {
    id: ulid(),
    name: payload.name,
    domain: payload.domain,
    favicon: payload.favicon,
    meta: payload.meta,
  };

  // Save the component to the database
  await Site.create(data);

  res.status(200).json({
    message: "Success",
    data,
  });
}

async function update(req: Request, res: Response) {
  const payload = req.body;

  await Site.updateOne(
    { id: req.params.id },
    {
      $set: {
        name: payload.name,
        domain: payload.domain,
        favicon: payload.favicon,
        meta: payload.meta,
      },
    }
  );

  res.status(200).json({
    message: "Success",
    data: {
      id: req.params.id,
      ...payload,
    },
  });
}

export { store, update };
