import mongoose from 'mongoose';
import { MONGO_URI } from './server.config.js';
mongoose.connect(MONGO_URI);
console.log("Successfully connected to mongodb database...");
