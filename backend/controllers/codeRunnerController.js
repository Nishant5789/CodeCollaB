const Job = require("../models/Job");
const Problem = require("../models/Problem");
const { generateFile } = require("../services/generateFile");
const { addJobToQueue } = require("../services/jobQueue");



module.exports.AddedProblem = async (req, res, next)=>{
    try {
        const problem = await Problem(req.body);
        await problem.save();    
        return res.status(201).json(problem);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
module.exports.fetchAllProblem = async (req, res, next)=>{
  try {
    const problems = await Problem.find();
      return res.status(200).json(problems);
  } catch (error) {
      console.log(error);
      return res.status(400).json(error);
  }
}

module.exports.fetchProblem = async (req, res, next)=>{
  const {ProblemId} = req.params;
  console.log(ProblemId);
  try {
    const problem = await Problem.findById(ProblemId);
    // console.log(problem);
      return res.status(201).json(problem);
  } catch (error) {
      console.log(error);
      return res.status(400).json(error);
  }
}


module.exports.checkJobStatus =  async (req, res) => {
    const jobId = req.query.jobId;
  
    if (jobId === undefined) {
      return res.status(400).json({ success: false, error: "missing id query param" });
    }
  
    const job = await Job.findById(jobId);
  
    if (job === undefined) {
      return res.status(400).json({ success: false, error: "couldn't find job" });
    }
  
    return res.status(200).json({ success: true, job });
  }
  

module.exports.executeCode = async(req, res, next)=>{

    const { Language = "cpp", ProblemId, codeData, userInput = null, isUserInput } = req.body;
    // console.log(codeData);

    console.log(Language, "Length:", codeData.length);
  
    if (codeData === undefined || codeData==="") {
      return res.status(400).json({ success: false, error: "Empty code body!" });
    }

    console.log("starting code.cpp file is genrating");
    const Filepath = await generateFile(Language, codeData);
    console.log("code.cpp file is genrated");

    const job = await new Job({ Language, ProblemId, Filepath }).save();
    const jobId = job["id"];

    // console.log(isUserInput);
    if(isUserInput)
      addJobToQueue(jobId, ProblemId, userInput);
    else
      addJobToQueue(jobId, ProblemId, null);

    res.status(201).json({ jobId });
}