import mongoose from 'mongoose'

const Project = mongoose.model('Project')
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
    projectId: {  type: Schema.Types.ObjectId, ref: 'Project' },
    timeSlips: [TimeSlipSchema],
    materials: [MaterialSchema],
});

mongoose.model('Job', JobSchema)