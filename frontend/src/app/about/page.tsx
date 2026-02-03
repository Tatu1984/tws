import { notFound } from 'next/navigation';
import { publicApi } from '@/lib/api/public';
import { SectionRenderer } from '@/components/blocks/BlockRenderer';
import { Header, Footer } from '@/components/layout';
import type { Metadata } from 'next';

// Fallback imports for when CMS is unavailable
import { AboutHero } from './AboutHero';
import { AboutSection } from './AboutSection';
import { VisionMissionSection } from './VisionMissionSection';
import { ValuesSection, CTASection } from '@/components/sections';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await publicApi.getPageBySlug('about');

    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.description,
      keywords: page.metaKeywords?.join(', '),
    };
  } catch {
    return {
      title: 'About Us | Ten Sparrows',
      description: 'Learn about Ten Sparrows - we build micro data centers for the real world, designed for organizations where performance, reliability, and control matter.',
    };
  }
}

export default async function AboutPage() {
  try {
    const page = await publicApi.getPageBySlug('about');

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
    console.error('Failed to fetch about page from CMS:', error);

    // Fallback to hardcoded content
    return (
      <>
        <Header />
        <main>
          <AboutHero />
          <AboutSection />
          <VisionMissionSection />
          <ValuesSection />
          <CTASection
            title="Ready to build something real?"
            description="Let's discuss how we can help you deploy computing power where it matters most."
          />
        </main>
        <Footer />
      </>
    );
  }
}
