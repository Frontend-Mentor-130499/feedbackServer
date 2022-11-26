import mongoose from 'mongoose';

import userSchema from '../schemas/userSchema';
import productSchema from '../schemas/productRequestSchema';

export const userModel = mongoose.model('user', userSchema);
export const productModel = mongoose.model('product', productSchema);
