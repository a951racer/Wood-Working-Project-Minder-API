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
        roughDims: {
          length: Number,
          width: Number,
          thickness: Number
        },
        finalDims: {
          length: Number,
          width: Number,
          thickness: Number
        },
        joinery: String,
        shaping: String
      }
    ],
    model: String,
    sheetsId: String

});

mongoose.model('Project', ProjectSchema);