const Queue = require("bull");

const Job = require("../models/Job");
const { executeCpp } = require("./executeCpp");

const jobQueue = new Queue("job-runner-queue");
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  console.log("assigend job", data);
  const jobId = data.id;
  const job = await Job.findById(jobId);
  if (job === undefined) {
    throw Error(`cannot find Job with id ${jobId}`);
  }
  try {
    let Output;
    job["StartedAt"] = new Date();
    if (job.Language === "cpp") {
      Output = await executeCpp(job.Filepath, data.ProblemId, data.userInput);
      // await setTimeout(()=>{
      //   console.log("executed cpp");
      // }, 2000)
      console.log("done executed");
    } else if (job.Language === "py") {
      // Output = await executePy();
    }
    job["CompletedAt"] = new Date();
    job["Output"] = Output;
    job["Status"] = "success";
    console.log(job);
    await job.save();
    return true;
  } catch (err) {
    job["CompletedAt"] = new Date();
    job["Output"] = JSON.stringify(err);
    job["Status"] = "error";
    await job.save();
    throw Error(JSON.stringify(err));
  }
});

jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addJobToQueue = async (jobId, ProblemId, userInput) => {
  jobQueue.add({
    id: jobId,
    ProblemId,
    userInput
  });
  console.log("added in queue", jobId);
};

module.exports = {
  addJobToQueue,
};
