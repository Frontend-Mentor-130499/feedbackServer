import { Schema } from 'mongoose';

export interface UserInterface {
  image?: string;
  name?: string;
  username?: string;
}

const userSchema = new Schema<UserInterface>({
  image: String,
  name: String,
  username: String,
});

userSchema.method('toClient', function () {
  var obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export default userSchema;
