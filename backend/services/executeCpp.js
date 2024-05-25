const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const Problem = require("../models/Problem");
const { replaceFileContent } = require("./replaceFileContent");
const { log } = require("console");

const outputPathDir = path.join(__dirname).split("/").slice(0,-1).join("/")+"/ExecuteCodeDir";

if (!fs.existsSync(outputPathDir)) {
  fs.mkdirSync(outputPathDir, { recursive: true });
}

const executeCpp =  (Filepath, ProblemId, userInput) => {  
  const jobId = path.basename(Filepath).split(".")[0];
  const outFilePath = path.join(outputPathDir, `${jobId}.out`);
  
  return new Promise(async(resolve, reject) => {
    
    const Testcase = await Problem.findById(ProblemId);
    console.log("userInput",userInput);
    const TestcaseData = userInput===null?"getformapi":userInput;
    console.log("TestcaseData", TestcaseData);
    const length = Testcase.TestCasesInput.length
    const statusTestcases = Array.from({ length }, () => "Not-Executed");
    console.log(statusTestcases);
    let outputArray = Array.from({ length }, () => "");

    // console.log(`compile flie using command : g++ ${Filepath} -o ${outFilePath}`);

    if(TestcaseData!=="getformapi"){
      // handle userInput testcase
      await fs.writeFileSync(`${outputPathDir}/${jobId}testcase.txt`, TestcaseData);
      exec(
        `g++ ${Filepath} -o ${outFilePath} && cd ${outputPathDir} && ./${jobId}.out <${jobId}testcase.txt`,
        (error, stdout, stderr) => {
          error && reject({ error, stderr });
          stderr && reject(stderr);
          // console.log("stdout", stdout);
          resolve(stdout);
        });
    }
    else{
      // handle mutiple testcase for submission
    exec(
      `g++ ${Filepath} -o ${outFilePath}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        console.log("stdout at compile time", stdout);
      });

    await setTimeout(async() => {
        for(let i=0;i<Testcase.TestCasesInput.length;i++){
          testcasefilepath = `${outputPathDir}/${jobId}testcase.txt`;
          // await replaceFileContent(testcasefilepath, Testcase.TestCasesInput[i]);
          exec(
            `cd ${outputPathDir} && echo "${Testcase.TestCasesInput[i]}" | ./${jobId}.out`, 
            (error, stdout, stderr) => {
              if(error){
                console.log("error", error);
                statusTestcases[i]="Executed";
                outputArray[i]="error";
              }
              else if(stderr){
                console.log("stderr", stderr);
                statusTestcases[i]="Executed";
                outputArray[i]="stderror";
              }
              else{
                console.log(`stdout-${i}`, stdout);
                outputArray[i]=stdout;
                statusTestcases[i]="Executed";
              }              
            }
         );
        }
    }, 2000);

    const intervalId=setInterval(() => {
      if(checkstatustestcases(statusTestcases) && length>0){
        console.log("statusTestcases",statusTestcases,length);
        resolve(outputArray);
        clearInterval(intervalId);
      }
    }, 2000);
    }
  });
};

const checkstatustestcases = (statusTestcases)=>{
  console.log("statusTestcases",statusTestcases);
  for(let i=0; i<statusTestcases.length; i++){
    if(statusTestcases[i]=='Not-Executed'){
      return false;
    }
  }
  return true;
}

module.exports = {
  executeCpp,
};
