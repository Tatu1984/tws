import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ContactHero } from './ContactHero';
import { ContactFormSection } from './ContactFormSection';

export const metadata: Metadata = {
  title: 'Contact Us | Ten Sparrows',
  description:
    'Get in touch with Ten Sparrows. Schedule a free consultation or send us a message to discuss your operational computing needs.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactFormSection />
      </main>
      <Footer />
    </>
  );
}
