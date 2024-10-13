import { Request, Response } from "express";
import { ulid } from "ulid";

import Component from "../../models/Component";
import { HTMLToJSON } from "html-to-json-parser";

async function store(req: Request, res: Response) {
  // Modify first element of content array
  const ref = req.body.name.toLowerCase().replace(/ /g, "-");

  if (typeof req.body.content[0] === "string") {
    req.body.content = [await HTMLToJSON(req.body.content)];
  }

  let element = req.body.content[0];

  element["is_component"] = true;
  element["ref"] = ref;

  // Build component content
  const component = {
    id: ulid(),
    ref: ref,
    name: req.body.name,
    content: [element],
  };

  // Save the component to the database
  await Component.create(component);

  res.status(200).json({
    message: "Success",
    data: component,
  });
}

async function update(req: Request, res: Response) {
  const { id, name, content } = req.body;

  const ref = req.body.name.toLowerCase().replace(/ /g, "-");

  // Modify first element of content array
  let element = content[0];

  element["is_component"] = true;
  element["ref"] = ref;

  await Component.updateOne(
    { id: req.params.id },
    {
      $set: {
        name,
        ref,
        content: [element],
      },
    }
  );

  res.status(200).json({
    message: "Success",
    data: {
      id,
      ref,
      name,
      content: [element],
    },
  });
}

export { store, update };
