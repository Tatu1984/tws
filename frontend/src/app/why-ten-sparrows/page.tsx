import { notFound } from 'next/navigation';
import { publicApi } from '@/lib/api/public';
import { SectionRenderer } from '@/components/blocks/BlockRenderer';
import { Header, Footer } from '@/components/layout';
import type { Metadata } from 'next';

// Fallback imports for when CMS is unavailable
import { WhyHero } from './WhyHero';
import { DifferentiatorsSection } from './DifferentiatorsSection';
import { ApproachSection } from './ApproachSection';
import { ValuesSection, CTASection } from '@/components/sections';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await publicApi.getPageBySlug('why-ten-sparrows');

    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.description,
      keywords: page.metaKeywords?.join(', '),
    };
  } catch {
    return {
      title: 'Why Ten Sparrows | Ten Sparrows',
      description: 'Discover why organizations choose Ten Sparrows for their edge computing and intelligent systems needs. Practical solutions, real accountability.',
    };
  }
}

export default async function WhyTenSparrowsPage() {
  try {
    const page = await publicApi.getPageBySlug('why-ten-sparrows');

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
    console.error('Failed to fetch why-ten-sparrows page from CMS:', error);

    // Fallback to hardcoded content
    return (
      <>
        <Header />
        <main>
          <WhyHero />
          <DifferentiatorsSection />
          <ApproachSection />
          <ValuesSection />
          <CTASection
            title="Experience the difference"
            description="See why organizations trust Ten Sparrows for their most critical computing needs."
          />
        </main>
        <Footer />
      </>
    );
  }
}
