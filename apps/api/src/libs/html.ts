/**
 * Returns a HTML template with the given title, body and meta tags.
 * @param title
 * @param body
 * @param meta
 * @returns
 */
const htmlTemplate = (title: string, body: string, meta: { [key: string]: string }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>

  <meta name="title" content="${title}">
  <meta name="description" content="${meta.description}">

  <!-- Open Graph / Twitter -->
  ${Object.keys(meta)
    .map(key => `<meta name="${key}" content="${meta[key]}">`)
    .join("\n")}
  
</head>

${body}
</html>
`;

const buildMeta = (meta: any) => {
  return {
    "og:title": meta.title,
    "og:description": meta.description,
    "og:image": meta.image,
    "og:url": meta.url,
    "og:type": meta.type,

    "twitter:title": meta.title,
    "twitter:description": meta.description,
    "twitter:image": meta.image,
    "twitter:card": "summary_large_image",
    "twitter:url": meta.url,
  };
};

export { htmlTemplate, buildMeta };
