'use client';

import type { ContentBlock, Section, SectionStyle, SectionSettings } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getComponent, type ComponentProps } from './ComponentRegistry';

// Individual block components
function HeadingBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const text = content.text as string || '';
  const level = (content.level as string) || 'h2';
  const alignment = (content.alignment as string) || 'left';
  const Tag = level as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  const sizeClasses: Record<string, string> = {
    h1: 'text-4xl md:text-5xl font-bold',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-semibold',
    h5: 'text-lg md:text-xl font-medium',
    h6: 'text-base md:text-lg font-medium',
  };

  return (
    <Tag
      className={cn(sizeClasses[level], `text-${alignment}`)}
      style={style as React.CSSProperties}
    >
      {text}
    </Tag>
  );
}

function TextBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const text = content.content as string || '';
  const alignment = (content.alignment as string) || 'left';

  return (
    <div
      className={cn('prose prose-zinc max-w-none', `text-${alignment}`)}
      style={style as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

function ButtonBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const text = content.text as string || 'Button';
  const href = content.href as string || '#';
  const variant = (content.variant as string) || 'default';

  const variantClasses: Record<string, string> = {
    default: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700',
    outline: 'border-2 border-amber-500 text-amber-600 hover:bg-amber-50',
    ghost: 'text-amber-600 hover:bg-amber-50',
  };

  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors',
        variantClasses[variant]
      )}
      style={style as React.CSSProperties}
    >
      {text}
    </a>
  );
}

function ImageBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const src = content.src as string || '';
  const alt = content.alt as string || '';
  const caption = content.caption as string;

  if (!src) return null;

  return (
    <figure style={style as React.CSSProperties}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg"
      />
      {caption && (
        <figcaption className="text-center text-sm text-zinc-500 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function HeroBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const title = content.title as string || '';
  const subtitle = content.subtitle as string;
  const description = content.description as string;
  const backgroundImage = content.backgroundImage as string;
  const alignment = (content.alignment as string) || 'center';
  const ctaButtons = content.ctaButtons as { text: string; href: string; variant?: string }[];

  return (
    <div
      className={cn(
        'relative min-h-[400px] flex items-center py-20',
        `text-${alignment}`
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...(style as React.CSSProperties),
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      <div className={cn('relative z-10 max-w-4xl mx-auto px-4', alignment === 'center' && 'text-center')}>
        {subtitle && (
          <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-600 rounded-full text-sm font-medium mb-4">
            {subtitle}
          </span>
        )}
        <h1 className={cn('text-4xl md:text-6xl font-bold mb-6', backgroundImage ? 'text-white' : 'text-zinc-900')}>
          {title}
        </h1>
        {description && (
          <p className={cn('text-xl mb-8', backgroundImage ? 'text-zinc-200' : 'text-zinc-600')}>
            {description}
          </p>
        )}
        {ctaButtons && ctaButtons.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {ctaButtons.map((btn, i) => (
              <ButtonBlock key={i} content={btn} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CTABlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const title = content.title as string || '';
  const description = content.description as string;
  const primaryButton = content.primaryButton as { text: string; href: string };
  const secondaryButton = content.secondaryButton as { text: string; href: string };
  const backgroundImage = content.backgroundImage as string;

  return (
    <div
      className="relative py-16 px-8 rounded-2xl overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: backgroundImage ? undefined : '#18181b',
        ...(style as React.CSSProperties),
      }}
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/60" />}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        {description && (
          <p className="text-lg text-zinc-300 mb-8">{description}</p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          {primaryButton && (
            <a
              href={primaryButton.href}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-700 transition-colors"
            >
              {primaryButton.text}
            </a>
          )}
          {secondaryButton && (
            <a
              href={secondaryButton.href}
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              {secondaryButton.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function CardBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const title = content.title as string || '';
  const description = content.description as string;
  const image = content.image as string;
  const link = content.link as string;
  const linkText = content.linkText as string || 'Learn more';

  const CardWrapper = link ? 'a' : 'div';

  return (
    <CardWrapper
      href={link}
      className={cn(
        'block p-6 bg-white rounded-xl border border-zinc-200 transition-shadow',
        link && 'hover:shadow-lg'
      )}
      style={style as React.CSSProperties}
    >
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
      )}
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">{title}</h3>
      {description && (
        <p className="text-zinc-600 mb-4">{description}</p>
      )}
      {link && (
        <span className="text-amber-600 font-medium">{linkText} &rarr;</span>
      )}
    </CardWrapper>
  );
}

function CardGridBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const cards = content.cards as { title: string; description?: string; image?: string; link?: string }[] || [];
  const columns = (content.columns as number) || 3;

  return (
    <div
      className={cn('grid gap-6', {
        'md:grid-cols-2': columns === 2,
        'md:grid-cols-3': columns === 3,
        'md:grid-cols-4': columns === 4,
      })}
      style={style as React.CSSProperties}
    >
      {cards.map((card, i) => (
        <CardBlock key={i} content={card} />
      ))}
    </div>
  );
}

function FeaturesBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const title = content.title as string;
  const subtitle = content.subtitle as string;
  const features = content.features as { icon?: string; title: string; description: string }[] || [];
  const columns = (content.columns as number) || 3;

  return (
    <div style={style as React.CSSProperties}>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {subtitle && (
            <span className="text-amber-600 font-medium">{subtitle}</span>
          )}
          {title && (
            <h2 className="text-3xl font-bold text-zinc-900 mt-2">{title}</h2>
          )}
        </div>
      )}
      <div
        className={cn('grid gap-8', {
          'md:grid-cols-2': columns === 2,
          'md:grid-cols-3': columns === 3,
          'md:grid-cols-4': columns === 4,
        })}
      >
        {features.map((feature, i) => (
          <div key={i} className="text-center">
            {feature.icon && (
              <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                {feature.icon}
              </div>
            )}
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">{feature.title}</h3>
            <p className="text-zinc-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DividerBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const dividerStyle = (content.style as string) || 'solid';
  const color = (content.color as string) || '#e4e4e7';
  const thickness = (content.thickness as string) || '1px';

  return (
    <hr
      className="my-8"
      style={{
        borderStyle: dividerStyle,
        borderColor: color,
        borderWidth: thickness,
        ...(style as React.CSSProperties),
      }}
    />
  );
}

function SpacerBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const height = (content.height as string) || '2rem';

  return (
    <div
      style={{
        height,
        ...(style as React.CSSProperties),
      }}
    />
  );
}

function VideoBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const src = content.src as string || '';
  const poster = content.poster as string;
  const controls = content.controls !== false;
  const autoplay = content.autoplay === true;
  const loop = content.loop === true;
  const muted = content.muted === true;

  if (!src) return null;

  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      className="w-full rounded-lg"
      style={style as React.CSSProperties}
    />
  );
}

function FAQBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const title = content.title as string;
  const items = content.items as { question: string; answer: string }[] || [];

  return (
    <div style={style as React.CSSProperties}>
      {title && (
        <h2 className="text-3xl font-bold text-zinc-900 text-center mb-8">{title}</h2>
      )}
      <div className="space-y-4 max-w-3xl mx-auto">
        {items.map((item, i) => (
          <details key={i} className="group bg-white border border-zinc-200 rounded-lg">
            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium">
              {item.question}
              <span className="ml-4 transition-transform group-open:rotate-180">
                &#9660;
              </span>
            </summary>
            <div className="px-4 pb-4 text-zinc-600">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function StatsBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const title = content.title as string;
  const stats = content.stats as { value: string; label: string; prefix?: string; suffix?: string }[] || [];
  const columns = (content.columns as number) || 4;

  return (
    <div style={style as React.CSSProperties}>
      {title && (
        <h2 className="text-3xl font-bold text-zinc-900 text-center mb-8">{title}</h2>
      )}
      <div
        className={cn('grid gap-8 text-center', {
          'md:grid-cols-2': columns === 2,
          'md:grid-cols-3': columns === 3,
          'md:grid-cols-4': columns === 4,
        })}
      >
        {stats.map((stat, i) => (
          <div key={i}>
            <div className="text-4xl md:text-5xl font-bold text-amber-600">
              {stat.prefix}{stat.value}{stat.suffix}
            </div>
            <div className="text-zinc-600 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const html = content.html as string || '';
  const css = content.css as string;

  return (
    <div style={style as React.CSSProperties}>
      {css && <style>{css}</style>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

// Component block - renders registered React components by name
function ComponentBlock({ content, style }: { content: Record<string, unknown>; style?: Record<string, unknown> }) {
  const componentName = content.component as string;
  const props = (content.props || {}) as ComponentProps;

  if (!componentName) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          Component block requires a component name
        </div>
      );
    }
    return null;
  }

  const Component = getComponent(componentName);

  if (!Component) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          Component &quot;{componentName}&quot; not found in registry
        </div>
      );
    }
    return null;
  }

  return <Component {...props} />;
}

// Block renderer map
const blockComponents: Record<string, React.FC<{ content: Record<string, unknown>; style?: Record<string, unknown> }>> = {
  heading: HeadingBlock,
  text: TextBlock,
  button: ButtonBlock,
  image: ImageBlock,
  hero: HeroBlock,
  cta: CTABlock,
  card: CardBlock,
  cardGrid: CardGridBlock,
  features: FeaturesBlock,
  divider: DividerBlock,
  spacer: SpacerBlock,
  video: VideoBlock,
  faq: FAQBlock,
  stats: StatsBlock,
  custom: CustomBlock,
  component: ComponentBlock,
};

// Main block renderer component
export function BlockRenderer({ block }: { block: ContentBlock }) {
  const Component = blockComponents[block.type];

  if (!Component) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          Block type &quot;{block.type}&quot; not implemented
        </div>
      );
    }
    return null;
  }

  return <Component content={block.content} style={block.style} />;
}

// Section renderer
export function SectionRenderer({ section }: { section: Section }) {
  const containerWidthClass: Record<string, string> = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  };

  const containerWidth = (section.settings?.containerWidth as string) || 'default';
  const fullWidth = section.settings?.fullWidth === true;
  const anchorId = section.settings?.anchorId as string;

  return (
    <section
      id={anchorId}
      style={{
        backgroundColor: section.style?.backgroundColor,
        backgroundImage: section.style?.backgroundImage
          ? `url(${section.style.backgroundImage})`
          : undefined,
        backgroundSize: section.style?.backgroundSize,
        backgroundPosition: section.style?.backgroundPosition,
        paddingTop: section.style?.padding?.top || '4rem',
        paddingBottom: section.style?.padding?.bottom || '4rem',
      }}
      className={section.style?.customClass}
    >
      <div
        className={cn(
          'mx-auto px-4',
          !fullWidth && containerWidthClass[containerWidth]
        )}
      >
        <div className="space-y-8">
          {section.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}
