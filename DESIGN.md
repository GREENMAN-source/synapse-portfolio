# Design Blueprint & Portfolio Spec: Synapse Lab

This document serves as the master specification for **Synapse Lab** and the portfolio of **Dhanvanth L.P.** It details the design system, architecture, projects, services, and integrations of the old portfolio, structured specifically as a design reference for Stitch to build new, premium iterations.

---

## 1. Core Brand & Identity

- **Studio/Project Name:** Synapse Lab
- **Founder:** Dhanvanth L.P.
- **Location:** Chennai, Tamil Nadu, India (Established 2024)
- **Tagline/Headline:** "We Navigate The Terrain Of Code."
- **Core Mission:** A world-class R&D and innovation studio focused on Robotics, AI automation, IoT systems, and custom hardware engineering. We build physical robotics networks, telemetry monitoring sensors, and edge AI modules, then deploy them directly in real-world pipelines.
- **Ethos:** Focused vision. / Measured execution. / Real impact.

---

## 2. Technology Stack & Dependencies

### Frontend & Core
- **Framework:** Next.js (App Router) v16.2.6
- **Language:** React v19.2.4, TypeScript v6.0.3
- **Styling:** TailwindCSS v4

### Motion & Animations
- **GSAP:** v3.15.0 (using ScrollTrigger for entrance reveals and background pin shifts)
- **Framer Motion:** v12.38.0
- **Lenis:** v1.3.23 (for smooth, high-fidelity scroll mechanics)

### 3D/WebGL Elements
- **Three.js:** v0.184.0
- **React Three Fiber:** v9.6.1 & Drei v10.7.7
- **COBE / react-globe.gl / three-globe:** For rendering glowing neural/geospatial globes as backdrop systems.

### Databases & Backend
- **SQLite:** Local file-based database (`portfolio.sqlite`) with tables for services and contacts.
- **MongoDB:** Cloud/production data server used for logging transaction and checkout details.
- **Firebase:** Integrated auth (Google/GitHub providers) and Firestore database.

### Hardware, Sensors & Telemetry Protocols
- **Microcontrollers:** ESP32, Teensy 4.1, Arduino, Raspberry Pi (Edge processing)
- **Physical Components:** Load Cells, HX711 ADCs, Servo Motors, RF Modules
- **Protocols:** WebSockets (real-time telemetry), GPIO solenoid controls, Scapy packet sniffing, Wireshark APIs, Linux gateway firewalls.

---

## 3. Design System & Theme Settings

### Mood & Art Direction
- **Style:** Motion-Driven & Immersive Dark Mode.
- **Visuals:** Dark, canvas-based aesthetics, thin glowing grid backdrops, particle streams, smooth text line-reveals, and scroll-triggered container shifts.
- **Hover States:** Stable transitions (150–300ms) with no layout shifts. Interactive cards elevate slightly (`translate-y-[-4px]`) and add subtle neon box shadows.

### Typography
- **Heading Font:** Inter (Bold + Expressive typography, tight leading tracking-tighter)
- **Body Font:** Inter (Highly readable)
- **Mood:** Bold, engineering-forward, technical.

### Color Palette (Master)

| Role | Color Hex | CSS Variable | Description / Application |
| :--- | :--- | :--- | :--- |
| **Primary** | `#EC4899` | `--color-primary` | Bold pink accent / highlights |
| **Secondary** | `#F472B6` | `--color-secondary` | Soft pink secondary states |
| **Accent / CTA** | `#06B6D4` | `--color-cta` | Cyan glow / primary buttons |
| **Accent (Telemetry)**| `#10B981` | `--color-emerald` | Green / active status glow & brand details |
| **Background (Dark)** | `#030408` | `--color-background` | Default page background |
| **Background (Light)**| `#F8F9FA` | `--color-bg-light` | Contrast sections (About/Journey) |
| **Text (Light)** | `#FDF2F8` | `--color-text-light` | Bright headers, status codes |
| **Text (Dark)** | `#831843` | `--color-text-dark` | Contrasting text / master dark tones |

### Spacing & Shadows

| Token | Value | Application |
| :--- | :--- | :--- |
| `--space-xs` | `4px` / `0.25rem` | Tight margins |
| `--space-sm` | `8px` / `0.5rem` | Badge gaps, inline elements |
| `--space-md` | `16px` / `1.0rem` | Default padding |
| `--space-lg` | `24px` / `1.5rem` | Card margins |
| `--space-xl` | `32px` / `2.0rem` | Section offsets |
| `--space-2xl`| `48px` / `3.0rem` | Hero inner padding |
| `--space-3xl`| `64px` / `4.0rem` | Major sections gap |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Micro elements |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Normal cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)`| Overlay components, hover elevations |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)`| Modals, active checkout panels |

---

## 4. Site Architecture & Layouts

### Page 1: Landing Page (`/`)
1. **Hero Section:**
   - WebGL / Three.js Neural Globe rotating in the background.
   - Eyebrow label: `EST. 2024 · Chennai, India`
   - Headline: `We Navigate The Terrain Of Code.` (Reveal animation on scroll/load)
   - Subhead describing R&D studio, robotics, IoT, and offensive security.
   - Action CTAs: "Explore Projects" & "Join Community".
   - Animated scroll-down indicator.
2. **Infinite Marquee:**
   - Fast, continuous horizontal text ticker displaying core disciplines.
3. **About & Journey Section:**
   - Left side: Mission story, founded by Dhanvanth L.P.
   - Right side (Bento layout):
     - Ethos card ("Focused vision. / Measured execution. / Real impact.")
     - Fact Tags (Robotics, AI, IoT, Hacking, Portfolio)
     - Interactive Timeline:
       - **2022:** Hardware Awakening (Arduino, circuit prototyping)
       - **2023:** Software Paradigms (Python automation, algorithms)
       - **2025:** Web Architectures (Next.js portals, relational DBs)
       - **2026:** Offensive Security & Studio Founding
4. **Telemetry Stats Section:**
   - Major Projects counter: `6+`
   - Hackathon Entries counter: `3×`
   - Hardware Systems: `12+`
   - Custom Built: `100%`
5. **Projects Grid:**
   - Staggered card layouts displaying project catalog with interactive case study modals.
6. **Arsenal / Stack Section:**
   - Grid cards of physical tech stack (ESP32, Raspberry Pi, Teensy, Load Cells, Servo Motors, Cloudflare).
   - Side panel with active live metrics:
     - Active Telemetries: ESP32 Drone (Test Flight), Quant-Safe VPN Tunnel (Calibrating)
     - Research Tracks: Offensive Sec / OSCP (68%), Rust Embedded (85%)
     - Studio Archetypes: Eagle (Vision), Fox (Creativity)
7. **Community Join Area:**
   - Embedded community channels: YouTube (`@SYNAPSE_LAB_IN`), WhatsApp Community, Google Business reviews.
8. **Contact Form:**
   - Integrated with Web3Forms API. Form collects Name, Email, Subject, and Message.
9. **Footer:**
   - Logo, Copyright, and section links.

### Page 2: Secure Checkout (`/checkout`)
- **Use Case:** Triggered when users want to purchase/commission specific services (e.g. `?item=Web+Development&price=Affordable`).
- **Interactive Cursor:** Custom follower circle cursor.
- **Fields:** Full Name, Email, Phone Number, Shipping Address.
- **Payment Infrastructure:**
  - **FamApp QR Transfer:** Transacts directly to UPI `dhanvanth10@fam`. Requires inputting the FamApp Transaction ID for confirmation.
  - **Cash on Delivery (COD)**.
- **Backend Sync:** Submits order JSON payload directly to `/api/checkout` to log the transaction.

---

## 5. Comprehensive Project Catalog

### Project 1: LifeFlow IV Drip Monitor
- **Category:** IoT · Healthcare (Project #001)
- **Subtitle:** IoT Medical Fluid Tracker
- **Description:** Automated load-cell clamp setup calibrated to monitor IV fluid bags and alert nursing staff via WebSockets before depletion.
- **Problem Statement:** Hospital wards face constant nursing shortages, causing delayed responses to empty IV lines, risking patient backflow.
- **Process:** Wrote ESP32 firmware, connected load cells to HX711 ADCs, calibrated fluid weights, and set up real-time telemetry over WebSockets.
- **Tech Stack:** `ESP32`, `C++`, `Arduino`, `WebSockets`, `Node.js`, `React`
- **Outcome Metric:** Assembled a physical prototype that sounds a nurse hub alarm 5 minutes before the bag reaches 5% fluid levels.

### Project 2: TyrePro ERP Suite
- **Category:** Web · Enterprise (Project #002)
- **Subtitle:** Enterprise Retail Management Portal
- **Description:** A full-stack shop administration platform with real-time inventory levels, GST-compliant invoicing, and automated booking queues.
- **Problem Statement:** Small and medium tyre retail setups struggled with slow checkouts, stock discrepancy, and complex tax compliance structures.
- **Process:** Architected a normalized PostgreSQL schema via Prisma. Built the frontend with Next.js using dynamic layouts for billing grids, and set up a custom PDF billing microservice.
- **Tech Stack:** `Next.js`, `Express`, `Prisma`, `PostgreSQL`, `TypeScript`, `TailwindCSS`
- **Outcome Metric:** Deployed in production, shortening billing workflows from 8 minutes down to 90 seconds and reducing manual inventory entry error rates.

### Project 3: Project Titan Platform
- **Category:** AI · Ideathon (Project #003)
- **Subtitle:** High-Scalability Hackathon Concept
- **Description:** An enterprise concept application demonstrating highly distributed service layers and local agent logic built for national hackathons.
- **Problem Statement:** Hackathon designs often focus purely on slides; we needed a robust, working system design with simulated high concurrency.
- **Process:** Coded real-time mock telemetry dashboards using React and Express, demonstrating sub-second load configurations.
- **Tech Stack:** `Next.js`, `Express`, `Node.js`, `Framer Motion`, `TailwindCSS`
- **Outcome Metric:** Presented at national level ideathon, earning praise for technical depth and production-ready system architecture.

### Project 4: School Voting System
- **Category:** Web · Civic Tech (Project #004)
- **Subtitle:** Custom Digital Election System
- **Description:** A secure custom digital voting system engineered and deployed to run school elections with zero errors and real-time tallies.
- **Problem Statement:** Paper ballots are slow to tally, prone to human validation errors, and offer poor voter transparency.
- **Process:** Engineered a clean React frontend with encrypted session logs and a local SQLite server configuration. Ensured complete audit trails.
- **Tech Stack:** `React`, `Node.js`, `SQLite`, `TailwindCSS`, `TypeScript`
- **Outcome Metric:** Successfully logged 800+ student votes in under 6 hours with instant tally results and zero network failures.

### Project 5: Smart Face ID Lock
- **Category:** IoT · Hardware (Project #005)
- **Subtitle:** Edge AI Biometric Solenoid Trigger
- **Description:** A biometric facial recognition lock using OpenCV Haar Cascades on Raspberry Pi to trigger high-current physical door solenoids.
- **Problem Statement:** Physical locks and access keys are easily lost; local edge recognition is required for internet-free operations.
- **Process:** Configured local OpenCV scripts in Python, bypassed cloud APIs to avoid latency, and wired GPIO pins to a relay/solenoid circuit.
- **Tech Stack:** `Python`, `OpenCV`, `Raspberry Pi`, `GPIO`, `Linux`
- **Outcome Metric:** Engineered a secure lock assembly triggering keyless entry in 0.8 seconds, logging unrecognized visitors automatically.

### Project 6: Edge Intrusion Shield
- **Category:** Cyber · Security (Project #006)
- **Subtitle:** Localized Network Intrusion Shield
- **Description:** Network parsing scripts configured on router gateways to identify anomalies and block spoofed MAC addresses.
- **Problem Statement:** Connected IoT hardware systems are targets for network spoofing and middleman traffic analysis.
- **Process:** Developed packet sniffers analyzing MAC/IP frame structures. Built automated rulesets to terminate connections when anomaly thresholds are breached.
- **Tech Stack:** `Python`, `Wireshark APIs`, `Scapy`, `Bash Scripts`, `Linux Firewall`
- **Outcome Metric:** Created a defensive gateway shield identifying and blacklisting spoofed IP MAC frames in under 15ms.

---

## 6. Services & Offerings

These services are stored in the SQLite database and can be requested via checkout:

1. **Web Development**
   - **Description:** Building websites and web apps using HTML, CSS, JavaScript, and React. Great for small projects and startups on a budget.
   - **Pricing:** Affordable
   - **Delivery Time:** 3–7 days
2. **Security Testing**
   - **Description:** Testing websites for basic security vulnerabilities. Good for understanding how websites can be hacked and how to protect them.
   - **Pricing:** Affordable
   - **Delivery Time:** 2–4 days
3. **Project Build**
   - **Description:** End-to-end project development from concept to deployment. Startup MVPs, custom web apps.
   - **Pricing:** Custom Quote
   - **Delivery Time:** 2–4 weeks

---

## 7. SQLite Database Schema

The SQLite database (`portfolio.sqlite`) uses the following schema configurations:

```sql
-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT,
  delivery TEXT
);

-- Contacts / Feedback Table
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 8. API & External Keys

- **Contact Form Web3Forms Access Key:** `ea1e186e-b3d9-4d6d-9721-6b45d2e09ff7`
- **WhatsApp Invitation Link:** `https://chat.whatsapp.com/G5T2vWw1eH7K4J5eK5`
- **YouTube Handle:** `https://www.youtube.com/@SYNAPSE_LAB_IN`
- **Google Business link:** `https://g.co/kgs/SynapseLab`
- **UPI Billing Endpoint:** `dhanvanth10@fam` (FamApp)
