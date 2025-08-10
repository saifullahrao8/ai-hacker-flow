import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type SEOProps = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  structuredData?: Record<string, any>;
};

export default function SEO({ title, description, canonicalPath, structuredData }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // Title (optional: Header may already manage it)
    if (title) document.title = title;

    // Meta description
    if (description) {
      let desc = document.querySelector('meta[name="description"]');
      if (!desc) {
        desc = document.createElement("meta");
        desc.setAttribute("name", "description");
        document.head.appendChild(desc);
      }
      desc.setAttribute("content", description);
    }

    // Canonical tag
    const canonicalUrl = canonicalPath
      ? new URL(canonicalPath, window.location.origin).toString()
      : `${window.location.origin}${location.pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    // Structured data (JSON-LD)
    const id = "structured-data";
    let scriptEl = document.getElementById(id) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = id;
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(structuredData);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonicalPath, structuredData, location.pathname]);

  return null;
}
