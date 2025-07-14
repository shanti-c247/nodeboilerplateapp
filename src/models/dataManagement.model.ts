// Third-party modules
import mongoose, { type Model, Schema } from 'mongoose';

//enums
import { DataBatchStatus, DataItemStatus } from '@enums';

//Custom types
import type { IDataBatch, IDataItem } from '@customTypes';

const DataItemSchema = new Schema<IDataItem>(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    mfgDate: {
      type: Date,
      required: true,
      index: true,
    },
    expiryDate: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      default: DataItemStatus.Available,
      enum: DataItemStatus,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      index: true,
    },
    lastUpdatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    batchId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

DataItemSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    ret._id = undefined;
    return ret;
  },
});

// Indexes
DataItemSchema.index({
  itemName: 1,
  category: 1,
  companyName: 1,
  batchId: 1,
  createdBy: 1,
});

const DataBatchSchema = new Schema<IDataBatch>(
  {
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    totalRecords: {
      type: Number,
      required: true,
    },
    successfulRecords: {
      type: Number,
      default: 0,
    },
    failedRecords: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        DataBatchStatus.Processing,
        DataBatchStatus.Completed,
        DataBatchStatus.CompletedWithError,
        DataBatchStatus.Failed,
      ],
      default: DataBatchStatus.Processing,
      index: true,
    },
    uploadErrors: [
      {
        row: Number,
        messages: [String],
      },
    ],
    processingTime: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

DataBatchSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    ret._id = undefined;
    return ret;
  },
});

const DataModel: Model<IDataItem> = mongoose.model<IDataItem>('dataItems', DataItemSchema);

const BatchModel: Model<IDataBatch> = mongoose.model<IDataBatch>('dataBatches', DataBatchSchema);

export { DataModel, BatchModel };
