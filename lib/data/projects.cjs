'use strict';

const PROJECTS = [
  { id: 'ardcrm', cat: 'CRM & Sales', name: 'ARD CRM', url: 'https://ardcrm.vercel.app', stack: ['Next.js', 'PostgreSQL', 'Prisma'], status: 'live' },
  { id: 'contractorcrm', cat: 'CRM & Sales', name: 'Contractor CRM', url: 'https://contractorcrm.vercel.app', stack: ['React', 'SQLite', 'Express'], status: 'live' },
  { id: 'geartrybe-crm', cat: 'CRM & Sales', name: 'Gear Trybe CRM', url: 'https://geartrybe-crm.netlify.app', stack: ['React', 'Node.js'], status: 'live' },
  { id: 'ard-sales', cat: 'CRM & Sales', name: 'ARD Sales Intelligence', url: 'https://ard-master-sales.vercel.app', stack: ['Next.js', 'NestJS'], status: 'live' },
  { id: 'pso-os', cat: 'Admin & Ops', name: 'PSO OS - Executive Command', url: 'https://pso-os.vercel.app', stack: ['Next.js 14', 'Prisma', 'NextAuth'], status: 'live' },
  { id: 'ard-command', cat: 'Admin & Ops', name: 'ARD Executive Command Center', url: 'https://ard-command-center.vercel.app', stack: ['Next.js', 'PostgreSQL'], status: 'live' },
  { id: 'ruda-eos', cat: 'Admin & Ops', name: 'RUDA Execution OS', url: 'https://ruda-eos.vercel.app', stack: ['React', 'Express'], status: 'live' },
  { id: 'boardsync', cat: 'Admin & Ops', name: 'BoardSync', url: 'https://boardsyncs.vercel.app', stack: ['Vanilla JS', 'Node.js'], status: 'live' },
  { id: 'ard-ams', cat: 'Admin & Ops', name: 'ARD Asset Management System', url: 'https://ard-ams.vercel.app', stack: ['React', 'PostgreSQL'], status: 'live' },
  { id: 'gcaseflow', cat: 'Admin & Ops', name: 'Grand Case Flow', url: 'https://grandcaseflow.vercel.app', stack: ['Next.js', 'Neon'], status: 'live' },
  { id: 'activityhub', cat: 'Admin & Ops', name: 'ActivityHub Pro', url: 'https://activityhub.vercel.app/', stack: ['React', 'Node.js'], status: 'live' },
  { id: 'advance-pm', cat: 'AI Platform', name: 'Advance AI Project Management', url: 'https://advance-pm.vercel.app', stack: ['React', 'AI'], status: 'live' },
  { id: 'ard-admin', cat: 'Real Estate', name: 'ARD City Admin Dashboard', url: 'https://ardcityadmindashboard.vercel.app', stack: ['React', 'Vite'], status: 'live' },
  { id: 'grand-admin', cat: 'Real Estate', name: 'Grand City Admin Dashboard', url: 'https://grandcityadmindashboard.vercel.app', stack: ['React', 'Vite'], status: 'live' },
  { id: 'ard-utility', cat: 'Real Estate', name: 'ARD Utility Bills', url: 'https://ardutilitybills.vercel.app', stack: ['React', 'Chart.js'], status: 'live' },
  { id: 'gck-dashboard', cat: 'Real Estate', name: 'GCK Dashboard', url: 'https://gck-dashboard-nine.vercel.app', stack: ['Next.js'], status: 'live' },
  { id: 'syntiant', cat: 'PropTech', name: 'Syntiant Atlas', url: 'https://syntiantatlas-web.vercel.app', stack: ['Next.js', 'Blockchain'], status: 'live' },
  { id: 'myhealth-platform', cat: 'Healthcare', name: 'My Health Aiyin Platform', url: 'https://myhealthaiyin.framer.ai', stack: ['Framer', 'AI'], status: 'live' },
  { id: 'canis-site', cat: 'Defence', name: 'Canis Technology Solutions', url: 'https://canistechsol.vercel.app', stack: ['Next.js', 'React'], status: 'live' },
  { id: 'ads', cat: 'Defence', name: 'Anti-Drone System Configurator', url: 'https://alibinnadeem-ai.github.io/ADS-Buyer_portal/', stack: ['Three.js', 'Vanilla JS'], status: 'live' },
  { id: 'tactical-deck', cat: 'Defence', name: 'Tactical Excellence Deck', url: 'https://tactical-excellence-in-m-z1g0vwm.gamma.site', stack: ['Gamma'], status: 'live', note: 'Canis investor deck - $73B->$163B, 14.3% CAGR' },
  { id: 'mattress-site', cat: 'Retail', name: 'Bin Nadeem Mattress House', url: 'https://binnadeemmattresses.vercel.app', stack: ['Next.js', 'React'], status: 'live' },
  { id: 'national-tv', cat: 'Media', name: 'National TV Interview', url: 'https://www.youtube.com/watch?v=FCCeDuNruUE', stack: ['YouTube'], status: 'live', note: 'Entrepreneurship, AI, and tech leadership on national TV' },
];

module.exports = {
  PROJECTS,
};
