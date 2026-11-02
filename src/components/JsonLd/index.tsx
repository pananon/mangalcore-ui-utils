export type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

export interface JsonLdProps {
  /** A schema.org object (or array of objects). Include "@context": "https://schema.org". */
  data: JsonLdData;
  id?: string;
}

/**
 * Renders schema.org structured data as a JSON-LD script tag so search engines
 * and AI crawlers can understand the page (rich results for products, articles, FAQs, etc.).
 * Escapes `<` so user content can't break out of the script tag.
 *
 * Works in Next.js Server Components via `@mangalcore/ui-utils/server`.
 *
 * @example
 * <JsonLd
 *   data={{
 *     '@context': 'https://schema.org',
 *     '@type': 'Organization',
 *     name: 'Acme',
 *     url: 'https://acme.com',
 *   }}
 * />
 */
export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
