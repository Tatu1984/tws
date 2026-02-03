import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({
  url: 'file:./prisma/dev.db',
});
const prisma = new PrismaClient({ adapter });

const generateId = () => Math.random().toString(36).substring(2, 15);

// Helper to create a component block
function componentBlock(componentName: string, props: Record<string, unknown> = {}, order: number = 0) {
  return {
    id: generateId(),
    type: 'component',
    content: {
      component: componentName,
      props,
    },
    order,
  };
}

async function seed() {
  try {
    console.log('Seeding database with full website content...\n');

    // Clear existing data
    await prisma.pageSection.deleteMany();
    await prisma.page.deleteMany();
    await prisma.section.deleteMany();
    await prisma.header.deleteMany();
    await prisma.footer.deleteMany();
    await prisma.siteSettings.deleteMany();
    await prisma.user.deleteMany();

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'Admin123!',
      salt
    );

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL || 'admin@tensparrows.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
        isActive: true,
      },
    });

    console.log('✓ Created admin user:', adminUser.email);

    // Create default header
    const defaultHeader = await prisma.header.create({
      data: {
        name: 'Main Header',
        isDefault: true,
        logo: JSON.stringify({
          text: 'TenSparrows',
          href: '/',
        }),
        navigation: JSON.stringify([
          { id: generateId(), label: 'Home', href: '/', type: 'link', order: 0 },
          { id: generateId(), label: 'About', href: '/about', type: 'link', order: 1 },
          { id: generateId(), label: 'What We Do', href: '/what-we-do', type: 'link', order: 2 },
          { id: generateId(), label: 'Why Ten Sparrows', href: '/why-ten-sparrows', type: 'link', order: 3 },
        ]),
        ctaButton: JSON.stringify({
          text: "Let's Talk",
          href: '/contact',
          variant: 'default',
        }),
        style: JSON.stringify({
          position: 'fixed',
          blurOnScroll: true,
        }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    console.log('✓ Created default header');

    // Create default footer
    const defaultFooter = await prisma.footer.create({
      data: {
        name: 'Main Footer',
        isDefault: true,
        logo: JSON.stringify({
          text: 'TenSparrows',
          href: '/',
        }),
        description:
          'We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.',
        columns: JSON.stringify([
          {
            id: generateId(),
            title: 'Navigation',
            order: 0,
            links: [
              { id: generateId(), label: 'Home', href: '/' },
              { id: generateId(), label: 'About', href: '/about' },
              { id: generateId(), label: 'What We Do', href: '/what-we-do' },
              { id: generateId(), label: 'Why Ten Sparrows', href: '/why-ten-sparrows' },
              { id: generateId(), label: 'Contact', href: '/contact' },
            ],
          },
          {
            id: generateId(),
            title: 'Legal',
            order: 1,
            links: [
              { id: generateId(), label: 'Privacy Policy', href: '/privacy-policy' },
              { id: generateId(), label: 'Terms of Service', href: '/terms-of-service' },
            ],
          },
        ]),
        contactInfo: JSON.stringify({
          email: 'info@tensparrows.com',
          address: 'Atlanta, GA 30318',
        }),
        bottomBar: JSON.stringify({
          copyright: `© ${new Date().getFullYear()} Ten Sparrows. All rights reserved.`,
        }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    console.log('✓ Created default footer');

    // Create site settings
    await prisma.siteSettings.create({
      data: {
        siteName: 'Ten Sparrows',
        siteDescription: 'Modern computing for real-world operations',
        seo: JSON.stringify({
          defaultTitle: 'Modern Computing for Real-World Operations',
          titleSuffix: ' | Ten Sparrows',
          defaultDescription:
            'We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.',
          defaultKeywords: ['edge computing', 'micro data centers', 'AI', 'automation', 'local computing'],
        }),
        contact: JSON.stringify({
          email: 'info@tensparrows.com',
          address: 'Atlanta, GA 30318',
        }),
        updatedById: adminUser.id,
      },
    });

    console.log('✓ Created site settings');

    // ============================================
    // HOME PAGE SECTIONS
    // ============================================
    console.log('\n📄 Creating Home page...');

    const homeHeroSection = await prisma.section.create({
      data: {
        name: 'Home - Hero',
        type: 'section',
        blocks: JSON.stringify([componentBlock('Hero')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const homeHighlightsSection = await prisma.section.create({
      data: {
        name: 'Home - Highlights',
        type: 'section',
        blocks: JSON.stringify([componentBlock('HighlightsSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const homeCloudSection = await prisma.section.create({
      data: {
        name: 'Home - Cloud',
        type: 'section',
        blocks: JSON.stringify([componentBlock('CloudSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const homeProblemSection = await prisma.section.create({
      data: {
        name: 'Home - Problem',
        type: 'section',
        blocks: JSON.stringify([componentBlock('ProblemSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const homeSolutionSection = await prisma.section.create({
      data: {
        name: 'Home - Solution',
        type: 'section',
        blocks: JSON.stringify([componentBlock('SolutionSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const homeServicesSection = await prisma.section.create({
      data: {
        name: 'Home - Services',
        type: 'section',
        blocks: JSON.stringify([componentBlock('ServicesSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const homeTargetAudienceSection = await prisma.section.create({
      data: {
        name: 'Home - Target Audience',
        type: 'section',
        blocks: JSON.stringify([componentBlock('TargetAudienceSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const homeCTASection = await prisma.section.create({
      data: {
        name: 'Home - CTA',
        type: 'section',
        blocks: JSON.stringify([componentBlock('CTASection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    // Create home page
    const homePage = await prisma.page.create({
      data: {
        title: 'Home',
        slug: 'home',
        description: 'Ten Sparrows - Modern computing for real-world operations',
        metaTitle: 'Modern Computing for Real-World Operations | Ten Sparrows',
        metaDescription:
          'Ten Sparrows helps organizations running critical, real-world systems use modern technology without putting everything at risk or relying solely on distant cloud infrastructure.',
        status: 'published',
        template: 'default',
        order: 0,
        showInNavigation: true,
        navigationLabel: 'Home',
        isHomePage: true,
        headerId: defaultHeader.id,
        footerId: defaultFooter.id,
        createdById: adminUser.id,
        updatedById: adminUser.id,
        publishedAt: new Date(),
      },
    });

    await prisma.pageSection.createMany({
      data: [
        { pageId: homePage.id, sectionId: homeHeroSection.id, order: 0 },
        { pageId: homePage.id, sectionId: homeHighlightsSection.id, order: 1 },
        { pageId: homePage.id, sectionId: homeCloudSection.id, order: 2 },
        { pageId: homePage.id, sectionId: homeProblemSection.id, order: 3 },
        { pageId: homePage.id, sectionId: homeSolutionSection.id, order: 4 },
        { pageId: homePage.id, sectionId: homeServicesSection.id, order: 5 },
        { pageId: homePage.id, sectionId: homeTargetAudienceSection.id, order: 6 },
        { pageId: homePage.id, sectionId: homeCTASection.id, order: 7 },
      ],
    });

    console.log('  ✓ Home page created with 8 sections');

    // ============================================
    // ABOUT PAGE SECTIONS
    // ============================================
    console.log('\n📄 Creating About page...');

    const aboutHeroSection = await prisma.section.create({
      data: {
        name: 'About - Hero',
        type: 'section',
        blocks: JSON.stringify([componentBlock('AboutHero')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const aboutContentSection = await prisma.section.create({
      data: {
        name: 'About - Content',
        type: 'section',
        blocks: JSON.stringify([componentBlock('AboutSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const aboutVisionMissionSection = await prisma.section.create({
      data: {
        name: 'About - Vision & Mission',
        type: 'section',
        blocks: JSON.stringify([componentBlock('VisionMissionSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const aboutValuesSection = await prisma.section.create({
      data: {
        name: 'About - Values',
        type: 'section',
        blocks: JSON.stringify([componentBlock('ValuesSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const aboutCTASection = await prisma.section.create({
      data: {
        name: 'About - CTA',
        type: 'section',
        blocks: JSON.stringify([
          componentBlock('CTASection', {
            title: 'Ready to build something real?',
            description: "Let's discuss how we can help you deploy computing power where it matters most.",
          }),
        ]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const aboutPage = await prisma.page.create({
      data: {
        title: 'About Us',
        slug: 'about',
        description: 'Learn about Ten Sparrows - we build micro data centers for the real world',
        metaTitle: 'About Us | Ten Sparrows',
        metaDescription:
          'Learn about Ten Sparrows - we build micro data centers for the real world, designed for organizations where performance, reliability, and control matter.',
        status: 'published',
        template: 'default',
        order: 1,
        showInNavigation: true,
        navigationLabel: 'About',
        isHomePage: false,
        headerId: defaultHeader.id,
        footerId: defaultFooter.id,
        createdById: adminUser.id,
        updatedById: adminUser.id,
        publishedAt: new Date(),
      },
    });

    await prisma.pageSection.createMany({
      data: [
        { pageId: aboutPage.id, sectionId: aboutHeroSection.id, order: 0 },
        { pageId: aboutPage.id, sectionId: aboutContentSection.id, order: 1 },
        { pageId: aboutPage.id, sectionId: aboutVisionMissionSection.id, order: 2 },
        { pageId: aboutPage.id, sectionId: aboutValuesSection.id, order: 3 },
        { pageId: aboutPage.id, sectionId: aboutCTASection.id, order: 4 },
      ],
    });

    console.log('  ✓ About page created with 5 sections');

    // ============================================
    // WHAT WE DO PAGE SECTIONS
    // ============================================
    console.log('\n📄 Creating What We Do page...');

    const whatWeDoHeroSection = await prisma.section.create({
      data: {
        name: 'What We Do - Hero',
        type: 'section',
        blocks: JSON.stringify([componentBlock('WhatWeDoHero')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whatWeDoCapabilitiesSection = await prisma.section.create({
      data: {
        name: 'What We Do - Capabilities',
        type: 'section',
        blocks: JSON.stringify([componentBlock('CapabilitiesSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whatWeDoServicesSection = await prisma.section.create({
      data: {
        name: 'What We Do - Detailed Services',
        type: 'section',
        blocks: JSON.stringify([componentBlock('DetailedServicesSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whatWeDoEngagementSection = await prisma.section.create({
      data: {
        name: 'What We Do - Engagement',
        type: 'section',
        blocks: JSON.stringify([componentBlock('EngagementSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whatWeDoCTASection = await prisma.section.create({
      data: {
        name: 'What We Do - CTA',
        type: 'section',
        blocks: JSON.stringify([
          componentBlock('CTASection', {
            title: 'Ready to discuss your needs?',
            description: "Every organization is different. Let's explore what the right solution looks like for you.",
          }),
        ]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whatWeDoPage = await prisma.page.create({
      data: {
        title: 'What We Do',
        slug: 'what-we-do',
        description: 'Our solutions and capabilities',
        metaTitle: 'What We Do | Ten Sparrows',
        metaDescription:
          'Discover our solutions: local computing environments, AI monitoring, smart city systems, secure data integration, and custom field applications.',
        status: 'published',
        template: 'default',
        order: 2,
        showInNavigation: true,
        navigationLabel: 'What We Do',
        isHomePage: false,
        headerId: defaultHeader.id,
        footerId: defaultFooter.id,
        createdById: adminUser.id,
        updatedById: adminUser.id,
        publishedAt: new Date(),
      },
    });

    await prisma.pageSection.createMany({
      data: [
        { pageId: whatWeDoPage.id, sectionId: whatWeDoHeroSection.id, order: 0 },
        { pageId: whatWeDoPage.id, sectionId: whatWeDoCapabilitiesSection.id, order: 1 },
        { pageId: whatWeDoPage.id, sectionId: whatWeDoServicesSection.id, order: 2 },
        { pageId: whatWeDoPage.id, sectionId: whatWeDoEngagementSection.id, order: 3 },
        { pageId: whatWeDoPage.id, sectionId: whatWeDoCTASection.id, order: 4 },
      ],
    });

    console.log('  ✓ What We Do page created with 5 sections');

    // ============================================
    // WHY TEN SPARROWS PAGE SECTIONS
    // ============================================
    console.log('\n📄 Creating Why Ten Sparrows page...');

    const whyHeroSection = await prisma.section.create({
      data: {
        name: 'Why - Hero',
        type: 'section',
        blocks: JSON.stringify([componentBlock('WhyHero')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whyDifferentiatorsSection = await prisma.section.create({
      data: {
        name: 'Why - Differentiators',
        type: 'section',
        blocks: JSON.stringify([componentBlock('DifferentiatorsSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whyApproachSection = await prisma.section.create({
      data: {
        name: 'Why - Approach',
        type: 'section',
        blocks: JSON.stringify([componentBlock('ApproachSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whyValuesSection = await prisma.section.create({
      data: {
        name: 'Why - Values',
        type: 'section',
        blocks: JSON.stringify([componentBlock('ValuesSection')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whyCTASection = await prisma.section.create({
      data: {
        name: 'Why - CTA',
        type: 'section',
        blocks: JSON.stringify([
          componentBlock('CTASection', {
            title: 'Experience the difference',
            description: 'See why organizations trust Ten Sparrows for their most critical computing needs.',
          }),
        ]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const whyPage = await prisma.page.create({
      data: {
        title: 'Why Ten Sparrows',
        slug: 'why-ten-sparrows',
        description: 'Why choose Ten Sparrows',
        metaTitle: 'Why Ten Sparrows | Ten Sparrows',
        metaDescription:
          'Discover why organizations choose Ten Sparrows for their edge computing and intelligent systems needs. Practical solutions, real accountability.',
        status: 'published',
        template: 'default',
        order: 3,
        showInNavigation: true,
        navigationLabel: 'Why Ten Sparrows',
        isHomePage: false,
        headerId: defaultHeader.id,
        footerId: defaultFooter.id,
        createdById: adminUser.id,
        updatedById: adminUser.id,
        publishedAt: new Date(),
      },
    });

    await prisma.pageSection.createMany({
      data: [
        { pageId: whyPage.id, sectionId: whyHeroSection.id, order: 0 },
        { pageId: whyPage.id, sectionId: whyDifferentiatorsSection.id, order: 1 },
        { pageId: whyPage.id, sectionId: whyApproachSection.id, order: 2 },
        { pageId: whyPage.id, sectionId: whyValuesSection.id, order: 3 },
        { pageId: whyPage.id, sectionId: whyCTASection.id, order: 4 },
      ],
    });

    console.log('  ✓ Why Ten Sparrows page created with 5 sections');

    // ============================================
    // CONTACT PAGE SECTIONS
    // ============================================
    console.log('\n📄 Creating Contact page...');

    const contactHeroSection = await prisma.section.create({
      data: {
        name: 'Contact - Hero',
        type: 'section',
        blocks: JSON.stringify([componentBlock('ContactHero')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const contactFormSection = await prisma.section.create({
      data: {
        name: 'Contact - Form',
        type: 'section',
        blocks: JSON.stringify([componentBlock('ContactForm')]),
        settings: JSON.stringify({ fullWidth: true }),
        createdById: adminUser.id,
        updatedById: adminUser.id,
      },
    });

    const contactPage = await prisma.page.create({
      data: {
        title: 'Contact',
        slug: 'contact',
        description: 'Get in touch with Ten Sparrows',
        metaTitle: 'Contact Us | Ten Sparrows',
        metaDescription:
          "Get in touch with Ten Sparrows. Schedule a free consultation or send us a message to discuss your operational computing needs.",
        status: 'published',
        template: 'default',
        order: 4,
        showInNavigation: false,
        navigationLabel: 'Contact',
        isHomePage: false,
        headerId: defaultHeader.id,
        footerId: defaultFooter.id,
        createdById: adminUser.id,
        updatedById: adminUser.id,
        publishedAt: new Date(),
      },
    });

    await prisma.pageSection.createMany({
      data: [
        { pageId: contactPage.id, sectionId: contactHeroSection.id, order: 0 },
        { pageId: contactPage.id, sectionId: contactFormSection.id, order: 1 },
      ],
    });

    console.log('  ✓ Contact page created with 2 sections');

    // ============================================
    // SUMMARY
    // ============================================
    console.log('\n' + '='.repeat(50));
    console.log('Database seeded successfully!');
    console.log('='.repeat(50));
    console.log('\nCreated:');
    console.log('  • 1 Admin user');
    console.log('  • 1 Default header');
    console.log('  • 1 Default footer');
    console.log('  • 1 Site settings');
    console.log('  • 5 Pages (Home, About, What We Do, Why Ten Sparrows, Contact)');
    console.log('  • 25 Sections total');
    console.log('\nAdmin credentials:');
    console.log(`  Email: ${process.env.ADMIN_EMAIL || 'admin@tensparrows.com'}`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'Admin123!'}`);
    console.log('\n');

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seed();
