import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    title: String,
    type: String,
    path: String
})

const BoardSchema = new Schema({
  label: String,
  name: String,
  quantity: Number,
  material: {
    type: String,
    enum: ['Sheet', 'Dimensional', 'Hardwood']
  },
  roughLength: Number,
  roughWidth: Number,
  roughThickness: Number,
  finalLength: Number,
  finalWidth: Number,
  finalThickness: Number,
  description: String,
  joinery: String,
  shaping: String
})

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
    sheetsId: String

});

mongoose.model('Project', ProjectSchema);