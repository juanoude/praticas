import mongoose from 'mongoose';
import { Grades } from './gradesSchema.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grades = Grades;

export { db };
