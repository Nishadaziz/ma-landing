import SEO from "../components/seo/SEO";
import { feeArticle as englishArticle } from "../content/det-fees.mjs";
import "./DetFees.css";

export default function DetFees({ article: feeArticle = englishArticle }) {
  function scrollToSection(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    window.history.replaceState(window.history.state, "", link.hash);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }
  return <>
    <SEO title={feeArticle.title} description={feeArticle.description} canonicalPath={feeArticle.path} />
    <div className="det-fees" onClick={scrollToSection} dangerouslySetInnerHTML={{ __html: feeArticle.html }} />
    <script type="application/ld+json">{JSON.stringify(feeArticle.schema)}</script>
  </>;
}
