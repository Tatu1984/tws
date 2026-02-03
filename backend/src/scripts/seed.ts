import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/database';
import { User, Page, Section, Header, Footer, SiteSettings } from '../models';

dotenv.config();

const generateId = () => Math.random().toString(36).substring(2, 15);

async function seed() {
  try {
    await connectDB();

    console.log('Seeding database...');

    // Clear existing data
    await User.deleteMany({});
    await Page.deleteMany({});
    await Section.deleteMany({});
    await Header.deleteMany({});
    await Footer.deleteMany({});
    await SiteSettings.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@tensparrows.com',
      password: process.env.ADMIN_PASSWORD || 'Admin123!',
      name: 'Admin',
      role: 'admin',
      isActive: true,
    });

    console.log('Created admin user:', adminUser.email);

    // Create default header
    const defaultHeader = await Header.create({
      name: 'Main Header',
      isDefault: true,
      logo: {
        text: 'TenSparrows',
        href: '/',
      },
      navigation: [
        { id: generateId(), label: 'Home', href: '/', type: 'link', order: 0 },
        { id: generateId(), label: 'About', href: '/about', type: 'link', order: 1 },
        { id: generateId(), label: 'What We Do', href: '/what-we-do', type: 'link', order: 2 },
        { id: generateId(), label: 'Why Ten Sparrows', href: '/why-ten-sparrows', type: 'link', order: 3 },
      ],
      ctaButton: {
        text: "Let's Talk",
        href: '/contact',
        variant: 'default',
      },
      style: {
        position: 'fixed',
        blurOnScroll: true,
      },
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
    });

    console.log('Created default header');

    // Create default footer
    const defaultFooter = await Footer.create({
      name: 'Main Footer',
      isDefault: true,
      logo: {
        text: 'TenSparrows',
        href: '/',
      },
      description:
        'We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.',
      columns: [
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
            { id: generateId(), label: 'Privacy Policy', href: '/privacy' },
            { id: generateId(), label: 'Terms of Service', href: '/terms' },
          ],
        },
      ],
      contactInfo: {
        email: 'hello@tensparrows.com',
        address: 'Atlanta, GA',
      },
      bottomBar: {
        copyright: `© ${new Date().getFullYear()} Ten Sparrows. All rights reserved.`,
      },
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
    });

    console.log('Created default footer');

    // Create site settings
    await SiteSettings.create({
      siteName: 'Ten Sparrows',
      siteDescription:
        'Modern computing for real-world operations',
      seo: {
        defaultTitle: 'Modern Computing for Real-World Operations',
        titleSuffix: ' | Ten Sparrows',
        defaultDescription:
          'We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.',
        defaultKeywords: ['edge computing', 'micro data centers', 'AI', 'automation', 'local computing'],
      },
      contact: {
        email: 'hello@tensparrows.com',
        address: 'Atlanta, GA',
      },
      updatedBy: adminUser._id,
    });

    console.log('Created site settings');

    // Create home page sections
    const heroSection = await Section.create({
      name: 'Hero Section',
      type: 'section',
      blocks: [
        {
          id: generateId(),
          type: 'hero',
          content: {
            title: 'Modern computing for real-world operations',
            description:
              'We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.',
            ctaText: "Let's Talk",
            ctaLink: '/contact',
            showFeatures: true,
            features: [
              { icon: 'Server', text: 'Local, secure computing environments' },
              { icon: 'Cpu', text: 'AI and automation deployed on-site' },
              { icon: 'Shield', text: 'Designed for reliability, control, and long-term trust' },
            ],
          },
          order: 0,
        },
      ],
      settings: {
        fullWidth: true,
        containerWidth: 'default',
      },
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
    });

    const problemSection = await Section.create({
      name: 'Problem Section',
      type: 'section',
      blocks: [
        {
          id: generateId(),
          type: 'cardGrid',
          content: {
            subtitle: 'The Challenge',
            title: 'The cloud alone is not enough',
            description:
              'For mission-critical operations, distance creates delay, risk, and dependency.',
            cards: [
              { icon: 'Cloud', title: 'Cloud dependency', description: 'Critical operations shouldn\'t rely solely on distant servers.' },
              { icon: 'Clock', title: 'Latency issues', description: 'Distance creates delay. Real-time decisions need local processing.' },
              { icon: 'AlertTriangle', title: 'Single points of failure', description: 'Centralized systems create risk.' },
              { icon: 'Lock', title: 'Data sovereignty', description: 'Sensitive data shouldn\'t travel across networks.' },
            ],
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: 'muted',
      },
      settings: {
        containerWidth: 'default',
      },
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
    });

    const ctaSection = await Section.create({
      name: 'CTA Section',
      type: 'section',
      blocks: [
        {
          id: generateId(),
          type: 'cta',
          content: {
            title: "Let's start the conversation",
            description:
              'Whether you\'re exploring options or ready to move forward, we\'re here to listen and help you find the right path.',
            ctaText: 'Get in Touch',
            ctaLink: '/contact',
          },
          order: 0,
        },
      ],
      settings: {
        fullWidth: true,
      },
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
    });

    console.log('Created sections');

    // Create home page
    const homePage = await Page.create({
      title: 'Home',
      slug: 'home',
      description: 'Ten Sparrows - Modern computing for real-world operations',
      metaTitle: 'Modern Computing for Real-World Operations',
      metaDescription:
        'We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.',
      status: 'published',
      template: 'default',
      sections: [heroSection._id, problemSection._id, ctaSection._id],
      header: defaultHeader._id,
      footer: defaultFooter._id,
      order: 0,
      showInNavigation: true,
      navigationLabel: 'Home',
      isHomePage: true,
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
      publishedAt: new Date(),
    });

    console.log('Created home page');

    // Create About page
    const aboutPage = await Page.create({
      title: 'About',
      slug: 'about',
      description: 'Learn about Ten Sparrows',
      metaTitle: 'About Us',
      status: 'published',
      template: 'default',
      order: 1,
      showInNavigation: true,
      navigationLabel: 'About',
      isHomePage: false,
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
      publishedAt: new Date(),
    });

    // Create What We Do page
    const whatWeDoPage = await Page.create({
      title: 'What We Do',
      slug: 'what-we-do',
      description: 'Our services and solutions',
      metaTitle: 'What We Do',
      status: 'published',
      template: 'default',
      order: 2,
      showInNavigation: true,
      navigationLabel: 'What We Do',
      isHomePage: false,
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
      publishedAt: new Date(),
    });

    // Create Contact page
    const contactPage = await Page.create({
      title: 'Contact',
      slug: 'contact',
      description: 'Get in touch with us',
      metaTitle: 'Contact Us',
      status: 'published',
      template: 'default',
      order: 4,
      showInNavigation: false,
      navigationLabel: 'Contact',
      isHomePage: false,
      createdBy: adminUser._id,
      updatedBy: adminUser._id,
      publishedAt: new Date(),
    });

    console.log('Created all pages');
    console.log('\nDatabase seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log(`Email: ${process.env.ADMIN_EMAIL || 'admin@tensparrows.com'}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'Admin123!'}`);

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
