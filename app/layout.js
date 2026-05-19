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
          "Cybersecurity",
          "Artificial Intelligence"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "10th Grade"
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
              "description": "Full-stack web application development tailored to your business needs."
            },
            "price": "3000",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Security VAPT Testing",
              "description": "Deep vulnerability assessment and penetration testing for your infrastructure."
            },
            "price": "2500",
            "priceCurrency": "INR"
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://dhanvanth.pages.dev/#hardware",
        "name": "Hardware Projects & Store",
        "itemListElement": [
          {
            "@type": "Product",
            "name": "LifeFlow IV Monitor",
            "description": "Fully assembled IoT medical monitoring system. Alerts nurses before IV bags empty.",
            "offers": { "@type": "Offer", "price": "1500", "priceCurrency": "INR" }
          },
          {
            "@type": "Product",
            "name": "Smart Home Hub",
            "description": "Facial recognition door lock system. Built, configured, and shipped to you.",
            "offers": { "@type": "Offer", "price": "3500", "priceCurrency": "INR" }
          },
          {
            "@type": "Product",
            "name": "Automated Plant Care",
            "description": "Automated irrigation system with moisture sensing and LCD display.",
            "offers": { "@type": "Offer", "price": "800", "priceCurrency": "INR" }
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
        "@type": "BreadcrumbList",
        "@id": "https://dhanvanth.pages.dev/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://dhanvanth.pages.dev"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Samples",
            "item": "https://dhanvanth.pages.dev/#samples"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Store",
            "item": "https://dhanvanth.pages.dev/#store"
          }
        ]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/makemytrip-frontend",
        "name": "MakeMyTrip Frontend",
        "description": "Frontend for the travel booking platform clone built using Next.js, TypeScript, and Tailwind CSS.",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
        },
        "programmingLanguage": ["Next.js", "TypeScript", "Tailwind CSS"]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/makemytrip-backend",
        "name": "MakeMyTrip Backend",
        "description": "Spring Boot API service powering flights, hotels, and seat reservations for the MakeMyTrip clone.",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
        },
        "programmingLanguage": ["Spring Boot", "Java", "PostgreSQL", "Redis"]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/tyrepro",
        "name": "TyrePro ERP Suite Source",
        "description": "Source repository of the enterprise Tyre shop ERP suite.",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
        },
        "programmingLanguage": ["Next.js", "Express", "Prisma", "PostgreSQL", "TypeScript"]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/makemytour-fullstack",
        "name": "MakeMyTour Fullstack",
        "description": "Full-stack travel booking application featuring packages, itineraries, and payment integration.",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
        },
        "programmingLanguage": ["TypeScript", "Next.js", "Node.js", "PostgreSQL"]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/-live-flow-hospital-iv-master-hub-indian-model",
        "name": "LifeFlow IV Monitor",
        "description": "IoT healthcare monitoring system using ESP32 and load cells to track IV fluid levels in real-time.",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
        },
        "programmingLanguage": ["C++", "Arduino"]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://tyrepro-opal.vercel.app/#application",
        "name": "TyrePro ERP Live",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "url": "https://tyrepro-opal.vercel.app",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://makemytrip-frontend-ten.vercel.app/#application",
        "name": "MakeMyTrip Client Live",
        "operatingSystem": "All",
        "applicationCategory": "TravelApplication",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "url": "https://makemytrip-frontend-ten.vercel.app",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://makemytrip-backend-030l.onrender.com/#application",
        "name": "MakeMyTrip API Service",
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "url": "https://makemytrip-backend-030l.onrender.com",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://synapslab.in/#application",
        "name": "Synapse Lab Portal",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "url": "https://synapslab.in",
        "author": {
          "@id": "https://dhanvanth.pages.dev/#person"
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
