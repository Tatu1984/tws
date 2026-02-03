'use client';

import { useEffect, useState } from 'react';
import { publicApi } from '@/lib/api/public';
import { SectionRenderer } from '@/components/blocks/BlockRenderer';
import { Header, Footer } from '@/components/layout';
import type { PageWithPopulatedSections } from '@/lib/types';

interface CMSPageProps {
  slug: string;
  fallback?: React.ReactNode;
}

export function CMSPage({ slug, fallback }: CMSPageProps) {
  const [page, setPage] = useState<PageWithPopulatedSections | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPage() {
      try {
        setLoading(true);
        const pageData = await publicApi.getPageBySlug(slug);
        setPage(pageData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-zinc-400">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !page) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-900">Page not found</h1>
            <p className="text-zinc-600 mt-2">The requested page could not be loaded.</p>
          </div>
        </main>
        <Footer />
      </>
    );
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
}

// Server component version for better SEO
export async function CMSPageServer({ slug }: { slug: string }) {
  try {
    const page = await publicApi.getPageBySlug(slug);

    if (!page || page.status !== 'published') {
      return null;
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
    console.error('Failed to fetch page:', error);
    return null;
  }
}
