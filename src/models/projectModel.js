import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: [String],
    description: String,
    coverImage: String,
    boards: [
      {
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
      }
    ],
    model: String,
    sheetsId: String

});

mongoose.model('Project', ProjectSchema);