// import mongoose, {Document} from 'mongoose'
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
//   throw new Error("JWT secrets are not defined in environment variables.");
// }

// const UserSchema = new mongoose.Schema({
//   username: {type: String, required: true, unique: true},
//   fullname: {type: String, required: true},
//   email: {type: String, required: true, unique: true},
//   password: {type: String, required: true, select: false},
//   avatar: {type: String},
//   refreshToken: {type: String, select: false},
// }, {timestamps: true});

// // Hash password before save
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Method to check if the password is correct
// UserSchema.methods.isPasswordCorrect = async function (password: string) {
//   return await bcrypt.compare(password, this.password);
// };

// // Generate Access Token
// UserSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       username: this.username,
//       fullname: this.fullname,
//     },
//     process.env.ACCESS_TOKEN_SECRET as string,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
//   );
// };

// // Generate Refresh Token
// UserSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     { _id: this._id },
//     process.env.REFRESH_TOKEN_SECRET as string,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
//   );
// };

// export const UserModel = mongoose.model("User", UserSchema);

// export const getUsers = () => UserModel.find();
// export const getUserByEmail = (email: string) => UserModel.findOne({email});
// export const getUserById = (id: string) => UserModel.findById(id);
// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
// export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);



import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. Define the user document interface with custom methods
export interface IUserDocument extends Document {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar?: string;
  refreshToken?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// 2. Define the schema
const UserSchema = new mongoose.Schema<IUserDocument>({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  avatar: { type: String },
  refreshToken: { type: String, select: false },
}, { timestamps: true });

// 3. Hash password before save
UserSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 4. Method to check if the password is correct
UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// 5. Generate Access Token
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

// 6. Generate Refresh Token
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

// 7. Model and helpers
export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);