import './globals.css';

export const metadata = {
  title: 'Synapse Lab | Dhanvanth L P',
  description: '10th-grade founder engineering high-performance web apps and offensive security.',
  openGraph: {
    title: 'Synapse Lab | Dhanvanth L P',
    description: '10th-grade founder engineering high-performance web apps and offensive security.',
    url: 'https://dhanvanth.pages.dev',
    siteName: 'Synapse Lab',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dhanvanth L P',
    jobTitle: 'Founder & Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Synapse Lab'
    },
    url: 'https://dhanvanth.pages.dev',
    description: '10th-grade founder engineering high-performance web apps and offensive security.',
    knowsAbout: ['Web Development', 'Bug Bounty', 'Penetration Testing'],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Synapse Lab',
    founder: {
      '@type': 'Person',
      name: 'Dhanvanth L P'
    },
    url: 'https://dhanvanth.pages.dev',
    description: 'Engineering high-performance web apps and offensive security.',
    priceRange: '$$',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Security Testing'
          }
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
