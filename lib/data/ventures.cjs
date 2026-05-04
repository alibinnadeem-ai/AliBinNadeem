'use strict';

const VENTURES = [
  { id: 'aiyin', name: 'Aiyin Inc.', type: 'Enterprise Technology', role: 'Founder & CEO', url: 'https://aiyin.us', founded: 2017, status: 'active' },
  { id: 'myhealth', name: 'My Health Aiyin', type: 'Healthcare IT / RCM', role: 'Co-Founder & CEO', url: 'https://myhealthaiyin.framer.ai', founded: 2019, status: 'active' },
  { id: 'caremyhealth', name: 'Care My Health Aiyin', type: 'Healthcare BPO', role: 'Founder', url: 'https://care.myhealth.aiyin.us/', founded: 2021, status: 'active' },
  { id: 'geartrybe', name: 'Gear Trybe', type: 'US Automotive', role: 'Founder', url: 'http://geartrybe.aiyin.us/', founded: 2022, status: 'active', phone: '+1 (408) 500 1113' },
  { id: 'canis', name: 'Canis Technology Solutions', type: 'Defence Technology', role: 'Co-Founder & Product Manager', url: 'https://canistechsol.vercel.app', founded: 2009, status: 'active' },
  { id: 'tectrybe', name: 'Tectrybe Inc.', type: 'AI Software', role: 'Founder & CEO', url: 'http://tectrybe.com', founded: 2020, status: 'active' },
  { id: 'altertec', name: 'Altertec.ai', type: 'AI Platform', role: 'Co-Founder', url: 'http://altertec.ai', founded: 2023, status: 'active' },
  { id: 'cyberx', name: 'CyberX Consulting', type: 'Technology Consulting', role: 'CTO', url: 'https://cyberxconsulting.com/', founded: 2020, status: 'active' },
  { id: 'ksa', name: 'KSA International Corporation', type: 'Medical Equipment', role: 'Chief Technology Consultant', url: 'https://ksainternationalcorporation.com/', founded: 2015, status: 'active', products: 367, countries: 100 },
  { id: 'axon', name: 'Axon Global', type: 'Workforce Mobility', role: 'Co-Founder', url: 'https://axon-global-74v0q6a.gamma.site/', founded: 2023, status: 'active' },
  { id: '360lead', name: '360 Lead Solutions Pvt. Ltd.', type: 'Training & Education', role: 'Owner', url: 'http://360marketingzone.com', founded: 2021, status: 'active' },
  { id: 'sepm', name: 'School of Excellence in Product Management', type: 'Education', role: 'Founder & Director', url: 'http://sepm.alibinnadeem.com', founded: 2021, status: 'active' },
  { id: 'see', name: 'SEE - School of Excellence for Entrepreneurs', type: 'Education', role: 'Founder', url: 'https://see-entrepreneurs-2kq6dwo.gamma.site/', founded: 2022, status: 'active' },
  { id: 'cetem', name: 'CETEM', type: 'Resource Augmentation', role: 'Director', url: 'http://cetem.canisrufus.org/', founded: 2018, status: 'active' },
  { id: 'bna', name: 'Bin Nadeem Associates', type: 'Consultancy', role: 'Assistant Manager -> Consultant', url: 'https://binnadeem.com/bnaconsultants/', founded: 2014, status: 'active' },
  { id: 'syntiant', name: 'Syntiant Atlas', type: 'PropTech / Blockchain', role: 'CEO & Founder', url: 'https://syntiantatlas-web.vercel.app', founded: 2024, status: 'active', min_investment: 'PKR 50,000' },
  { id: 'mattress', name: 'Bin Nadeem Mattress House', type: 'Retail', role: 'Owner', url: 'https://binnadeemmattresses.vercel.app', founded: 2019, status: 'active' },
  { id: 'upvc', name: 'UPVC Windows Factory', type: 'Manufacturing', role: 'Owner', url: 'https://binnadeem.com/upvc/', founded: 2017, status: 'active' },
  { id: 'ledgerly', name: 'Ledgerly Tax Pros', type: 'US Finance / Tax', role: 'Founder', url: 'https://ledgerlytaxpros.com/', founded: 2023, status: 'active' },
  { id: 'smilefactory', name: 'The Smile Factory DBS', type: 'Dental Billing / RCM', role: 'Founder', url: 'http://thesmilefactorydbs.com/', founded: 2023, status: 'active' },
  { id: 'medbilling', name: 'MedBilling Unified Solutions of America', type: 'US Medical Billing', role: 'Founder', url: 'https://musamyhealth.com/', founded: 2022, status: 'active' },
];

module.exports = {
  VENTURES,
};
