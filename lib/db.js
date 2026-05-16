import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'portfolio.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  }
});

export function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price TEXT,
        delivery TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default services if empty
    db.get("SELECT COUNT(*) as count FROM services", (err, row) => {
      if (row.count === 0) {
        const stmt = db.prepare("INSERT INTO services (title, description, price, delivery) VALUES (?, ?, ?, ?)");
        stmt.run("Web Development", "Building websites and web apps using HTML, CSS, JavaScript, and React. Great for small projects and startups on a budget.", "Affordable", "3-7 days");
        stmt.run("Security Testing", "Testing websites for basic security vulnerabilities. Good for understanding how websites can be hacked and how to protect them.", "Affordable", "2-4 days");
        stmt.run("Project Build", "End-to-end project development from concept to deployment. Startup MVPs, custom web apps.", "Custom", "2-4 weeks");
        stmt.finalize();
      }
    });
  });
}

export function getServices() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM services", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function addContact(name, email, message) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)", [name, email, message], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
}
