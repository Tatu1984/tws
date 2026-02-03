import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Page } from './models/Page';
import { Section } from './models/Section';
import { User } from './models/User';
import { Header } from './models/Header';
import { SiteSettings } from './models/SiteSettings';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tsw';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Page.deleteMany({});
    await Section.deleteMany({});
    await Header.deleteMany({});
    await SiteSettings.deleteMany({});
    console.log('Cleared existing data');

    // Get or create admin user
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = await User.create({
        email: 'admin@tensparrows.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
      });
      console.log('Created admin user');
    }

    const userId = adminUser._id;

    // Create Header
    const header = await Header.create({
      logo: {
        src: '/images/logo.png',
        alt: 'Ten Sparrows',
        width: 156,
        height: 40,
      },
      navigation: [
        { label: 'Home', href: '/', order: 0, isActive: true },
        { label: 'About', href: '/about', order: 1, isActive: true },
        { label: 'What We Do', href: '/what-we-do', order: 2, isActive: true },
        { label: 'Why Ten Sparrows', href: '/why-ten-sparrows', order: 3, isActive: true },
      ],
      ctaButton: {
        text: "Let's Talk",
        href: '/contact',
        variant: 'primary',
      },
      isActive: true,
      createdBy: userId,
      updatedBy: userId,
    });
    console.log('Created header');

    // Create Site Settings
    await SiteSettings.create({
      siteName: 'Ten Sparrows',
      siteDescription: 'Modern Computing for Real-World Operations',
      contactEmail: 'info@tensparrows.com',
      address: 'Atlanta, GA 30318',
      socialLinks: [],
      createdBy: userId,
      updatedBy: userId,
    });
    console.log('Created site settings');

    // ============================================
    // HOME PAGE
    // ============================================
    const homeHeroSection = await Section.create({
      name: 'Home Hero',
      type: 'section',
      blocks: [
        {
          id: 'hero-1',
          type: 'hero',
          content: {
            title: 'Modern computing for real-world operations.',
            description: 'Ten Sparrows helps organizations running critical, real-world systems use modern technology without putting everything at risk or relying solely on distant cloud infrastructure.',
            alignment: 'center',
            ctaButtons: [
              { text: 'Start the Conversation', href: '/contact', variant: 'default' }
            ],
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#001a2b',
        padding: { top: '8rem', bottom: '3rem' },
      },
      settings: {
        fullWidth: true,
        containerWidth: 'default',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const homeHighlightsSection = await Section.create({
      name: 'Home Highlights',
      type: 'section',
      blocks: [
        {
          id: 'features-1',
          type: 'features',
          content: {
            features: [
              { title: 'Local, secure computing environments', icon: '💻' },
              { title: 'AI and automation deployed on-site', icon: '🤖' },
              { title: 'Designed for reliability, control, and long-term trust', icon: '🛡️' },
            ],
            columns: 3,
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#001a2b',
        padding: { top: '4rem', bottom: '5rem' },
      },
      settings: {
        containerWidth: 'default',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const homeCloudSection = await Section.create({
      name: 'Cloud Not Enough',
      type: 'section',
      blocks: [
        {
          id: 'heading-1',
          type: 'heading',
          content: {
            text: 'The cloud alone is not enough.',
            level: 'h2',
            alignment: 'center',
          },
          order: 0,
        },
        {
          id: 'text-1',
          type: 'text',
          content: {
            content: '<p><span style="color: #f3b44a; font-weight: 600;">Real operations don\'t always fit cloud-only solutions</span>. Many organizations are pushed toward centralized cloud models that ignore the realities of physical environments—where responsiveness, resilience, and direct control matter. Ten Sparrows takes a different approach, bringing computing power closer to where data is created and decisions are made, reducing risk and increasing operational confidence.</p>',
            alignment: 'center',
          },
          order: 1,
        },
      ],
      style: {
        backgroundColor: '#fcfbf9',
        padding: { top: '4rem', bottom: '6rem' },
      },
      settings: {
        containerWidth: 'narrow',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const homeProblemSection = await Section.create({
      name: 'The Problem',
      type: 'section',
      blocks: [
        {
          id: 'custom-problem',
          type: 'custom',
          content: {
            html: `
              <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <span class="text-sm font-semibold text-[#e57368] uppercase tracking-wider">The Problem</span>
                  <h2 class="text-3xl lg:text-4xl font-bold text-[#001a2b] mb-6 mt-4 leading-tight">Distance creates delay, risk, and dependency.</h2>
                  <p class="text-lg text-[#050707]/80 leading-relaxed">When data must travel long distances to be processed, response times slow and systems become more fragile. For organizations responsible for safety, infrastructure, or regulated services, these delays can undermine reliability and trust.</p>
                  <p class="text-lg text-[#050707]/80 leading-relaxed mt-4">Centralized systems also increase dependency—on connectivity, third parties, and external timelines that may not align with operational realities.</p>
                </div>
                <div class="relative order-first lg:order-last">
                  <div class="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200">
                    <img src="/images/problem-image.png" alt="Distance creates delay" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            `,
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#fcfbf9',
        padding: { top: '4rem', bottom: '6rem' },
      },
      settings: {
        containerWidth: 'wide',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const homeSolutionSection = await Section.create({
      name: 'Our Approach',
      type: 'section',
      blocks: [
        {
          id: 'custom-solution',
          type: 'custom',
          content: {
            html: `
              <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div class="relative order-first">
                  <div class="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200">
                    <img src="/images/solution-image.png" alt="Micro data centers at the edge" class="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <span class="text-sm font-semibold text-[#e57368] uppercase tracking-wider">Our Approach</span>
                  <h2 class="text-3xl lg:text-4xl font-bold text-[#001a2b] mb-6 mt-4 leading-tight">Micro data centers at the edge.</h2>
                  <p class="text-lg text-[#050707]/80 leading-relaxed">We design and deploy small, secure, local computing environments—micro data centers—placed on-site or near operations. These systems process data locally and run AI models close to the source, reducing latency while improving resilience and control.</p>
                  <p class="text-lg text-[#050707]/80 leading-relaxed mt-4">This approach is often called edge computing. At its core, it's about keeping critical intelligence close to the action.</p>
                </div>
              </div>
            `,
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#fcfbf9',
        padding: { top: '4rem', bottom: '6rem' },
      },
      settings: {
        containerWidth: 'wide',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const homeServicesSection = await Section.create({
      name: 'What We Deliver',
      type: 'section',
      blocks: [
        {
          id: 'custom-services',
          type: 'custom',
          content: {
            html: `
              <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <span class="text-sm font-semibold text-[#e57368] uppercase tracking-wider">What We Deliver</span>
                  <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6 mt-4 leading-tight">Practical systems, not abstract platforms.</h2>
                  <p class="text-lg text-white/80 leading-relaxed mb-8">Everything we deploy is designed to operate reliably in real-world conditions, not idealized ones. Our systems are built to perform today within existing infrastructure, security requirements, and operational constraints, while remaining flexible enough to scale and evolve responsibly over time as needs change.</p>
                  <ul class="space-y-4">
                    <li class="flex items-start gap-3">
                      <span class="text-[#e57368]">✓</span>
                      <span class="text-white text-lg">Secure, local computing environments</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="text-[#e57368]">✓</span>
                      <span class="text-white text-lg">AI-enabled monitoring and analysis</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="text-[#e57368]">✓</span>
                      <span class="text-white text-lg">On-site and hybrid system integrations</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="text-[#e57368]">✓</span>
                      <span class="text-white text-lg">Custom software applications built for field reliability</span>
                    </li>
                  </ul>
                </div>
                <div class="relative order-first lg:order-last">
                  <div class="aspect-[4/3] rounded-3xl overflow-hidden">
                    <img src="/images/what-we-deliver.png" alt="What we deliver" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            `,
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#001a2b',
        padding: { top: '6rem', bottom: '6rem' },
      },
      settings: {
        containerWidth: 'wide',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const homeTargetSection = await Section.create({
      name: 'Who We Work With',
      type: 'section',
      blocks: [
        {
          id: 'custom-target',
          type: 'custom',
          content: {
            html: `
              <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div class="relative order-first">
                  <div class="aspect-[4/3] rounded-3xl overflow-hidden">
                    <img src="/images/who-we-work-with.png" alt="Who we work with" class="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <span class="text-sm font-semibold text-[#e57368] uppercase tracking-wider">Who We Work With</span>
                  <h2 class="text-3xl lg:text-4xl font-bold text-[#001a2b] mb-6 mt-4 leading-tight">Built for organizations with real responsibility.</h2>
                  <p class="text-lg text-[#050707]/80 leading-relaxed mb-6">Ten Sparrows works with organizations that cannot afford downtime, uncertainty, or untested technology. Our partners operate in environments where reliability, security, and accountability matter deeply.</p>
                  <p class="text-lg text-[#050707]/80 leading-relaxed mb-6">We work with organizations operating in regulated or mission-critical environments, including:</p>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <span class="text-[#e57368]">✓</span>
                      <span class="text-[#001a2b] text-lg">Public agencies</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="text-[#e57368]">✓</span>
                      <span class="text-[#001a2b] text-lg">Utilities and infrastructure operators</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="text-[#e57368]">✓</span>
                      <span class="text-[#001a2b] text-lg">Healthcare organizations</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="text-[#e57368]">✓</span>
                      <span class="text-[#001a2b] text-lg">Manufacturing and logistics companies</span>
                    </li>
                  </ul>
                </div>
              </div>
            `,
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#f5f5f5',
        padding: { top: '6rem', bottom: '6rem' },
      },
      settings: {
        containerWidth: 'wide',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const homeCTASection = await Section.create({
      name: 'Home CTA',
      type: 'section',
      blocks: [
        {
          id: 'cta-1',
          type: 'cta',
          content: {
            title: 'Start a conversation',
            description: "If you're exploring how to modernize systems without compromising control or reliability, we're happy to talk.",
            primaryButton: { text: 'Start a Conversation', href: '/contact' },
            backgroundImage: '/images/services-1.jpeg',
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#001a2b',
        padding: { top: '6rem', bottom: '6rem' },
      },
      settings: {
        fullWidth: true,
      },
      createdBy: userId,
      updatedBy: userId,
    });

    // Create Home Page
    const homePage = await Page.create({
      title: 'Home',
      slug: 'home',
      description: 'Ten Sparrows - Modern Computing for Real-World Operations',
      metaTitle: 'Ten Sparrows - Modern Computing for Real-World Operations',
      metaDescription: 'We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.',
      metaKeywords: ['edge computing', 'micro data centers', 'AI', 'automation', 'local computing'],
      status: 'published',
      sections: [
        homeHeroSection._id,
        homeHighlightsSection._id,
        homeCloudSection._id,
        homeProblemSection._id,
        homeSolutionSection._id,
        homeServicesSection._id,
        homeTargetSection._id,
        homeCTASection._id,
      ],
      header: header._id,
      isHomePage: true,
      showInNavigation: true,
      navigationLabel: 'Home',
      order: 0,
      createdBy: userId,
      updatedBy: userId,
      publishedAt: new Date(),
    });
    console.log('Created Home page');

    // ============================================
    // ABOUT PAGE
    // ============================================
    const aboutHeroSection = await Section.create({
      name: 'About Hero',
      type: 'section',
      blocks: [
        {
          id: 'hero-about',
          type: 'hero',
          content: {
            title: 'About Ten Sparrows',
            subtitle: 'Our Story',
            description: 'We build computing infrastructure that works where it matters most—on the ground, in the field, at the edge of operations.',
            alignment: 'center',
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#001a2b',
        padding: { top: '10rem', bottom: '6rem' },
      },
      settings: {
        fullWidth: true,
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const aboutContentSection = await Section.create({
      name: 'About Content',
      type: 'section',
      blocks: [
        {
          id: 'text-about',
          type: 'text',
          content: {
            content: `
              <p class="text-lg mb-6">Ten Sparrows was founded on a simple belief: modern technology should serve real-world operations, not complicate them.</p>
              <p class="text-lg mb-6">Too many organizations have been sold the promise of cloud computing without considering whether it truly fits their operational reality. For those managing critical infrastructure, regulated environments, or mission-critical systems, relying entirely on distant data centers introduces risks that are often unacceptable.</p>
              <p class="text-lg mb-6">We take a different approach. By combining edge computing, AI, and practical engineering, we help organizations modernize their systems while maintaining the control, reliability, and security they need.</p>
              <p class="text-lg">Our team brings deep experience in infrastructure, software development, and operations. We understand the challenges of deploying technology in environments where failure isn't an option.</p>
            `,
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#fcfbf9',
        padding: { top: '6rem', bottom: '6rem' },
      },
      settings: {
        containerWidth: 'narrow',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const aboutPage = await Page.create({
      title: 'About',
      slug: 'about',
      description: 'About Ten Sparrows',
      metaTitle: 'About - Ten Sparrows',
      metaDescription: 'Learn about Ten Sparrows and our mission to bring modern computing to real-world operations.',
      status: 'published',
      sections: [aboutHeroSection._id, aboutContentSection._id, homeCTASection._id],
      header: header._id,
      showInNavigation: true,
      navigationLabel: 'About',
      order: 1,
      createdBy: userId,
      updatedBy: userId,
      publishedAt: new Date(),
    });
    console.log('Created About page');

    // ============================================
    // WHAT WE DO PAGE
    // ============================================
    const whatWeDoHeroSection = await Section.create({
      name: 'What We Do Hero',
      type: 'section',
      blocks: [
        {
          id: 'hero-whatwedo',
          type: 'hero',
          content: {
            title: 'What We Do',
            subtitle: 'Our Services',
            description: 'We design, build, and operate intelligent computing systems that work at the edge—where your operations happen.',
            alignment: 'center',
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#001a2b',
        padding: { top: '10rem', bottom: '6rem' },
      },
      settings: {
        fullWidth: true,
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const whatWeDoServicesSection = await Section.create({
      name: 'Services List',
      type: 'section',
      blocks: [
        {
          id: 'services-grid',
          type: 'cardGrid',
          content: {
            columns: 2,
            cards: [
              {
                title: 'Edge Computing Infrastructure',
                description: 'Deploy secure, local computing environments that process data where it\'s created. Reduce latency, improve reliability, and maintain control over your critical systems.',
              },
              {
                title: 'AI & Machine Learning Deployment',
                description: 'Bring AI capabilities directly to your operations. Our on-site AI solutions enable real-time monitoring, predictive maintenance, and intelligent automation.',
              },
              {
                title: 'System Integration',
                description: 'Connect legacy systems with modern technology. We build bridges between your existing infrastructure and new capabilities without disrupting operations.',
              },
              {
                title: 'Custom Software Development',
                description: 'Purpose-built applications designed for field reliability. Every solution is engineered to work in real-world conditions, not just ideal environments.',
              },
            ],
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#fcfbf9',
        padding: { top: '6rem', bottom: '6rem' },
      },
      settings: {
        containerWidth: 'wide',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const whatWeDoPage = await Page.create({
      title: 'What We Do',
      slug: 'what-we-do',
      description: 'Our Services at Ten Sparrows',
      metaTitle: 'What We Do - Ten Sparrows',
      metaDescription: 'Discover how Ten Sparrows helps organizations with edge computing, AI deployment, and custom software solutions.',
      status: 'published',
      sections: [whatWeDoHeroSection._id, whatWeDoServicesSection._id, homeCTASection._id],
      header: header._id,
      showInNavigation: true,
      navigationLabel: 'What We Do',
      order: 2,
      createdBy: userId,
      updatedBy: userId,
      publishedAt: new Date(),
    });
    console.log('Created What We Do page');

    // ============================================
    // WHY TEN SPARROWS PAGE
    // ============================================
    const whyHeroSection = await Section.create({
      name: 'Why Ten Sparrows Hero',
      type: 'section',
      blocks: [
        {
          id: 'hero-why',
          type: 'hero',
          content: {
            title: 'Why Ten Sparrows',
            subtitle: 'Our Difference',
            description: 'In a world of one-size-fits-all cloud solutions, we take a different path.',
            alignment: 'center',
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#001a2b',
        padding: { top: '10rem', bottom: '6rem' },
      },
      settings: {
        fullWidth: true,
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const whyContentSection = await Section.create({
      name: 'Why Content',
      type: 'section',
      blocks: [
        {
          id: 'features-why',
          type: 'features',
          content: {
            title: 'What Sets Us Apart',
            features: [
              {
                title: 'Real-World Focus',
                description: 'We design for actual operating conditions, not idealized environments. Every solution is tested against the realities of your operations.',
              },
              {
                title: 'Local Control',
                description: 'Keep your data and processing close to your operations. Reduce dependency on external connectivity and third-party infrastructure.',
              },
              {
                title: 'Proven Reliability',
                description: 'Our systems are built for environments where failure isn\'t an option. We prioritize resilience, redundancy, and operational continuity.',
              },
              {
                title: 'Long-Term Partnership',
                description: 'We\'re not here to sell you a product and disappear. We build relationships focused on your ongoing success and evolution.',
              },
            ],
            columns: 2,
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#fcfbf9',
        padding: { top: '6rem', bottom: '6rem' },
      },
      settings: {
        containerWidth: 'wide',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const whyTenSparrowsPage = await Page.create({
      title: 'Why Ten Sparrows',
      slug: 'why-ten-sparrows',
      description: 'Why Choose Ten Sparrows',
      metaTitle: 'Why Ten Sparrows - Our Difference',
      metaDescription: 'Discover why organizations choose Ten Sparrows for their edge computing and intelligent systems needs.',
      status: 'published',
      sections: [whyHeroSection._id, whyContentSection._id, homeCTASection._id],
      header: header._id,
      showInNavigation: true,
      navigationLabel: 'Why Ten Sparrows',
      order: 3,
      createdBy: userId,
      updatedBy: userId,
      publishedAt: new Date(),
    });
    console.log('Created Why Ten Sparrows page');

    // ============================================
    // CONTACT PAGE
    // ============================================
    const contactHeroSection = await Section.create({
      name: 'Contact Hero',
      type: 'section',
      blocks: [
        {
          id: 'hero-contact',
          type: 'hero',
          content: {
            title: 'Start a Conversation',
            subtitle: 'Contact Us',
            description: 'Ready to explore how modern computing can serve your operations? We\'d love to hear from you.',
            alignment: 'center',
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#001a2b',
        padding: { top: '10rem', bottom: '6rem' },
      },
      settings: {
        fullWidth: true,
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const contactInfoSection = await Section.create({
      name: 'Contact Info',
      type: 'section',
      blocks: [
        {
          id: 'contact-info',
          type: 'custom',
          content: {
            html: `
              <div class="max-w-2xl mx-auto text-center">
                <div class="mb-8">
                  <h3 class="text-xl font-semibold mb-2">Email</h3>
                  <a href="mailto:info@tensparrows.com" class="text-[#e57368] text-lg hover:underline">info@tensparrows.com</a>
                </div>
                <div class="mb-8">
                  <h3 class="text-xl font-semibold mb-2">Location</h3>
                  <p class="text-lg text-zinc-600">Atlanta, GA 30318</p>
                </div>
                <p class="text-lg text-zinc-600">We typically respond within one business day.</p>
              </div>
            `,
          },
          order: 0,
        },
      ],
      style: {
        backgroundColor: '#fcfbf9',
        padding: { top: '6rem', bottom: '6rem' },
      },
      settings: {
        containerWidth: 'default',
      },
      createdBy: userId,
      updatedBy: userId,
    });

    const contactPage = await Page.create({
      title: 'Contact',
      slug: 'contact',
      description: 'Contact Ten Sparrows',
      metaTitle: 'Contact - Ten Sparrows',
      metaDescription: 'Get in touch with Ten Sparrows to discuss your edge computing and intelligent systems needs.',
      status: 'published',
      sections: [contactHeroSection._id, contactInfoSection._id],
      header: header._id,
      showInNavigation: false,
      order: 4,
      createdBy: userId,
      updatedBy: userId,
      publishedAt: new Date(),
    });
    console.log('Created Contact page');

    console.log('\n✅ Seed completed successfully!');
    console.log(`Created ${await Page.countDocuments()} pages`);
    console.log(`Created ${await Section.countDocuments()} sections`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
