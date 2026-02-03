import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Helper to transform page data for frontend
function transformPage(page: any) {
  // Parse JSON fields
  const sections = page.sections?.map((ps: any) => {
    const section = ps.section;
    return {
      _id: section.id,
      name: section.name,
      type: section.type,
      blocks: JSON.parse(section.blocks || '[]'),
      style: JSON.parse(section.style || '{}'),
      settings: JSON.parse(section.settings || '{}'),
      isGlobal: section.isGlobal,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
    };
  }) || [];

  return {
    _id: page.id,
    title: page.title,
    slug: page.slug,
    description: page.description,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    metaKeywords: page.metaKeywords?.split(',').map((k: string) => k.trim()).filter(Boolean) || [],
    status: page.status,
    template: page.template,
    order: page.order,
    showInNavigation: page.showInNavigation,
    navigationLabel: page.navigationLabel,
    isHomePage: page.isHomePage,
    customCSS: page.customCSS,
    customJS: page.customJS,
    publishedAt: page.publishedAt,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
    sections,
  };
}

// Helper to transform header
function transformHeader(header: any) {
  return {
    _id: header.id,
    name: header.name,
    isDefault: header.isDefault,
    logo: JSON.parse(header.logo || '{}'),
    navigation: JSON.parse(header.navigation || '[]'),
    ctaButton: header.ctaButton ? JSON.parse(header.ctaButton) : null,
    style: JSON.parse(header.style || '{}'),
    createdAt: header.createdAt,
    updatedAt: header.updatedAt,
  };
}

// Helper to transform footer
function transformFooter(footer: any) {
  return {
    _id: footer.id,
    name: footer.name,
    isDefault: footer.isDefault,
    logo: JSON.parse(footer.logo || '{}'),
    description: footer.description,
    columns: JSON.parse(footer.columns || '[]'),
    socialLinks: JSON.parse(footer.socialLinks || '[]'),
    contactInfo: JSON.parse(footer.contactInfo || '{}'),
    bottomBar: JSON.parse(footer.bottomBar || '{}'),
    style: JSON.parse(footer.style || '{}'),
    createdAt: footer.createdAt,
    updatedAt: footer.updatedAt,
  };
}

// Get all published pages (for listing)
router.get('/pages', async (req: Request, res: Response): Promise<void> => {
  try {
    const pages = await prisma.page.findMany({
      where: { status: 'published' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        metaTitle: true,
        metaDescription: true,
        status: true,
        order: true,
        showInNavigation: true,
        navigationLabel: true,
        isHomePage: true,
        publishedAt: true,
      },
      orderBy: { order: 'asc' },
    });

    const transformedPages = pages.map((p) => ({
      _id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      status: p.status,
      order: p.order,
      showInNavigation: p.showInNavigation,
      navigationLabel: p.navigationLabel,
      isHomePage: p.isHomePage,
      publishedAt: p.publishedAt,
    }));

    res.json({ success: true, data: transformedPages });
  } catch (error) {
    console.error('Get published pages error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get published page by slug
router.get('/pages/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;

    // Handle home page
    let page;
    if (slug === 'home') {
      page = await prisma.page.findFirst({
        where: { isHomePage: true, status: 'published' },
        include: {
          sections: {
            include: { section: true },
            orderBy: { order: 'asc' },
          },
          header: true,
          footer: true,
        },
      });
    } else {
      page = await prisma.page.findFirst({
        where: { slug, status: 'published' },
        include: {
          sections: {
            include: { section: true },
            orderBy: { order: 'asc' },
          },
          header: true,
          footer: true,
        },
      });
    }

    if (!page) {
      res.status(404).json({ success: false, message: 'Page not found' });
      return;
    }

    const transformedPage = transformPage(page);

    // Get default header/footer if page doesn't have specific ones
    if (!page.header) {
      const defaultHeader = await prisma.header.findFirst({ where: { isDefault: true } });
      if (defaultHeader) {
        (transformedPage as any).header = transformHeader(defaultHeader);
      }
    } else {
      (transformedPage as any).header = transformHeader(page.header);
    }

    if (!page.footer) {
      const defaultFooter = await prisma.footer.findFirst({ where: { isDefault: true } });
      if (defaultFooter) {
        (transformedPage as any).footer = transformFooter(defaultFooter);
      }
    } else {
      (transformedPage as any).footer = transformFooter(page.footer);
    }

    res.json({ success: true, data: transformedPage });
  } catch (error) {
    console.error('Get public page error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get navigation (for building menus)
router.get('/navigation', async (req: Request, res: Response): Promise<void> => {
  try {
    const pages = await prisma.page.findMany({
      where: {
        status: 'published',
        showInNavigation: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        navigationLabel: true,
        order: true,
        isHomePage: true,
      },
      orderBy: { order: 'asc' },
    });

    const navigation = pages.map((page) => ({
      label: page.navigationLabel || page.title,
      href: page.isHomePage ? '/' : `/${page.slug}`,
      order: page.order,
    }));

    res.json({ success: true, data: navigation });
  } catch (error) {
    console.error('Get navigation error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get default header
router.get('/header', async (req: Request, res: Response): Promise<void> => {
  try {
    const header = await prisma.header.findFirst({
      where: { isDefault: true },
    });

    if (!header) {
      res.status(404).json({ success: false, message: 'No default header found' });
      return;
    }

    res.json({ success: true, data: transformHeader(header) });
  } catch (error) {
    console.error('Get public header error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get default footer
router.get('/footer', async (req: Request, res: Response): Promise<void> => {
  try {
    const footer = await prisma.footer.findFirst({
      where: { isDefault: true },
    });

    if (!footer) {
      res.status(404).json({ success: false, message: 'No default footer found' });
      return;
    }

    res.json({ success: true, data: transformFooter(footer) });
  } catch (error) {
    console.error('Get public footer error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get site settings
router.get('/site-settings', async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      // Return default settings if none exist
      res.json({
        success: true,
        data: {
          siteName: 'Ten Sparrows',
          siteDescription: 'Modern computing for real-world operations',
          seo: {
            defaultTitle: 'Modern Computing for Real-World Operations',
            titleSuffix: ' | Ten Sparrows',
            defaultDescription:
              'We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.',
          },
          contact: {
            email: 'info@tensparrows.com',
            address: 'Atlanta, GA 30318',
          },
        },
      });
      return;
    }

    res.json({
      success: true,
      data: {
        _id: settings.id,
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        logo: JSON.parse(settings.logo || '{}'),
        seo: JSON.parse(settings.seo || '{}'),
        colors: JSON.parse(settings.colors || '{}'),
        typography: JSON.parse(settings.typography || '{}'),
        social: JSON.parse(settings.social || '{}'),
        contact: JSON.parse(settings.contact || '{}'),
        analytics: JSON.parse(settings.analytics || '{}'),
        customCode: JSON.parse(settings.customCode || '{}'),
        maintenance: JSON.parse(settings.maintenance || '{}'),
        createdAt: settings.createdAt,
        updatedAt: settings.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get site settings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
