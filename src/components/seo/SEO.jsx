import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.duomatebd.com";

function upsertMeta(name, content) {
  if (!content) return;

  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertProperty(property, content) {
  if (!content) return;

  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;

  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

export default function SEO({ title, description, canonicalPath, ogImage }) {
  const location = useLocation();

  useEffect(() => {
    if (title) document.title = title;

    if (description) upsertMeta("description", description);

    const canonical =
      SITE_URL + (canonicalPath ?? location.pathname ?? "/");
    upsertLink("canonical", canonical);

    if (title) upsertProperty("og:title", title);
    if (description) upsertProperty("og:description", description);
    upsertProperty("og:url", canonical);

    if (ogImage) upsertProperty("og:image", ogImage);
  }, [title, description, canonicalPath, ogImage, location.pathname]);

  return null;
}
