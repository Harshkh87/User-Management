import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = mongoose.Schema({
  _id: { type: "Number", required: true, description: "ID is required" },
  username: { type: "string", required: true, description: "Username is required" },
  email: { type: "string", required: true, description: "Email address is required" },
  password: { type: "string", required: true, description: "Password is required" },
  name: { type: "string", required: true, description: "Name is required" },
  date_of_birth: { type: "string", required: false },
  address: { type: "string", required: false },
  phone_number: { type: "string", required: false },
  role: { type: "string", required: false, default: "user", }
});

// Apply the uniqueValidator plugin to UserSchema.
UserSchema.plugin(uniqueValidator);

// compile schema to model
const UserSchemaModel = mongoose.model('user_collection', UserSchema);

export default UserSchemaModel