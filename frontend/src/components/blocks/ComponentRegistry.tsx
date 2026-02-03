'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Shared Section Components
import { Hero } from '@/components/sections/Hero';
import { HighlightsSection } from '@/components/sections/HighlightsSection';
import { CloudSection } from '@/components/sections/CloudSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TargetAudienceSection } from '@/components/sections/TargetAudienceSection';
import { CTASection } from '@/components/sections/CTASection';
import { ValuesSection } from '@/components/sections/ValuesSection';
import { ContactForm } from '@/components/sections/ContactForm';

// About Page Components
import { AboutHero } from '@/app/about/AboutHero';
import { AboutSection } from '@/app/about/AboutSection';
import { VisionMissionSection } from '@/app/about/VisionMissionSection';

// What We Do Page Components
import { WhatWeDoHero } from '@/app/what-we-do/WhatWeDoHero';
import { CapabilitiesSection } from '@/app/what-we-do/CapabilitiesSection';
import { DetailedServicesSection } from '@/app/what-we-do/DetailedServicesSection';
import { EngagementSection } from '@/app/what-we-do/EngagementSection';

// Why Ten Sparrows Page Components
import { WhyHero } from '@/app/why-ten-sparrows/WhyHero';
import { DifferentiatorsSection } from '@/app/why-ten-sparrows/DifferentiatorsSection';
import { ApproachSection } from '@/app/why-ten-sparrows/ApproachSection';

// Contact Page Components
import { ContactHero } from '@/app/contact/ContactHero';

// Component props interface - all components can receive optional props
export interface ComponentProps {
  // CTASection props
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  // Hero props
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  // Generic props
  items?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  [key: string]: unknown;
}

// Component registry mapping component names to actual components
export const componentRegistry: Record<string, ComponentType<ComponentProps>> = {
  // Home page sections
  'Hero': Hero as ComponentType<ComponentProps>,
  'HighlightsSection': HighlightsSection as ComponentType<ComponentProps>,
  'CloudSection': CloudSection as ComponentType<ComponentProps>,
  'ProblemSection': ProblemSection as ComponentType<ComponentProps>,
  'SolutionSection': SolutionSection as ComponentType<ComponentProps>,
  'ServicesSection': ServicesSection as ComponentType<ComponentProps>,
  'TargetAudienceSection': TargetAudienceSection as ComponentType<ComponentProps>,
  'CTASection': CTASection as ComponentType<ComponentProps>,
  'ValuesSection': ValuesSection as ComponentType<ComponentProps>,
  'ContactForm': ContactForm as ComponentType<ComponentProps>,

  // About page sections
  'AboutHero': AboutHero as ComponentType<ComponentProps>,
  'AboutSection': AboutSection as ComponentType<ComponentProps>,
  'VisionMissionSection': VisionMissionSection as ComponentType<ComponentProps>,

  // What We Do page sections
  'WhatWeDoHero': WhatWeDoHero as ComponentType<ComponentProps>,
  'CapabilitiesSection': CapabilitiesSection as ComponentType<ComponentProps>,
  'DetailedServicesSection': DetailedServicesSection as ComponentType<ComponentProps>,
  'EngagementSection': EngagementSection as ComponentType<ComponentProps>,

  // Why Ten Sparrows page sections
  'WhyHero': WhyHero as ComponentType<ComponentProps>,
  'DifferentiatorsSection': DifferentiatorsSection as ComponentType<ComponentProps>,
  'ApproachSection': ApproachSection as ComponentType<ComponentProps>,

  // Contact page sections
  'ContactHero': ContactHero as ComponentType<ComponentProps>,
};

// Get all available component names
export function getAvailableComponents(): string[] {
  return Object.keys(componentRegistry);
}

// Get a component by name
export function getComponent(name: string): ComponentType<ComponentProps> | null {
  return componentRegistry[name] || null;
}

// Component metadata for admin UI
export interface ComponentMeta {
  name: string;
  displayName: string;
  category: 'hero' | 'content' | 'cta' | 'form' | 'features';
  description: string;
  editableProps: Array<{
    name: string;
    type: 'string' | 'text' | 'url' | 'array';
    label: string;
    defaultValue?: unknown;
  }>;
}

export const componentMeta: Record<string, ComponentMeta> = {
  'Hero': {
    name: 'Hero',
    displayName: 'Home Hero',
    category: 'hero',
    description: 'Main hero section for the home page with animated text',
    editableProps: [],
  },
  'HighlightsSection': {
    name: 'HighlightsSection',
    displayName: 'Highlights (3 Column)',
    category: 'features',
    description: 'Three column highlights with icons',
    editableProps: [],
  },
  'CloudSection': {
    name: 'CloudSection',
    displayName: 'Cloud Section',
    category: 'content',
    description: 'Section about cloud limitations',
    editableProps: [],
  },
  'ProblemSection': {
    name: 'ProblemSection',
    displayName: 'Problem Section',
    category: 'content',
    description: 'Two column section describing the problem',
    editableProps: [],
  },
  'SolutionSection': {
    name: 'SolutionSection',
    displayName: 'Solution Section',
    category: 'content',
    description: 'Two column section describing the solution',
    editableProps: [],
  },
  'ServicesSection': {
    name: 'ServicesSection',
    displayName: 'Services Section',
    category: 'features',
    description: 'What we deliver section with checklist',
    editableProps: [],
  },
  'TargetAudienceSection': {
    name: 'TargetAudienceSection',
    displayName: 'Target Audience Section',
    category: 'content',
    description: 'Who we work with section',
    editableProps: [],
  },
  'CTASection': {
    name: 'CTASection',
    displayName: 'Call to Action',
    category: 'cta',
    description: 'Call to action section with customizable text',
    editableProps: [
      { name: 'title', type: 'string', label: 'Title', defaultValue: 'Start a conversation' },
      { name: 'description', type: 'text', label: 'Description', defaultValue: "If you're exploring how to modernize systems without compromising control or reliability, we're happy to talk." },
      { name: 'ctaText', type: 'string', label: 'Button Text', defaultValue: 'Start a Conversation' },
      { name: 'ctaLink', type: 'url', label: 'Button Link', defaultValue: '/contact' },
    ],
  },
  'ValuesSection': {
    name: 'ValuesSection',
    displayName: 'Values Section',
    category: 'features',
    description: 'Guiding principles section with 4 cards',
    editableProps: [],
  },
  'ContactForm': {
    name: 'ContactForm',
    displayName: 'Contact Form',
    category: 'form',
    description: 'Contact form with booking option',
    editableProps: [],
  },
  'AboutHero': {
    name: 'AboutHero',
    displayName: 'About Hero',
    category: 'hero',
    description: 'Hero section for About page',
    editableProps: [],
  },
  'AboutSection': {
    name: 'AboutSection',
    displayName: 'About Content',
    category: 'content',
    description: 'Main about content paragraphs',
    editableProps: [],
  },
  'VisionMissionSection': {
    name: 'VisionMissionSection',
    displayName: 'Vision & Mission',
    category: 'features',
    description: 'Two card section for vision and mission',
    editableProps: [],
  },
  'WhatWeDoHero': {
    name: 'WhatWeDoHero',
    displayName: 'What We Do Hero',
    category: 'hero',
    description: 'Hero section for What We Do page',
    editableProps: [],
  },
  'CapabilitiesSection': {
    name: 'CapabilitiesSection',
    displayName: 'Capabilities Section',
    category: 'content',
    description: 'Data growth context with industries list',
    editableProps: [],
  },
  'DetailedServicesSection': {
    name: 'DetailedServicesSection',
    displayName: 'Detailed Services',
    category: 'features',
    description: 'Core capabilities with challenge/solution format',
    editableProps: [],
  },
  'EngagementSection': {
    name: 'EngagementSection',
    displayName: 'Engagement Process',
    category: 'features',
    description: 'How we work - 4 step process',
    editableProps: [],
  },
  'WhyHero': {
    name: 'WhyHero',
    displayName: 'Why Ten Sparrows Hero',
    category: 'hero',
    description: 'Hero section for Why Ten Sparrows page',
    editableProps: [],
  },
  'DifferentiatorsSection': {
    name: 'DifferentiatorsSection',
    displayName: 'Differentiators Section',
    category: 'features',
    description: 'What sets us apart - 6 card grid',
    editableProps: [],
  },
  'ApproachSection': {
    name: 'ApproachSection',
    displayName: 'Approach Comparison',
    category: 'content',
    description: 'Us vs Others comparison table',
    editableProps: [],
  },
  'ContactHero': {
    name: 'ContactHero',
    displayName: 'Contact Hero',
    category: 'hero',
    description: 'Hero section for Contact page',
    editableProps: [],
  },
};
