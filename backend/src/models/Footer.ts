import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFooterLink {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface IFooterColumn {
  id: string;
  title: string;
  links: IFooterLink[];
  order: number;
}

export interface ISocialLink {
  id: string;
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'github' | 'other';
  href: string;
  icon?: string;
}

export interface IFooter extends Document {
  name: string;
  isDefault: boolean;
  logo: {
    text?: string;
    image?: string;
    href?: string;
  };
  description?: string;
  columns: IFooterColumn[];
  socialLinks: ISocialLink[];
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  };
  bottomBar: {
    copyright?: string;
    links?: IFooterLink[];
  };
  style: {
    backgroundColor?: string;
    textColor?: string;
    customClass?: string;
    customCSS?: string;
  };
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const footerLinkSchema = new Schema<IFooterLink>(
  {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    href: {
      type: String,
      required: true,
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const footerColumnSchema = new Schema<IFooterColumn>(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    links: [footerLinkSchema],
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const socialLinkSchema = new Schema<ISocialLink>(
  {
    id: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'github', 'other'],
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    icon: String,
  },
  { _id: false }
);

const footerSchema = new Schema<IFooter>(
  {
    name: {
      type: String,
      required: [true, 'Footer name is required'],
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    logo: {
      text: String,
      image: String,
      href: {
        type: String,
        default: '/',
      },
    },
    description: {
      type: String,
      trim: true,
    },
    columns: [footerColumnSchema],
    socialLinks: [socialLinkSchema],
    contactInfo: {
      email: String,
      phone: String,
      address: String,
    },
    bottomBar: {
      copyright: String,
      links: [footerLinkSchema],
    },
    style: {
      backgroundColor: String,
      textColor: String,
      customClass: String,
      customCSS: String,
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

// Ensure only one default footer
footerSchema.pre('save', async function (next) {
  if (this.isDefault && this.isModified('isDefault')) {
    await mongoose.model('Footer').updateMany(
      { _id: { $ne: this._id }, isDefault: true },
      { isDefault: false }
    );
  }
  next();
});

export const Footer = mongoose.model<IFooter>('Footer', footerSchema);
