import { Header, Footer } from '@/components/layout';
import { WhatWeDoContent } from './WhatWeDoContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What We Do | Ten Sparrows',
  description: 'Discover our solutions: local computing environments, AI monitoring, smart city systems, secure data integration, and custom field applications.',
};

export default function WhatWeDoPage() {
  return (
    <>
      <Header />
      <main>
        <WhatWeDoContent />
      </main>
      <Footer />
    </>
  );
}
