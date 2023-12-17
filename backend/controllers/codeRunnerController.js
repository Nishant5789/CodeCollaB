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

module.exports.executeCode = async(req, res, next)=>{

    const { Language = "cpp", ProblemId, codeData } = req.body;
    console.log(codeData);

    console.log(Language, "Length:", codeData.length);
  
    if (codeData === undefined || codeData==="") {
      return res.status(400).json({ success: false, error: "Empty code body!" });
    }

    console.log("starting code.cpp file is genrating");
    const Filepath = await generateFile(Language, codeData);
    console.log("code.cpp file is genrated");

    const job = await new Job({ Language, ProblemId, Filepath }).save();
    const jobId = job["id"];
    addJobToQueue(jobId, ProblemId);
    res.status(201).json({ jobId });
}