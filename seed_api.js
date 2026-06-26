const updates = [
  {
    year: '2026',
    title: 'Elevance Skills Internship',
    description: 'Completed Elevance Skills internship, applying deep tech knowledge to real-world infrastructure.',
    color: '#10B981'
  }
];

const shorts = [];

async function seed() {
  console.log("Seeding Updates...");
  for (const update of updates) {
    const res = await fetch('https://synapselab.in/api/admin/updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    });
    console.log(await res.json());
  }

  console.log("Seeding Shorts...");
  for (const short of shorts) {
    const res = await fetch('https://synapselab.in/api/admin/shorts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(short)
    });
    console.log(await res.json());
  }
}

seed();
