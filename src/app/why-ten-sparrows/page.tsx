import { Header, Footer } from '@/components/layout';
import { WhyContent } from './WhyContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Ten Sparrows | Ten Sparrows',
  description: 'Discover why organizations choose Ten Sparrows for their edge computing and intelligent systems needs. Practical solutions, real accountability.',
};

export default function WhyTenSparrowsPage() {
  return (
    <>
      <Header />
      <WhyContent />
      <Footer />
    </>
  );
}
