/**
 * Returns a HTML template with the given title, body and meta tags.
 * @param title
 * @param body
 * @param meta
 * @returns
 */
const htmlTemplate = (body: string, meta: { [key: string]: string }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.name ?? meta.title}</title>

  <!-- Tailwind CSS (Development) -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Meta -->
  <meta name="title" content="${meta.name ?? meta.title}">

  ${meta && meta.description ? `<meta name="description" content="${meta.description}">` : ""}

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
