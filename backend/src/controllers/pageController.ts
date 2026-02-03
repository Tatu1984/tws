import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

// Get all pages
export const getPages = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { status, showInNavigation } = req.query;

    const where: any = {};
    if (status) where.status = status as string;
    if (showInNavigation !== undefined)
      where.showInNavigation = showInNavigation === 'true';

    const pages = await prisma.page.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        metaTitle: true,
        metaDescription: true,
        status: true,
        template: true,
        order: true,
        showInNavigation: true,
        navigationLabel: true,
        isHomePage: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        createdBy: { select: { name: true, email: true } },
        updatedBy: { select: { name: true, email: true } },
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    res.json({ pages });
  } catch (error) {
    console.error('Get pages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single page by ID or slug
export const getPage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    // Try to find by ID first, then by slug
    let page = await prisma.page.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            section: {
              include: {
                createdBy: { select: { name: true, email: true } },
                updatedBy: { select: { name: true, email: true } },
              },
            },
          },
          orderBy: { order: 'asc' },
        },
        header: true,
        footer: true,
        createdBy: { select: { name: true, email: true } },
        updatedBy: { select: { name: true, email: true } },
      },
    });

    if (!page) {
      page = await prisma.page.findUnique({
        where: { slug: id },
        include: {
          sections: {
            include: {
              section: {
                include: {
                  createdBy: { select: { name: true, email: true } },
                  updatedBy: { select: { name: true, email: true } },
                },
              },
            },
            orderBy: { order: 'asc' },
          },
          header: true,
          footer: true,
          createdBy: { select: { name: true, email: true } },
          updatedBy: { select: { name: true, email: true } },
        },
      });
    }

    if (!page) {
      res.status(404).json({ message: 'Page not found' });
      return;
    }

    res.json({ page });
  } catch (error) {
    console.error('Get page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new page
export const createPage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      slug,
      description,
      metaTitle,
      metaDescription,
      metaKeywords,
      status,
      template,
      showInNavigation,
      navigationLabel,
      isHomePage,
      headerId,
      footerId,
    } = req.body;

    // Check if slug already exists
    const existingPage = await prisma.page.findUnique({ where: { slug } });
    if (existingPage) {
      res.status(400).json({ message: 'A page with this slug already exists' });
      return;
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        description,
        metaTitle,
        metaDescription,
        metaKeywords,
        status: status || 'draft',
        template: template || 'default',
        showInNavigation: showInNavigation !== false,
        navigationLabel,
        isHomePage: isHomePage || false,
        headerId,
        footerId,
        createdById: req.user!.id,
        updatedById: req.user!.id,
      },
    });

    res.status(201).json({
      message: 'Page created successfully',
      page,
    });
  } catch (error) {
    console.error('Create page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update page
export const updatePage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const updates = req.body;

    // Check slug uniqueness if being updated
    if (updates.slug) {
      const existingPage = await prisma.page.findFirst({
        where: {
          slug: updates.slug,
          NOT: { id },
        },
      });
      if (existingPage) {
        res.status(400).json({ message: 'A page with this slug already exists' });
        return;
      }
    }

    const page = await prisma.page.update({
      where: { id },
      data: {
        ...updates,
        updatedById: req.user!.id,
        ...(updates.status === 'published' && { publishedAt: new Date() }),
      },
      include: {
        sections: { include: { section: true }, orderBy: { order: 'asc' } },
        header: true,
        footer: true,
      },
    });

    res.json({
      message: 'Page updated successfully',
      page,
    });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete page
export const deletePage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const page = await prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      res.status(404).json({ message: 'Page not found' });
      return;
    }

    // Delete page (cascade will handle PageSection)
    await prisma.page.delete({ where: { id } });

    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add section to page
export const addSectionToPage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { sectionId, position } = req.body;

    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) {
      res.status(404).json({ message: 'Page not found' });
      return;
    }

    const section = await prisma.section.findUnique({ where: { id: sectionId } });
    if (!section) {
      res.status(404).json({ message: 'Section not found' });
      return;
    }

    // Get current max order
    const maxOrder = await prisma.pageSection.aggregate({
      where: { pageId: id },
      _max: { order: true },
    });

    const order = position !== undefined ? position : ((maxOrder._max?.order ?? -1) + 1);

    await prisma.pageSection.create({
      data: {
        pageId: id,
        sectionId,
        order,
      },
    });

    const updatedPage = await prisma.page.findUnique({
      where: { id },
      include: { sections: { include: { section: true }, orderBy: { order: 'asc' } } },
    });

    res.json({
      message: 'Section added to page',
      page: updatedPage,
    });
  } catch (error) {
    console.error('Add section to page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove section from page
export const removeSectionFromPage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const sectionId = req.params.sectionId as string;

    await prisma.pageSection.deleteMany({
      where: {
        pageId: id,
        sectionId,
      },
    });

    // Delete section if not global
    const section = await prisma.section.findUnique({ where: { id: sectionId } });
    if (section && !section.isGlobal) {
      await prisma.section.delete({ where: { id: sectionId } });
    }

    const updatedPage = await prisma.page.findUnique({
      where: { id },
      include: { sections: { include: { section: true }, orderBy: { order: 'asc' } } },
    });

    res.json({
      message: 'Section removed from page',
      page: updatedPage,
    });
  } catch (error) {
    console.error('Remove section from page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reorder sections
export const reorderSections = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { sectionIds } = req.body;

    const page = await prisma.page.findUnique({ where: { id } });
    if (!page) {
      res.status(404).json({ message: 'Page not found' });
      return;
    }

    // Update order for each section
    await Promise.all(
      sectionIds.map((sectionId: string, index: number) =>
        prisma.pageSection.updateMany({
          where: { pageId: id, sectionId },
          data: { order: index },
        })
      )
    );

    const updatedPage = await prisma.page.findUnique({
      where: { id },
      include: { sections: { include: { section: true }, orderBy: { order: 'asc' } } },
    });

    res.json({
      message: 'Sections reordered',
      page: updatedPage,
    });
  } catch (error) {
    console.error('Reorder sections error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Duplicate page
export const duplicatePage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const originalPage = await prisma.page.findUnique({
      where: { id },
      include: { sections: { include: { section: true } } },
    });

    if (!originalPage) {
      res.status(404).json({ message: 'Page not found' });
      return;
    }

    // Generate unique slug
    let newSlug = `${originalPage.slug}-copy`;
    let counter = 1;
    while (await prisma.page.findUnique({ where: { slug: newSlug } })) {
      newSlug = `${originalPage.slug}-copy-${counter}`;
      counter++;
    }

    // Create duplicate page
    const newPage = await prisma.page.create({
      data: {
        title: `${originalPage.title} (Copy)`,
        slug: newSlug,
        description: originalPage.description,
        metaTitle: originalPage.metaTitle,
        metaDescription: originalPage.metaDescription,
        metaKeywords: originalPage.metaKeywords,
        status: 'draft',
        template: originalPage.template,
        showInNavigation: originalPage.showInNavigation,
        navigationLabel: originalPage.navigationLabel,
        isHomePage: false,
        headerId: originalPage.headerId,
        footerId: originalPage.footerId,
        createdById: req.user!.id,
        updatedById: req.user!.id,
      },
    });

    // Duplicate sections
    for (const pageSection of originalPage.sections) {
      const newSection = await prisma.section.create({
        data: {
          name: pageSection.section.name,
          type: pageSection.section.type,
          blocks: pageSection.section.blocks,
          style: pageSection.section.style,
          settings: pageSection.section.settings,
          isGlobal: false,
          createdById: req.user!.id,
          updatedById: req.user!.id,
        },
      });

      await prisma.pageSection.create({
        data: {
          pageId: newPage.id,
          sectionId: newSection.id,
          order: pageSection.order,
        },
      });
    }

    res.status(201).json({
      message: 'Page duplicated successfully',
      page: newPage,
    });
  } catch (error) {
    console.error('Duplicate page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
