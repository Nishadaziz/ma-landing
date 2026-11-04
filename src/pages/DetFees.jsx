import SEO from "../components/seo/SEO";
import { feeArticle } from "../content/det-fees.mjs";
import "./DetFees.css";

export default function DetFees() {
  return <>
    <SEO title={feeArticle.title} description={feeArticle.description} canonicalPath={feeArticle.path} />
    <div className="det-fees" dangerouslySetInnerHTML={{ __html: feeArticle.html }} />
    <script type="application/ld+json">{JSON.stringify(feeArticle.schema)}</script>
  </>;
}
