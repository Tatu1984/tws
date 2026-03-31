// ============================================================================
// TSW CMS TypeScript Types
// Mirrors backend models for type safety
// ============================================================================

// ============================================================================
// User Types
// ============================================================================

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ============================================================================
// Block Types
// ============================================================================

export type BlockType =
  | 'hero'
  | 'text'
  | 'heading'
  | 'image'
  | 'video'
  | 'button'
  | 'card'
  | 'cardGrid'
  | 'features'
  | 'testimonials'
  | 'cta'
  | 'contact-form'
  | 'faq'
  | 'pricing'
  | 'team'
  | 'gallery'
  | 'stats'
  | 'timeline'
  | 'tabs'
  | 'accordion'
  | 'divider'
  | 'spacer'
  | 'columns'
  | 'custom'
  | 'component'; // Renders registered React components by name

export interface BlockAnimation {
  type: string;
  duration?: number;
  delay?: number;
}

export interface BlockResponsive {
  mobile?: Record<string, unknown>;
  tablet?: Record<string, unknown>;
  desktop?: Record<string, unknown>;
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: Record<string, unknown>;
  style?: Record<string, unknown>;
  animation?: BlockAnimation;
  responsive?: BlockResponsive;
  order: number;
}

// ============================================================================
// Section Types
// ============================================================================

export type SectionType = 'section' | 'reusable';
export type ContainerWidth = 'narrow' | 'default' | 'wide' | 'full';
export type VerticalAlignment = 'top' | 'center' | 'bottom';

export interface SectionPadding {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface SectionMargin {
  top?: string;
  bottom?: string;
}

export interface SectionStyle {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  padding?: SectionPadding;
  margin?: SectionMargin;
  maxWidth?: string;
  customClass?: string;
  customCSS?: string;
}

export interface SectionSettings {
  fullWidth?: boolean;
  containerWidth?: ContainerWidth;
  verticalAlignment?: VerticalAlignment;
  animation?: string;
  anchorId?: string;
}

export interface Section {
  _id: string;
  name: string;
  type: SectionType;
  blocks: ContentBlock[];
  style: SectionStyle;
  settings: SectionSettings;
  isGlobal: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSectionData {
  name: string;
  type?: SectionType;
  blocks?: ContentBlock[];
  style?: SectionStyle;
  settings?: SectionSettings;
  isGlobal?: boolean;
}

export interface UpdateSectionData extends Partial<CreateSectionData> {}

// ============================================================================
// Page Types
// ============================================================================

export type PageStatus = 'draft' | 'published' | 'archived';

export interface Page {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  status: PageStatus;
  template: string;
  sections: Section[] | string[];
  header?: string;
  footer?: string;
  order: number;
  showInNavigation: boolean;
  navigationLabel?: string;
  isHomePage: boolean;
  customCSS?: string;
  customJS?: string;
  createdBy: string;
  updatedBy: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageWithPopulatedSections extends Omit<Page, 'sections'> {
  sections: Section[];
}

export interface CreatePageData {
  title: string;
  slug?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  status?: PageStatus;
  template?: string;
  header?: string;
  footer?: string;
  order?: number;
  showInNavigation?: boolean;
  navigationLabel?: string;
  isHomePage?: boolean;
  customCSS?: string;
  customJS?: string;
}

export interface UpdatePageData extends Partial<CreatePageData> {}

// ============================================================================
// Header Types
// ============================================================================

export type NavItemType = 'link' | 'dropdown' | 'button';
export type HeaderPosition = 'static' | 'sticky' | 'fixed';
export type ButtonVariant = 'default' | 'outline' | 'ghost';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  type: NavItemType;
  children?: NavItem[];
  isExternal?: boolean;
  order: number;
}

export interface HeaderLogo {
  text?: string;
  image?: string;
  href?: string;
}

export interface HeaderCTAButton {
  text: string;
  href: string;
  variant?: ButtonVariant;
}

export interface HeaderStyle {
  backgroundColor?: string;
  textColor?: string;
  position?: HeaderPosition;
  transparent?: boolean;
  blurOnScroll?: boolean;
  customClass?: string;
  customCSS?: string;
}

export interface Header {
  _id: string;
  name: string;
  isDefault: boolean;
  logo: HeaderLogo;
  navigation: NavItem[];
  ctaButton?: HeaderCTAButton;
  style: HeaderStyle;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHeaderData {
  name: string;
  isDefault?: boolean;
  logo?: HeaderLogo;
  navigation?: NavItem[];
  ctaButton?: HeaderCTAButton;
  style?: HeaderStyle;
}

export interface UpdateHeaderData extends Partial<CreateHeaderData> {}

// ============================================================================
// Footer Types
// ============================================================================

export type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'github' | 'other';

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
  order: number;
}

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  href: string;
  icon?: string;
}

export interface FooterLogo {
  text?: string;
  image?: string;
  href?: string;
}

export interface FooterContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface FooterBottomBar {
  copyright?: string;
  links?: FooterLink[];
}

export interface FooterStyle {
  backgroundColor?: string;
  textColor?: string;
  customClass?: string;
  customCSS?: string;
}

export interface Footer {
  _id: string;
  name: string;
  isDefault: boolean;
  logo: FooterLogo;
  description?: string;
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  contactInfo: FooterContactInfo;
  bottomBar: FooterBottomBar;
  style: FooterStyle;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFooterData {
  name: string;
  isDefault?: boolean;
  logo?: FooterLogo;
  description?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  contactInfo?: FooterContactInfo;
  bottomBar?: FooterBottomBar;
  style?: FooterStyle;
}

export interface UpdateFooterData extends Partial<CreateFooterData> {}

// ============================================================================
// Media Types
// ============================================================================

export interface Media {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  path: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  folder?: string;
  tags?: string[];
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadMediaData {
  file: File;
  alt?: string;
  caption?: string;
  folder?: string;
  tags?: string[];
}

export interface UpdateMediaData {
  alt?: string;
  caption?: string;
  folder?: string;
  tags?: string[];
}

// ============================================================================
// Site Settings Types
// ============================================================================

export interface SiteSettingsLogo {
  main?: string;
  favicon?: string;
  ogImage?: string;
}

export interface SiteSettingsSEO {
  defaultTitle?: string;
  titleSuffix?: string;
  defaultDescription?: string;
  defaultKeywords?: string[];
}

export interface SiteSettingsColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  foreground?: string;
}

export interface SiteSettingsTypography {
  headingFont?: string;
  bodyFont?: string;
}

export interface SiteSettingsSocial {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface SiteSettingsContact {
  email?: string;
  phone?: string;
  address?: string;
}

export interface SiteSettingsAnalytics {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
}

export interface SiteSettingsCustomCode {
  headScripts?: string;
  bodyStartScripts?: string;
  bodyEndScripts?: string;
}

export interface SiteSettingsMaintenance {
  enabled: boolean;
  message?: string;
  allowedIPs?: string[];
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  siteDescription?: string;
  logo?: SiteSettingsLogo;
  seo: SiteSettingsSEO;
  colors: SiteSettingsColors;
  typography: SiteSettingsTypography;
  social: SiteSettingsSocial;
  contact: SiteSettingsContact;
  analytics: SiteSettingsAnalytics;
  customCode: SiteSettingsCustomCode;
  maintenance: SiteSettingsMaintenance;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSiteSettingsData extends Partial<Omit<SiteSettings, '_id' | 'createdAt' | 'updatedAt' | 'updatedBy'>> {}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// ============================================================================
// Block Content Types (specific content schemas for each block type)
// ============================================================================

export interface HeroBlockContent {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaButtons?: {
    text: string;
    href: string;
    variant?: ButtonVariant;
  }[];
  alignment?: 'left' | 'center' | 'right';
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

export interface TextBlockContent {
  content: string; // HTML content from rich text editor
  alignment?: 'left' | 'center' | 'right' | 'justify';
}

export interface HeadingBlockContent {
  text: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  alignment?: 'left' | 'center' | 'right';
}

export interface ImageBlockContent {
  src: string;
  alt: string;
  caption?: string;
  link?: string;
  width?: string;
  height?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export interface VideoBlockContent {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export interface ButtonBlockContent {
  text: string;
  href: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'default' | 'lg';
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export interface CardBlockContent {
  title: string;
  description?: string;
  image?: string;
  link?: string;
  linkText?: string;
}

export interface CardGridBlockContent {
  cards: CardBlockContent[];
  columns?: 2 | 3 | 4;
}

export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

export interface FeaturesBlockContent {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
}

export interface TestimonialsBlockContent {
  title?: string;
  testimonials: Testimonial[];
  layout?: 'grid' | 'carousel';
}

export interface CTABlockContent {
  title: string;
  description?: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

export interface ContactFormBlockContent {
  title?: string;
  description?: string;
  fields: {
    name: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string[]; // For select type
  }[];
  submitText?: string;
  successMessage?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlockContent {
  title?: string;
  items: FAQItem[];
}

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  ctaText?: string;
  ctaHref?: string;
  highlighted?: boolean;
}

export interface PricingBlockContent {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TeamBlockContent {
  title?: string;
  subtitle?: string;
  members: TeamMember[];
  columns?: 2 | 3 | 4;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryBlockContent {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: string;
  lightbox?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface StatsBlockContent {
  title?: string;
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon?: string;
}

export interface TimelineBlockContent {
  title?: string;
  items: TimelineItem[];
  layout?: 'vertical' | 'horizontal';
}

export interface TabItem {
  id: string;
  label: string;
  content: string; // HTML content
}

export interface TabsBlockContent {
  tabs: TabItem[];
  defaultTab?: string;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string; // HTML content
}

export interface AccordionBlockContent {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export interface DividerBlockContent {
  style?: 'solid' | 'dashed' | 'dotted';
  color?: string;
  thickness?: string;
  width?: string;
}

export interface SpacerBlockContent {
  height: string;
  mobileHeight?: string;
}

export interface ColumnsBlockContent {
  columns: {
    id: string;
    width: string;
    blocks: ContentBlock[];
  }[];
  gap?: string;
  verticalAlignment?: VerticalAlignment;
}

export interface CustomBlockContent {
  html?: string;
  css?: string;
  js?: string;
}

// ============================================================================
// Block Definitions for Builder Palette
// ============================================================================

export interface BlockDefinition {
  type: BlockType;
  label: string;
  icon: string;
  category: 'layout' | 'content' | 'media' | 'interactive' | 'advanced';
  description: string;
  defaultContent: Record<string, unknown>;
}

export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  // Layout blocks
  {
    type: 'hero',
    label: 'Hero',
    icon: 'Layout',
    category: 'layout',
    description: 'Large hero section with title, subtitle, and CTA',
    defaultContent: {
      title: 'Welcome to Our Site',
      subtitle: 'Tagline here',
      description: 'A brief description of what you offer.',
      alignment: 'center',
    },
  },
  {
    type: 'columns',
    label: 'Columns',
    icon: 'Columns',
    category: 'layout',
    description: 'Multi-column layout container',
    defaultContent: {
      columns: [
        { id: '1', width: '50%', blocks: [] },
        { id: '2', width: '50%', blocks: [] },
      ],
      gap: '2rem',
    },
  },
  {
    type: 'spacer',
    label: 'Spacer',
    icon: 'SeparatorHorizontal',
    category: 'layout',
    description: 'Add vertical spacing',
    defaultContent: { height: '4rem' },
  },
  {
    type: 'divider',
    label: 'Divider',
    icon: 'Minus',
    category: 'layout',
    description: 'Horizontal divider line',
    defaultContent: { style: 'solid', thickness: '1px' },
  },

  // Content blocks
  {
    type: 'heading',
    label: 'Heading',
    icon: 'Heading',
    category: 'content',
    description: 'Text heading (H1-H6)',
    defaultContent: { text: 'Heading', level: 'h2', alignment: 'left' },
  },
  {
    type: 'text',
    label: 'Text',
    icon: 'Type',
    category: 'content',
    description: 'Rich text content',
    defaultContent: { content: '<p>Enter your text here...</p>', alignment: 'left' },
  },
  {
    type: 'button',
    label: 'Button',
    icon: 'MousePointer',
    category: 'content',
    description: 'Call-to-action button',
    defaultContent: { text: 'Click Me', href: '#', variant: 'default' },
  },
  {
    type: 'card',
    label: 'Card',
    icon: 'Square',
    category: 'content',
    description: 'Content card with image',
    defaultContent: { title: 'Card Title', description: 'Card description here.' },
  },
  {
    type: 'cardGrid',
    label: 'Card Grid',
    icon: 'LayoutGrid',
    category: 'content',
    description: 'Grid of content cards',
    defaultContent: {
      cards: [
        { title: 'Card 1', description: 'Description 1' },
        { title: 'Card 2', description: 'Description 2' },
        { title: 'Card 3', description: 'Description 3' },
      ],
      columns: 3,
    },
  },

  // Media blocks
  {
    type: 'image',
    label: 'Image',
    icon: 'Image',
    category: 'media',
    description: 'Single image with optional caption',
    defaultContent: { src: '', alt: 'Image description' },
  },
  {
    type: 'video',
    label: 'Video',
    icon: 'Video',
    category: 'media',
    description: 'Video player',
    defaultContent: { src: '', controls: true },
  },
  {
    type: 'gallery',
    label: 'Gallery',
    icon: 'Images',
    category: 'media',
    description: 'Image gallery grid',
    defaultContent: { images: [], columns: 3 },
  },

  // Interactive blocks
  {
    type: 'features',
    label: 'Features',
    icon: 'Star',
    category: 'interactive',
    description: 'Feature highlights grid',
    defaultContent: {
      features: [
        { title: 'Feature 1', description: 'Description 1', icon: 'Star' },
        { title: 'Feature 2', description: 'Description 2', icon: 'Zap' },
        { title: 'Feature 3', description: 'Description 3', icon: 'Shield' },
      ],
      columns: 3,
    },
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    icon: 'Quote',
    category: 'interactive',
    description: 'Customer testimonials',
    defaultContent: {
      testimonials: [
        { quote: 'Great service!', author: 'John Doe', role: 'CEO' },
      ],
      layout: 'grid',
    },
  },
  {
    type: 'cta',
    label: 'CTA Section',
    icon: 'Megaphone',
    category: 'interactive',
    description: 'Call-to-action section',
    defaultContent: {
      title: 'Ready to get started?',
      description: 'Join us today.',
      primaryButton: { text: 'Get Started', href: '#' },
    },
  },
  {
    type: 'contact-form',
    label: 'Contact Form',
    icon: 'Mail',
    category: 'interactive',
    description: 'Contact form with fields',
    defaultContent: {
      title: 'Contact Us',
      fields: [
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'message', type: 'textarea', label: 'Message', required: true },
      ],
      submitText: 'Send Message',
    },
  },
  {
    type: 'faq',
    label: 'FAQ',
    icon: 'HelpCircle',
    category: 'interactive',
    description: 'Frequently asked questions',
    defaultContent: {
      items: [
        { question: 'Question 1?', answer: 'Answer 1.' },
        { question: 'Question 2?', answer: 'Answer 2.' },
      ],
    },
  },
  {
    type: 'pricing',
    label: 'Pricing',
    icon: 'DollarSign',
    category: 'interactive',
    description: 'Pricing tiers table',
    defaultContent: {
      tiers: [
        {
          name: 'Basic',
          price: '$9',
          period: '/month',
          features: ['Feature 1', 'Feature 2'],
        },
        {
          name: 'Pro',
          price: '$29',
          period: '/month',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          highlighted: true,
        },
      ],
    },
  },
  {
    type: 'team',
    label: 'Team',
    icon: 'Users',
    category: 'interactive',
    description: 'Team members grid',
    defaultContent: {
      members: [
        { name: 'John Doe', role: 'CEO' },
        { name: 'Jane Smith', role: 'CTO' },
      ],
      columns: 4,
    },
  },
  {
    type: 'stats',
    label: 'Stats',
    icon: 'BarChart',
    category: 'interactive',
    description: 'Statistics counters',
    defaultContent: {
      stats: [
        { value: '100', label: 'Customers', suffix: '+' },
        { value: '50', label: 'Projects', suffix: '+' },
      ],
    },
  },
  {
    type: 'timeline',
    label: 'Timeline',
    icon: 'GitBranch',
    category: 'interactive',
    description: 'Vertical timeline',
    defaultContent: {
      items: [
        { date: '2024', title: 'Event 1', description: 'Description 1' },
        { date: '2023', title: 'Event 2', description: 'Description 2' },
      ],
    },
  },
  {
    type: 'tabs',
    label: 'Tabs',
    icon: 'Layers',
    category: 'interactive',
    description: 'Tabbed content',
    defaultContent: {
      tabs: [
        { id: '1', label: 'Tab 1', content: '<p>Tab 1 content</p>' },
        { id: '2', label: 'Tab 2', content: '<p>Tab 2 content</p>' },
      ],
    },
  },
  {
    type: 'accordion',
    label: 'Accordion',
    icon: 'ChevronDown',
    category: 'interactive',
    description: 'Collapsible sections',
    defaultContent: {
      items: [
        { id: '1', title: 'Section 1', content: '<p>Content 1</p>' },
        { id: '2', title: 'Section 2', content: '<p>Content 2</p>' },
      ],
    },
  },

  // Advanced blocks
  {
    type: 'custom',
    label: 'Custom HTML',
    icon: 'Code',
    category: 'advanced',
    description: 'Custom HTML/CSS/JS',
    defaultContent: { html: '<div>Custom content</div>' },
  },
  {
    type: 'component',
    label: 'Component',
    icon: 'Code',
    category: 'advanced',
    description: 'Render a registered React component',
    defaultContent: { component: '', props: {} },
  },
];
