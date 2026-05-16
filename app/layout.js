import './globals.css';

export const metadata = {
  title: 'Dhanvanth L P | Founder of Synapse Lab | Security Researcher',
  description: 'Dhanvanth L P is a 10th-grade founder engineering high-performance web apps, offensive security, and bug bounty hunting. Founder of Synapse Lab.',
  keywords: ['Dhanvanth L P', 'Synapse Lab', 'Full-Stack Developer', 'Security Researcher', 'Bug Bounty', 'React', 'Next.js', 'Cybersecurity', 'Founder'],
  authors: [{ name: 'Dhanvanth L P' }],
  creator: 'Dhanvanth L P',
  publisher: 'Synapse Lab',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Dhanvanth L P | Synapse Lab',
    description: 'Dhanvanth L P is a 10th-grade founder engineering high-performance web apps and offensive security.',
    url: 'https://dhanvanth.pages.dev',
    siteName: 'Synapse Lab',
    images: [
      {
        url: 'https://dhanvanth.pages.dev/assets/media__1778900000709.jpg',
        width: 800,
        height: 600,
        alt: 'Dhanvanth L P Profile',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhanvanth L P | Synapse Lab',
    description: '10th-grade founder engineering high-performance web apps and offensive security.',
    creator: '@5kDhanvant8844',
    images: ['https://dhanvanth.pages.dev/assets/media__1778900000709.jpg'],
  },
};

export default function RootLayout({ children }) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://dhanvanth.pages.dev/#person",
        "name": "Dhanvanth L P",
        "givenName": "Dhanvanth",
        "familyName": "L P",
        "jobTitle": "Security Researcher & Full-Stack Developer",
        "description": "10th-grade founder of Synapse Lab, specializing in high-performance web applications, offensive security, and bug bounty hunting.",
        "image": "https://dhanvanth.pages.dev/assets/media__1778900000709.jpg",
        "url": "https://dhanvanth.pages.dev",
        "nationality": {
          "@type": "Country",
          "name": "India"
        },
        "gender": "Male",
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
          "name": "Founder and Lead Developer",
          "occupationLocation": {
            "@type": "Place",
            "name": "Synapse Lab"
          }
        },
        "worksFor": {
          "@id": "https://dhanvanth.pages.dev/#organization"
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
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/MakeMyTrip-Clone",
        "name": "MakeMyTrip Clone",
        "description": "Full-stack travel booking platform with interactive seat selection, live flight status tracking, and dynamic pricing.",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
        },
        "programmingLanguage": ["Next.js", "Spring Boot", "PostgreSQL", "Redis"]
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
