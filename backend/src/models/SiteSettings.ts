import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISiteSettings extends Document {
  siteName: string;
  siteDescription?: string;
  logo?: {
    main?: string;
    favicon?: string;
    ogImage?: string;
  };
  seo: {
    defaultTitle?: string;
    titleSuffix?: string;
    defaultDescription?: string;
    defaultKeywords?: string[];
  };
  colors: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    foreground?: string;
  };
  typography: {
    headingFont?: string;
    bodyFont?: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  contact: {
    email?: string;
    phone?: string;
    address?: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
  };
  customCode: {
    headScripts?: string;
    bodyStartScripts?: string;
    bodyEndScripts?: string;
  };
  maintenance: {
    enabled: boolean;
    message?: string;
    allowedIPs?: string[];
  };
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteName: {
      type: String,
      required: [true, 'Site name is required'],
      default: 'Ten Sparrows',
    },
    siteDescription: {
      type: String,
    },
    logo: {
      main: String,
      favicon: String,
      ogImage: String,
    },
    seo: {
      defaultTitle: String,
      titleSuffix: {
        type: String,
        default: ' | Ten Sparrows',
      },
      defaultDescription: String,
      defaultKeywords: [String],
    },
    colors: {
      primary: String,
      secondary: String,
      accent: String,
      background: String,
      foreground: String,
    },
    typography: {
      headingFont: String,
      bodyFont: String,
    },
    social: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
      youtube: String,
    },
    contact: {
      email: String,
      phone: String,
      address: String,
    },
    analytics: {
      googleAnalyticsId: String,
      googleTagManagerId: String,
    },
    customCode: {
      headScripts: String,
      bodyStartScripts: String,
      bodyEndScripts: String,
    },
    maintenance: {
      enabled: {
        type: Boolean,
        default: false,
      },
      message: String,
      allowedIPs: [String],
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document exists
siteSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      siteName: 'Ten Sparrows',
      seo: {
        defaultTitle: 'Modern Computing for Real-World Operations',
        titleSuffix: ' | Ten Sparrows',
        defaultDescription: 'We design local computing environments and intelligent systems for organizations where performance, reliability, and control matter.',
      },
    });
  }
  return settings;
};

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
