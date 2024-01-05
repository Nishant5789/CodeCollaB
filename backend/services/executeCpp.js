const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const Problem = require("../models/Problem");

const outputPathDir = path.join(__dirname).split("/").slice(0,-1).join("/")+"/ExecuteCodeDir";

if (!fs.existsSync(outputPathDir)) {
  fs.mkdirSync(outputPathDir, { recursive: true });
}

const executeCpp =  (Filepath, ProblemId) => {  
  const jobId = path.basename(Filepath).split(".")[0];
  const outFilePath = path.join(outputPathDir, `${jobId}.out`);

  
  return new Promise(async(resolve, reject) => {
    
    const Testcase = await Problem.findById(ProblemId);
    const TestcaseData = Testcase.TestCasesInput[0];
    console.log("TestcaseData", TestcaseData);

    console.log(`compile flie using command : g++ ${Filepath} -o ${outFilePath}`);
    
    await fs.writeFileSync(`${outputPathDir}/${jobId}testcase.txt`, TestcaseData);

    exec(
      `g++ ${Filepath} -o ${outFilePath} && cd ${outputPathDir} && ./${jobId}.out <${jobId}testcase.txt`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        console.log("stdout", stdout);
        resolve(stdout);
      });
    //  exec(
    //   `cd ${outputPathDir} && ./${jobId}.out <${jobId}Testcase}`,
    //   (error, stdout, stderr) => {
    //     error && reject({ error, stderr });
    //     stderr && reject(stderr);
    //     console.log("stdout", stdout);
    //     resolve(stdout);
    //   }
    // );
  });
};

module.exports = {
  executeCpp,
};
