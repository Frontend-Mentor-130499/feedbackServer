import { Schema } from 'mongoose';
import { UserInterface } from './userSchema';
import userSchema from './userSchema';

interface Comment {
  content?: string;
  user?: UserInterface;
  replies?: [
    Comment & {
      replyingto?: string;
    }
  ];
}

interface ProductInterface {
  title: string;
  category: string;
  upvotes?: number;
  status?: string;
  description: string;
  comments?: Comment[];
}

const Comment = new Schema<Comment>({
  content: { type: String, required: true },
  user: { type: userSchema, required: true },
  replies: [
    {
      content: String,
      user: userSchema,
      replyingTo: String,
    },
  ],
});

const ProductsSchema = new Schema<ProductInterface>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  upvotes: { type: Number, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  comments: [Comment],
});

Comment.method('toClient', function () {
  var obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

ProductsSchema.method('toClient', function () {
  var obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export default ProductsSchema;
