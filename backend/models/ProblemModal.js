const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const problemSchema = mongoose.Schema(
    {
        ProblemStatement: {
            type: String,
        },
        TopicName: {
            type: String,
        },
        Accuracy: {
            type: String,
        },
        DifficultyLevel: {
            type: String,
        },
        InputFormat: {
            type: [String],
        },
        OutputFormat: {
            type: [String],
        },
        TestCasesInput: {
            type: [String],
        },
        TestCasesOutput: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }  
);

const virtualId = problemSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

problemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


module.exports = mongoose.model("Problem", problemSchema)