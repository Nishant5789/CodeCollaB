const fs = require("fs");
const path = require("path");



const outputPathDir = path.join(__dirname).split("/").slice(0, -1).join("/") + "/ExecuteCodeDir";
// console.log(outputPathDir);
// console.log(fs.existsSync(outputPathDir));

const filepath = "/home/nishant129/codeworkspace/College_projects/CoderCollaB/backend/compileCodeDir/cc2c0ad7-6c58-43e2-88f8-3649ba584063.cpp"



const jobId = path.basename(filepath).split(".")[0];
const TestcaseData = "jkdnfgekjr"

const outFilePath = path.join(outputPathDir, `${jobId}.out`);



// const temp = async()=>{
//     await fs.writeFileSync(`${outputPathDir}/${jobId}testcase.txt`, TestcaseData);

// }
// temp();
// console.log(`${outputPathDir}+${jobId}+testcase.txt`);

// console.log(`g++ ${filepath} -o ${outFilePath}`);
console.log(`cd ${outputPathDir} && ./${jobId}.out <${jobId}testcase.txt`);

// g++ /home/nishant129/codeworkspace/College_projects/CoderCollaB/backend/compileCodeDir/test.cpp -o /home/nishant129/codeworkspace/College_projects/CoderCollaB/backend/ExecuteCodeDir/3f7ea0e7-76c7-429f-b91e-5e2b028000a2.out