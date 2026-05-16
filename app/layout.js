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
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://dhanvanth.pages.dev/#person",
        "name": "Dhanvanth L P",
        "jobTitle": "Security Researcher & Full-Stack Developer",
        "description": "10th-grade founder of Synapse Lab, specializing in high-performance web applications, offensive security, and bug bounty hunting.",
        "url": "https://dhanvanth.pages.dev",
        "sameAs": [
          "https://github.com/GREENMAN-source",
          "https://x.com/5kDhanvant8844",
          "https://www.instagram.com/dhanvanth_l.p",
          "https://www.facebook.com/share/17MSAoYYVG/",
          "https://dev.to/dhanvanth_l_p_"
        ],
        "knowsAbout": [
          "Penetration Testing",
          "Bug Bounty Hunting",
          "React.js",
          "Next.js",
          "Hardware Engineering (Arduino/Raspberry Pi)",
          "Cybersecurity"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "10th Grade Developer"
        },
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Founder",
          "occupationLocation": {
            "@type": "Place",
            "name": "Synapse Lab"
          }
        }
      },
      {
        "@type": "Organization",
        "@id": "https://dhanvanth.pages.dev/#organization",
        "name": "Synapse Lab",
        "url": "https://dhanvanth.pages.dev",
        "logo": "https://dhanvanth.pages.dev/assets/media__1778900000709.jpg",
        "founder": {
          "@id": "https://dhanvanth.pages.dev/#person"
        },
        "foundingDate": "2026",
        "description": "A high-performance security and development studio founded by Dhanvanth L P.",
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Web Application",
              "description": "Full-stack web application development."
            },
            "price": "3000",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Security VAPT Testing",
              "description": "Deep vulnerability assessment and penetration testing."
            },
            "price": "2500",
            "priceCurrency": "INR"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://dhanvanth.pages.dev/#website",
        "url": "https://dhanvanth.pages.dev",
        "name": "Synapse Lab | Dhanvanth L P",
        "publisher": {
          "@id": "https://dhanvanth.pages.dev/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
