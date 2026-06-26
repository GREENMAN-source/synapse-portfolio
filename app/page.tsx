import React from 'react';
import { Metadata } from 'next';
import SynapseHome from './components/SynapseHome';

export const metadata: Metadata = {
  title: 'Synapse Lab — Robotics, AI & IoT Innovation | Chennai, India',
  description: 'Synapse Lab is a world-class R&D and innovation studio focused on Robotics, AI automation, IoT, and hardware hacking. Founded by Dhanvanth L.P.',
  keywords: [
    'Synapse Lab',
    'Dhanvanth L P',
    'Robotics Studio',
    'AI Automation',
    'IoT Systems',
    'Hardware Hacking',
    'Security VAPT Audits',
    'Full-Stack Developer',
    'Security Researcher',
    'Bug Bounty',
    'React',
    'Next.js',
    'Cybersecurity',
    'Founder'
  ],
  authors: [{ name: 'Dhanvanth L P' }],
  creator: 'Dhanvanth L P',
  publisher: 'Synapse Lab',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Synapse Lab — Robotics, AI & IoT Innovation',
    description: 'World-class R&D studio for Robotics, AI, IoT, and hardware engineering. Founded by Dhanvanth L.P.',
    url: 'https://synapselab.in',
    siteName: 'Synapse Lab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synapse Lab — Robotics, AI & IoT Innovation',
    description: 'World-class R&D studio for Robotics, AI, IoT, and hardware engineering.',
    creator: '@5kDhanvant8844',
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#030408]">
      <SynapseHome isLoaded={true} />
    </main>
  );
}
