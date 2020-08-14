import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Furniture', 'Jig', 'Shop Fixture']
    },
    subType: String,
    description: String,
    coverImage: String,
    boards: [
      {
        label: String,
        name: String,
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
        joinery: String,
        shaping: String
      }
    ],
    model: String,
    sheetsId: String

});

mongoose.model('Project', ProjectSchema);