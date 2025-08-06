// lib/models/User.ts
import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: string
  name?: string
  email: string
  password?: string
  image?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false, // Optional for OAuth users
  },
  image: {
    type: String,
    required: false,
  },
  emailVerified: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
})

// Create indexes
UserSchema.index({ email: 1 })

// Prevent model re-compilation during development
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User