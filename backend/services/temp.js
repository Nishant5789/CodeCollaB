const fs = require("fs");
const path = require("path");



const outputPathDir = path.join(__dirname).split("/").slice(0, -1).join("/") + "/ExecuteCodeDir";
console.log(outputPathDir);
console.log(fs.existsSync(outputPathDir));

const filepath = "/home/nishant129/codeworkspace/College projects/CoderCollaB/backend/compileCodeDir/3f7ea0e7-76c7-429f-b91e-5e2b028000a2.cpp"



const jobId = path.basename(filepath).split(".")[0];
const TestcaseData = "jkdnfgekjr"

const outFilePath = path.join(outputPathDir, `${jobId}.out`);



// const temp = async()=>{
//     await fs.writeFileSync(`${outputPathDir}/${jobId}testcase.txt`, TestcaseData);

// }
// temp();
// console.log(`${outputPathDir}+${jobId}+testcase.txt`);

console.log(`g++ ${filepath} -o .${outFilePath}`);
