export const dynamic = 'force-static';

export default function robots() {
  const baseUrl = 'https://dhanvanth.pages.dev';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
