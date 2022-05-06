import mongoose from 'mongoose'
import { LibraryItemSchema } from './libraryItemModel'
import { ReportSchema } from './reportModel'
import { BoardSchema } from './boardModel'
import { NoteSchema } from './noteModel';

const Schema = mongoose.Schema

const TimeSlipSchema = new Schema({
    date: Date,
    type: String,
    hours: Number
})

const MaterialSchema = new Schema({
  date: Date,
  category: String,
  vendor: String,
  item: String,
  cost: Number,
})

export const JobSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: [String],
    description: String,
    customer: String,
    startDate: Date,
    endDate: Date,
    projectId: {  type: Schema.Types.ObjectId, ref: 'Project' },
    timeSlips: [TimeSlipSchema],
    materials: [MaterialSchema],
    coverImage: String,
    reports: [ReportSchema],
    boards: [BoardSchema],
    library: [LibraryItemSchema],
    notes: [NoteSchema]
});

mongoose.model('Job', JobSchema)