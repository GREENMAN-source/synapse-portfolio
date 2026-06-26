export function initDb() {
  // Mock init
}

export function getServices() {
  return Promise.resolve([
    {
      id: 1,
      title: "Web Development",
      description: "Building websites and web apps using HTML, CSS, JavaScript, and React. Great for small projects and startups on a budget.",
      price: "Affordable",
      delivery: "3-7 days"
    },
    {
      id: 2,
      title: "Security Testing",
      description: "Testing websites for basic security vulnerabilities. Good for understanding how websites can be hacked and how to protect them.",
      price: "Affordable",
      delivery: "2-4 days"
    },
    {
      id: 3,
      title: "Project Build",
      description: "End-to-end project development from concept to deployment. Startup MVPs, custom web apps.",
      price: "Custom",
      delivery: "2-4 weeks"
    }
  ]);
}

export function addContact(name, email, message) {
  console.log('Contact form submitted:', { name, email, message });
  return Promise.resolve({ id: Date.now() });
}
