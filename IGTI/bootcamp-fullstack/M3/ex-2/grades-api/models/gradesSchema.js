import mongoose from 'mongoose';

const GradesSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  subject: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  value: {
    required: true,
    type: Number,
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  }
});

export const Grades = mongoose.model("grade", GradesSchema);