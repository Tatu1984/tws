import { notFound } from 'next/navigation';
import { publicApi } from '@/lib/api/public';
import { SectionRenderer } from '@/components/blocks/BlockRenderer';
import { Header, Footer } from '@/components/layout';
import type { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await publicApi.getPageBySlug('home');

    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.description,
      keywords: page.metaKeywords?.join(', '),
    };
  } catch {
    return {
      title: 'Ten Sparrows | Modern Computing for Real-World Operations',
      description: 'Ten Sparrows helps organizations running critical, real-world systems use modern technology without putting everything at risk.',
    };
  }
}

export default async function HomePage() {
  try {
    const page = await publicApi.getPageBySlug('home');

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

          {/* Custom CSS */}
          {page.customCSS && <style>{page.customCSS}</style>}

          {/* Custom JS */}
          {page.customJS && (
            <script dangerouslySetInnerHTML={{ __html: page.customJS }} />
          )}
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    // Fallback to static content if CMS fails
    console.error('Failed to fetch home page from CMS:', error);

    // Import hardcoded components as fallback
    const { Hero, HighlightsSection, CloudSection, ProblemSection, SolutionSection, ServicesSection, TargetAudienceSection, CTASection } = await import('@/components/sections');

    return (
      <>
        <Header />
        <main>
          <Hero />
          <HighlightsSection />
          <CloudSection />
          <ProblemSection />
          <SolutionSection />
          <ServicesSection />
          <TargetAudienceSection />
          <CTASection />
        </main>
        <Footer />
      </>
    );
  }
}
