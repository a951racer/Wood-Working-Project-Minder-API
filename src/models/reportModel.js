import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const ReportSchema = new Schema({
    title: String,
    type: String,
    path: String
})

mongoose.model('Report', ReportSchema)