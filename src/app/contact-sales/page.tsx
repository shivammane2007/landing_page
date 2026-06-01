import { Metadata } from 'next';
import ContactSalesClient from './ContactSalesClient';

export const metadata: Metadata = {
  title: 'Contact Sales | AI Landing Page',
  description: 'Book a consultation with our prosthetics specialists and discover the right solution for your needs.',
  openGraph: {
    title: 'Contact Sales | AI Landing Page',
    description: 'Book a consultation with our prosthetics specialists and discover the right solution for your needs.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Sales | AI Landing Page',
    description: 'Book a consultation with our prosthetics specialists and discover the right solution for your needs.',
  },
};

export default function Page() {
  return <ContactSalesClient />;
}
