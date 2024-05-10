const Queue = require("bull");

const Job = require("../models/Job");
const { executeCpp } = require("./executeCpp");
const Problem = require("../models/Problem");
const { preprocessText } = require("./preprocessText");

const jobQueue = new Queue("job-runner-queue");
const NUM_WORKERS = 5;

const compareStdOutput = async (ProblemId, UserStdOutput)=>{
  const problem = await Problem.findById(ProblemId);
  // console.log("problem", problem);
  const ActualStdOutput = problem.TestCasesOutput;
  const length = ActualStdOutput.length;
  const result = Array.from({ length }, () => "Not Executed");
  // console.log("result",result);
  console.log("UserStdOutput",UserStdOutput);

  for(let i=0; i<ActualStdOutput.length; i++){
    console.log(ActualStdOutput[i]);
    console.log(UserStdOutput[i]);
    if(UserStdOutput[i]=="Error"){
      result[i]="Error";
    }
    else if(preprocessText(ActualStdOutput[i])==preprocessText(UserStdOutput[i])){
      result[i]="Correct";
    }
    else{
      result[i]="InCorrect";
    }
  }
  return result;
}

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
      StdOutput = await executeCpp(job.Filepath, data.ProblemId, data.userInput);
      // await setTimeout(()=>{
      //   console.log("executed cpp");
      // }, 2000)
      console.log("done executed", StdOutput);
    } else if (job.Language === "py") {
      // Output = await executePy();
    }
    job["CompletedAt"] = new Date();
    job["Output"] = Output;
    if(data.userInput==null){
      job["JobTypeByTestCase"]="MultipleTestCase";
      job["MultipleTestcaseStdOutput"]= await compareStdOutput(data.ProblemId, StdOutput);
    }
    else{
      job["JobTypeByTestCase"]="SingleTestCase";
      job["SingleTestcaseStdOutput"]=StdOutput;
    }
    job["Status"] = "success";
    console.log(job);
    await job.save();
    return true;
  } catch (err) {
    console.log("err",err);
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
