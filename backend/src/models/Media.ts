import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMedia extends Document {
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
  uploadedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    filename: {
      type: String,
      required: [true, 'Filename is required'],
    },
    originalName: {
      type: String,
      required: [true, 'Original filename is required'],
    },
    mimeType: {
      type: String,
      required: [true, 'MIME type is required'],
    },
    size: {
      type: Number,
      required: [true, 'File size is required'],
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
    },
    path: {
      type: String,
      required: [true, 'File path is required'],
    },
    alt: {
      type: String,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    width: Number,
    height: Number,
    folder: {
      type: String,
      default: 'uploads',
    },
    tags: [{
      type: String,
      trim: true,
    }],
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
mediaSchema.index({ mimeType: 1 });
mediaSchema.index({ folder: 1 });
mediaSchema.index({ tags: 1 });
mediaSchema.index({ createdAt: -1 });

export const Media = mongoose.model<IMedia>('Media', mediaSchema);
