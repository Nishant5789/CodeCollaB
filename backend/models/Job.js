const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  Language: {
    type: String,
    required: true,
    enum: ["cpp", "py"],
  },
  JobTypeByTestCase: {
    type: String,
    enum: ["SingleTestCase", "MultipleTestCase"],
  },
  ProblemId: {
    type: String,
    required: true,
  },
  Filepath: {
    type: String,
    required: true,
  },
  SubmittedAt: {
    type: Date,
    default: Date.now,
  },
  StartedAt: {
    type: Date,
  },
  CompletedAt: {
    type: Date,
  },
  Status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "error"],
  },
  SingleTestcaseStdOutput: {
    type: String,
  },
  MultipleTestcaseStdOutput:[{
    type: String
  }],
  Output:{
    type: String
  }
});

const virtualId = jobSchema.virtual('id');
virtualId.get(function () {
  return this._id;
})

jobSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
})


// default export
module.exports = mongoose.model("Job", jobSchema);
