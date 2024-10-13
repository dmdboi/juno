import { Request, Response } from "express";
import { ulid } from "ulid";

import Template from "../../models/Template";
import { getComponentsInTemplate } from "../../libs/template";
import TemplateComponent from "../../models/TemplateComponent";

async function store(req: Request, res: Response) {
  // Check that type is set to "page"
  if (req.body.type !== "template") {
    res.status(400).json({
      message: "Error",
      data: "Type must be set to 'template'",
    });
  }

  // Save template to MongoDB
  const template = await Template.create({
    id: ulid(),
    ...req.body,
  });

  // Scan through components and save them to MongoDB
  const templateComponents = await getComponentsInTemplate(req.body.content);

  if (templateComponents.components) {
    await Promise.all(
      templateComponents.components.map(async (component: any) => {
        await TemplateComponent.create({
          id: ulid(),
          template_id: template.id,
          component_id: component.id,
        });
      })
    );
  }

  res.status(200).json({
    message: "Success",
    data: template,
  });
}

export default store;
