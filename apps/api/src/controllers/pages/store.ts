import { Request, Response } from "express";
import { ulid } from "ulid";
import Page from "../../models/Page";
import { replaceComponentsInPageRequest } from "../../libs/template";

async function store(req: Request, res: Response) {
  const { name, content } = req.body;

  // Traverse the content array finding all components based on the is_component key
  const cleanedContent = replaceComponentsInPageRequest(content);

  const ref = name.toLowerCase().replace(/ /g, "-");

  // Build component content
  const page = {
    id: ulid(),
    ref: ref,
    name: name,
    content: cleanedContent,
  };

  // Save page to MongoDB
  await Page.create(page);

  res.status(200).json({
    message: "Success",
    data: page,
  });
}

async function update(req: Request, res: Response) {
  const { id } = req.params;

  const { name, content, meta } = req.body;

  // Find the page by ID
  const page = await Page.findOne({ id: id });

  if (!page) {
    res.status(404).json({
      message: "Error",
      error: "Page not found",
    });
  }

  const newref = name.toLowerCase().replace(/ /g, "-");

  // Traverse the content array finding all components based on the is_component key
  const cleanedContent = replaceComponentsInPageRequest(content);

  // Update the page in MongoDB
  await Page.updateOne(
    { id: id },
    {
      $set: {
        name,
        ref: newref,
        content: cleanedContent,
        meta,
      },
    }
  );

  res.status(200).json({
    message: "Success",
    data: {
      id: id,
      ref: page.ref,
      name: page.name,
      content: cleanedContent,
    },
  });
}

export { store, update };
