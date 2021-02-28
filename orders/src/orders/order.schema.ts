import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const OrderSchema = new mongoose.Schema(
  {
    userId: String,
    total: Number,
    status: String,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  },
);

OrderSchema.plugin(mongoosePaginate);

export { OrderSchema };
