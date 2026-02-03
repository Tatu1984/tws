import { notFound } from 'next/navigation';
import { publicApi } from '@/lib/api/public';
import { SectionRenderer } from '@/components/blocks/BlockRenderer';
import { Header, Footer } from '@/components/layout';
import type { Metadata } from 'next';

// Fallback imports for when CMS is unavailable
import { WhatWeDoHero } from './WhatWeDoHero';
import { CapabilitiesSection } from './CapabilitiesSection';
import { DetailedServicesSection } from './DetailedServicesSection';
import { EngagementSection } from './EngagementSection';
import { CTASection } from '@/components/sections';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await publicApi.getPageBySlug('what-we-do');

    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.description,
      keywords: page.metaKeywords?.join(', '),
    };
  } catch {
    return {
      title: 'What We Do | Ten Sparrows',
      description: 'Discover our solutions: local computing environments, AI monitoring, smart city systems, secure data integration, and custom field applications.',
    };
  }
}

export default async function WhatWeDoPage() {
  try {
    const page = await publicApi.getPageBySlug('what-we-do');

    if (!page || page.status !== 'published') {
      notFound();
    }

    return (
      <>
        <Header />
        <main>
          {page.sections && page.sections.length > 0 ? (
            page.sections.map((section) => (
              <SectionRenderer key={section._id} section={section} />
            ))
          ) : (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-zinc-900">{page.title}</h1>
                {page.description && (
                  <p className="text-zinc-600 mt-4">{page.description}</p>
                )}
              </div>
            </div>
          )}

          {page.customCSS && <style>{page.customCSS}</style>}
          {page.customJS && (
            <script dangerouslySetInnerHTML={{ __html: page.customJS }} />
          )}
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Failed to fetch what-we-do page from CMS:', error);

    // Fallback to hardcoded content
    return (
      <>
        <Header />
        <main>
          <WhatWeDoHero />
          <CapabilitiesSection />
          <DetailedServicesSection />
          <EngagementSection />
          <CTASection
            title="Ready to discuss your needs?"
            description="Every organization is different. Let's explore what the right solution looks like for you."
          />
        </main>
        <Footer />
      </>
    );
  }
}
