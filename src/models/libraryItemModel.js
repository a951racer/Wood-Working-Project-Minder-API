import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LibraryItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    description: String,
    tags: [String],
    rating: Number,
    created_date: {
       type: Date,
       default: Date.now 
    },
});


mongoose.model('LibraryItem', LibraryItemSchema);