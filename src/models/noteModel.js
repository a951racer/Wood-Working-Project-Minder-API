import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    created: Date,
    tags: [String],
    type: String,
    body: String,
});

mongoose.model('Note', NoteSchema);