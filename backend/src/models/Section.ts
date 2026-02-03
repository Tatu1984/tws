import mongoose, { Document, Schema, Types } from 'mongoose';

// Content block types that can be used in sections
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
  | 'custom';

export interface IContentBlock {
  id: string;
  type: BlockType;
  content: Record<string, unknown>;
  style?: Record<string, unknown>;
  animation?: {
    type: string;
    duration?: number;
    delay?: number;
  };
  responsive?: {
    mobile?: Record<string, unknown>;
    tablet?: Record<string, unknown>;
    desktop?: Record<string, unknown>;
  };
  order: number;
}

export interface ISection extends Document {
  name: string;
  type: 'section' | 'reusable';
  blocks: IContentBlock[];
  style: {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    padding?: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    };
    margin?: {
      top?: string;
      bottom?: string;
    };
    maxWidth?: string;
    customClass?: string;
    customCSS?: string;
  };
  settings: {
    fullWidth?: boolean;
    containerWidth?: 'narrow' | 'default' | 'wide' | 'full';
    verticalAlignment?: 'top' | 'center' | 'bottom';
    animation?: string;
    anchorId?: string;
  };
  isGlobal: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const contentBlockSchema = new Schema<IContentBlock>(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'hero',
        'text',
        'heading',
        'image',
        'video',
        'button',
        'card',
        'cardGrid',
        'features',
        'testimonials',
        'cta',
        'contact-form',
        'faq',
        'pricing',
        'team',
        'gallery',
        'stats',
        'timeline',
        'tabs',
        'accordion',
        'divider',
        'spacer',
        'columns',
        'custom',
      ],
    },
    content: {
      type: Schema.Types.Mixed,
      default: {},
    },
    style: {
      type: Schema.Types.Mixed,
      default: {},
    },
    animation: {
      type: {
        type: String,
      },
      duration: Number,
      delay: Number,
    },
    responsive: {
      mobile: Schema.Types.Mixed,
      tablet: Schema.Types.Mixed,
      desktop: Schema.Types.Mixed,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const sectionSchema = new Schema<ISection>(
  {
    name: {
      type: String,
      required: [true, 'Section name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['section', 'reusable'],
      default: 'section',
    },
    blocks: [contentBlockSchema],
    style: {
      backgroundColor: String,
      backgroundImage: String,
      backgroundSize: String,
      backgroundPosition: String,
      padding: {
        top: String,
        bottom: String,
        left: String,
        right: String,
      },
      margin: {
        top: String,
        bottom: String,
      },
      maxWidth: String,
      customClass: String,
      customCSS: String,
    },
    settings: {
      fullWidth: {
        type: Boolean,
        default: false,
      },
      containerWidth: {
        type: String,
        enum: ['narrow', 'default', 'wide', 'full'],
        default: 'default',
      },
      verticalAlignment: {
        type: String,
        enum: ['top', 'center', 'bottom'],
        default: 'top',
      },
      animation: String,
      anchorId: String,
    },
    isGlobal: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
sectionSchema.index({ type: 1 });
sectionSchema.index({ isGlobal: 1 });

export const Section = mongoose.model<ISection>('Section', sectionSchema);
