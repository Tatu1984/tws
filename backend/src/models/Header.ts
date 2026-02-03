import mongoose, { Document, Schema, Types } from 'mongoose';

export interface INavItem {
  id: string;
  label: string;
  href: string;
  type: 'link' | 'dropdown' | 'button';
  children?: INavItem[];
  isExternal?: boolean;
  order: number;
}

export interface IHeader extends Document {
  name: string;
  isDefault: boolean;
  logo: {
    text?: string;
    image?: string;
    href?: string;
  };
  navigation: INavItem[];
  ctaButton?: {
    text: string;
    href: string;
    variant?: 'default' | 'outline' | 'ghost';
  };
  style: {
    backgroundColor?: string;
    textColor?: string;
    position?: 'static' | 'sticky' | 'fixed';
    transparent?: boolean;
    blurOnScroll?: boolean;
    customClass?: string;
    customCSS?: string;
  };
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const navItemSchema = new Schema<INavItem>(
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
    type: {
      type: String,
      enum: ['link', 'dropdown', 'button'],
      default: 'link',
    },
    children: [
      {
        id: String,
        label: String,
        href: String,
        type: {
          type: String,
          enum: ['link', 'dropdown', 'button'],
          default: 'link',
        },
        isExternal: Boolean,
        order: Number,
      },
    ],
    isExternal: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const headerSchema = new Schema<IHeader>(
  {
    name: {
      type: String,
      required: [true, 'Header name is required'],
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
    navigation: [navItemSchema],
    ctaButton: {
      text: String,
      href: String,
      variant: {
        type: String,
        enum: ['default', 'outline', 'ghost'],
        default: 'default',
      },
    },
    style: {
      backgroundColor: String,
      textColor: String,
      position: {
        type: String,
        enum: ['static', 'sticky', 'fixed'],
        default: 'fixed',
      },
      transparent: {
        type: Boolean,
        default: false,
      },
      blurOnScroll: {
        type: Boolean,
        default: true,
      },
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

// Ensure only one default header
headerSchema.pre('save', async function (next) {
  if (this.isDefault && this.isModified('isDefault')) {
    await mongoose.model('Header').updateMany(
      { _id: { $ne: this._id }, isDefault: true },
      { isDefault: false }
    );
  }
  next();
});

export const Header = mongoose.model<IHeader>('Header', headerSchema);
