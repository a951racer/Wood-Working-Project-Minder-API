import mongoose from 'mongoose';
import { ReportSchema } from './reportModel'
import { BoardSchema } from './boardModel'
import { LibraryItemSchema } from './libraryItemModel'
import { NoteSchema } from './noteModel';

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: [String],
    description: String,
    coverImage: String,
    reports: [ReportSchema],
    boards: [BoardSchema],
    model: String,
    library: [LibraryItemSchema],
    notes: [NoteSchema]

});

mongoose.model('Project', ProjectSchema);