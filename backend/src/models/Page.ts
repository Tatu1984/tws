import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPage extends Document {
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  status: 'draft' | 'published' | 'archived';
  template: string;
  sections: Types.ObjectId[];
  header?: Types.ObjectId;
  footer?: Types.ObjectId;
  order: number;
  showInNavigation: boolean;
  navigationLabel?: string;
  isHomePage: boolean;
  customCSS?: string;
  customJS?: string;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const pageSchema = new Schema<IPage>(
  {
    title: {
      type: String,
      required: [true, 'Page title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Page slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description should not exceed 160 characters'],
    },
    metaKeywords: [{
      type: String,
      trim: true,
    }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    template: {
      type: String,
      default: 'default',
    },
    sections: [{
      type: Schema.Types.ObjectId,
      ref: 'Section',
    }],
    header: {
      type: Schema.Types.ObjectId,
      ref: 'Header',
    },
    footer: {
      type: Schema.Types.ObjectId,
      ref: 'Footer',
    },
    order: {
      type: Number,
      default: 0,
    },
    showInNavigation: {
      type: Boolean,
      default: true,
    },
    navigationLabel: {
      type: String,
      trim: true,
    },
    isHomePage: {
      type: Boolean,
      default: false,
    },
    customCSS: {
      type: String,
    },
    customJS: {
      type: String,
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
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one home page
pageSchema.pre('save', async function (next) {
  if (this.isHomePage && this.isModified('isHomePage')) {
    await mongoose.model('Page').updateMany(
      { _id: { $ne: this._id }, isHomePage: true },
      { isHomePage: false }
    );
  }
  next();
});

// Generate slug from title if not provided
pageSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  if (!this.navigationLabel) {
    this.navigationLabel = this.title;
  }
  next();
});

// Index for efficient queries
pageSchema.index({ slug: 1 });
pageSchema.index({ status: 1, order: 1 });
pageSchema.index({ showInNavigation: 1, order: 1 });

export const Page = mongoose.model<IPage>('Page', pageSchema);
