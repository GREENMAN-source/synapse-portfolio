import './globals.css';
import LenisProvider from './components/LenisProvider';
import CustomCursor from './components/CustomCursor';

export const metadata = {
  title: 'Dhanvanth L P | Founder of Synapse Lab | Security Researcher',
  description: 'Dhanvanth L P is a recognized Tech Prodigy, 10th-grade founder of Synapse Lab, engineering high-performance web apps, offensive security, and bug bounty hunting.',
  keywords: ['Dhanvanth L P', 'Synapse Lab', 'Full-Stack Developer', 'Security Researcher', 'Bug Bounty', 'React', 'Next.js', 'Cybersecurity', 'Founder', 'SYNAPSE_LAB_IN', 'YouTube Content Creator', 'Tech Prodigy'],
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
    description: 'Dhanvanth L P is a recognized Tech Prodigy, 10th-grade founder engineering high-performance web apps and offensive security.',
    url: 'https://synapselab.in',
    siteName: 'Synapse Lab',
    images: [
      {
        url: 'https://synapselab.in/assets/media__1778900000709.jpg',
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
    images: ['https://synapselab.in/assets/media__1778900000709.jpg'],
  },
};

export default function RootLayout({ children }) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://synapselab.in/#person",
        "name": "Dhanvanth L P",
        "givenName": "Dhanvanth",
        "familyName": "L P",
        "jobTitle": "Security Researcher & Full-Stack Developer",
        "description": "Acclaimed Tech Prodigy and 10th-grade founder of Synapse Lab, specializing in high-performance web applications, offensive security, and bug bounty hunting. Recognized for extraordinary achievements at a young age.",
        "image": "https://synapselab.in/assets/media__1778900000709.jpg",
        "url": "https://synapselab.in",
        "nationality": {
          "@type": "Country",
          "name": "India"
        },
        "gender": "Male",
        "sameAs": [
          "https://github.com/GREENMAN-source",
          "https://x.com/5kDhanvant8844",
          "https://www.instagram.com/dhanvanth_l.p",
          "https://www.youtube.com/@SYNAPSE_LAB_IN",
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
          "@id": "https://synapselab.in/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://synapselab.in/#organization",
        "name": "Synapse Lab",
        "url": "https://synapselab.in",
        "logo": "https://synapselab.in/assets/media__1778900000709.jpg",
        "founder": {
          "@id": "https://synapselab.in/#person"
        },
        "sameAs": [
          "https://www.youtube.com/@SYNAPSE_LAB_IN",
          "https://www.instagram.com/dhanvanth_l.p"
        ],
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
        "@id": "https://synapselab.in/#hardware",
        "name": "Hardware Projects & Store",
        "itemListElement": [
          {
            "@type": "Product",
            "name": "LifeFlow IV Monitor",
            "image": "https://synapslab.in/assets/lifeflow_monitor.png",
            "description": "Fully assembled IoT medical monitoring system. Alerts nurses before IV bags empty.",
            "brand": {
              "@type": "Brand",
              "name": "Synapse Lab"
            },
            "sku": "SL-LIFELOW-01",
            "offers": {
              "@type": "Offer",
              "price": "1500",
              "priceCurrency": "INR",
              "priceValidUntil": "2027-12-31",
              "availability": "https://schema.org/InStock",
              "url": "https://synapslab.in/#store",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "INR"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "IN"
                }
              },
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "IN",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "feesType": "https://schema.org/FreeReturn"
              }
            }
          },
          {
            "@type": "Product",
            "name": "Smart Home Hub",
            "image": "https://synapslab.in/assets/smarthome_hub.png",
            "description": "Facial recognition door lock system. Built, configured, and shipped to you.",
            "brand": {
              "@type": "Brand",
              "name": "Synapse Lab"
            },
            "sku": "SL-SMARTHUB-01",
            "offers": {
              "@type": "Offer",
              "price": "3500",
              "priceCurrency": "INR",
              "priceValidUntil": "2027-12-31",
              "availability": "https://schema.org/InStock",
              "url": "https://synapslab.in/#store",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "INR"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "IN"
                }
              },
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "IN",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "feesType": "https://schema.org/FreeReturn"
              }
            }
          },
          {
            "@type": "Product",
            "name": "Automated Plant Care",
            "image": "https://synapslab.in/assets/automated_plant_care.png",
            "description": "Automated irrigation system with moisture sensing and LCD display.",
            "brand": {
              "@type": "Brand",
              "name": "Synapse Lab"
            },
            "sku": "SL-PLANTCARE-01",
            "offers": {
              "@type": "Offer",
              "price": "800",
              "priceCurrency": "INR",
              "priceValidUntil": "2027-12-31",
              "availability": "https://schema.org/InStock",
              "url": "https://synapslab.in/#store",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "INR"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "IN"
                }
              },
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "IN",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "feesType": "https://schema.org/FreeReturn"
              }
            }
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://synapselab.in/#website",
        "url": "https://synapselab.in",
        "name": "Synapse Lab | Dhanvanth L P",
        "publisher": {
          "@id": "https://synapselab.in/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://synapselab.in/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://synapselab.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Samples",
            "item": "https://synapselab.in/#samples"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Store",
            "item": "https://synapselab.in/#store"
          }
        ]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/makemytrip-frontend",
        "name": "MakeMyTrip Frontend",
        "description": "Frontend for the travel booking platform clone built using Next.js, TypeScript, and Tailwind CSS.",
        "author": {
          "@id": "https://synapselab.in/#person"
        },
        "programmingLanguage": ["Next.js", "TypeScript", "Tailwind CSS"]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/makemytrip-backend",
        "name": "MakeMyTrip Backend",
        "description": "Spring Boot API service powering flights, hotels, and seat reservations for the MakeMyTrip clone.",
        "author": {
          "@id": "https://synapselab.in/#person"
        },
        "programmingLanguage": ["Spring Boot", "Java", "PostgreSQL", "Redis"]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/tyrepro",
        "name": "TyrePro ERP Suite Source",
        "description": "Source repository of the enterprise Tyre shop ERP suite.",
        "author": {
          "@id": "https://synapselab.in/#person"
        },
        "programmingLanguage": ["Next.js", "Express", "Prisma", "PostgreSQL", "TypeScript"]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/makemytour-fullstack",
        "name": "MakeMyTour Fullstack",
        "description": "Full-stack travel booking application featuring packages, itineraries, and payment integration.",
        "author": {
          "@id": "https://synapselab.in/#person"
        },
        "programmingLanguage": ["TypeScript", "Next.js", "Node.js", "PostgreSQL"]
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/GREENMAN-source/-live-flow-hospital-iv-master-hub-indian-model",
        "name": "LifeFlow IV Monitor",
        "description": "IoT healthcare monitoring system using ESP32 and load cells to track IV fluid levels in real-time.",
        "author": {
          "@id": "https://synapselab.in/#person"
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
          "@id": "https://synapselab.in/#person"
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
          "@id": "https://synapselab.in/#person"
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
          "@id": "https://synapselab.in/#person"
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
          "@id": "https://synapselab.in/#person"
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
      <body>
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </svg>
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
