import { useEffect, useState } from 'react';
import '../Styles/Monaco.css';
import Editor from "@monaco-editor/react";
import Topbar from './Topbar';
import Axios from 'axios';
import spinner from '../../../app/spinner.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ExcuteCodeAsync, selectJobId } from '../codeSlice';
import axios from 'axios';
import bolilerplate from '../../../app/boilerplate';

function App({ProblemId}) {
	const dispatch = useDispatch();

	const JobId = useSelector(selectJobId);
	const [userCode, setUserCode] = useState(``);
	const [userLang, setUserLang] = useState("cpp");
	const [userTheme, setUserTheme] = useState("vs-dark");
	const [fontSize, setFontSize] = useState(20);
	const [userInput, setUserInput] = useState("");
	const [userOutput, setUserOutput] = useState("");
	const [status, setStatus] = useState("");
	const [executiontime, setExecutiontime] = useState(0);
	const [loading, setLoading] = useState(false);
	const [isPolling, setIsPolling] = useState(false);

	const [submissionStatus, setSubmissionStatus] = useState([]);
	const [isSubmissionStatus, setIsSubmissionStatus] = useState(false);


	const options = {
		fontSize: fontSize
	}

	function compile(btntype) {
		setLoading(true);
		// console.log(userCode);
		if(btntype==="submit"){
			dispatch(ExcuteCodeAsync({
				ProblemId,
				Language:userLang,
				codeData:userCode,
				isUserInput:false
			}))
		}
		else{
			dispatch(ExcuteCodeAsync({
				ProblemId,
				Language:userLang,
				codeData:userCode,
				userInput,
				isUserInput:true
			}))
		}
		setIsPolling(true);
	}

	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
		setIsSubmissionStatus(false);
		setStatus("")
		setExecutiontime(0)
	}

	useEffect(()=>{
		if(JobId!=="" && isPolling){
		const pollInterval = setInterval(async () => {
			const { data: statusRes } = await axios.get(
				`http://localhost:8080/codeRunner/status?jobId=${JobId}`);
				const { success, job, error } = statusRes;
				console.log(success);
			if (success) {
			  const { Status: jobStatus, SingleTestcaseStdOutput, MultipleTestcaseStdOutput, JobTypeByTestCase, ErrorOutput, CompletedAt, StartedAt} = job;
			  console.log(jobStatus);
			  if (jobStatus === "pending") return;
			//   console.log("done");

			  if(jobStatus==="success"){
				if(JobTypeByTestCase==="MultipleTestCase"){
					setSubmissionStatus(MultipleTestcaseStdOutput);
					setIsSubmissionStatus(true);
				}
				else{
					setUserOutput(SingleTestcaseStdOutput);
				}
				const time1 = new Date(StartedAt);
				const time2 = new Date(CompletedAt);
				setExecutiontime(Math.abs(time2-time1));
			  }else{
				setUserOutput(ErrorOutput);
			  }
			  setStatus("Executed");
			  setIsPolling(false);
			  setLoading(false);
			  clearInterval(pollInterval);
			} else {
			  console.error(error);
			  setUserOutput(error);
			  setStatus("Bad request");
			  setIsPolling(false);
			  setLoading(false);
			  clearInterval(pollInterval);
			}
		}, 1000);
	}
},[JobId])

	return (
		<div className="mb-4">
			<Topbar
				userLang={userLang} setUserLang={setUserLang}
				userTheme={userTheme} setUserTheme={setUserTheme}
				fontSize={fontSize} setFontSize={setFontSize}
			/>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Editor
                        options={options}
                        height="70vh"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        defaultLanguage="cpp"
                        value={userLang==="cpp"?bolilerplate.cpp:bolilerplate.python}
                        onChange={(value) => { setUserCode(value) }}
                    />
                    <button className="btn btn-outline btn-success ml-2 px-4" onClick={() => compile("run")}>
                        Run
                    </button>
                    <button className="btn btn-outline btn-primary ml-2 px-4" onClick={() => compile("submit")}>
                        Submit
                    </button>
                </div>
                <div className="px-4 font-bold text-black">
					<div className='flex mb-2 items-center gap-x-2'>
                    <h4 className='text-white text-xl'>Input: </h4>
					</div>
                    <div className="input-box">
                        <textarea id="code-inp" className='border-2 border-gray-600 p-2 w-11/12' onChange=
                            {(e) => setUserInput(e.target.value)}>
                        </textarea>
                    </div>
                    <h4 className='text-white text-xl'>Output: {status!=="" ? status : null} {status!==""  && `${executiontime} ms`}  </h4>
                    {
                      loading ? (
                        <div className="flex justify-center">
                            <img src={spinner}  alt="Loading..." />
                        </div>
                    ) : (
                        <div className=''>
                            <p className='px-2 py-4 border-2 mb-2 rounded-md w-11/12 text-white '>{userOutput} </p>
                            <button className="px-4 btn btn-warning" onClick={() => { clearOutput() }}>
                                Clear
                            </button>
                        </div>
                    )}
				{
					isSubmissionStatus &&                 
					<div className='w-full bg-slate-700 py-4 rounded-md mt-2'>
					<div className='w-11/12 flex justify-between p-3 shadow-lg mx-auto bg-green-300 rounded-sm'>
						<div className='font-semibold'><span className='text-xl font-bold'>{status}</span></div>
						<div><span className='text-xl font-bold'>Submission Id</span>: {JobId}</div>
					</div>
					<div className='w-11/12 grid mx-auto mt-2 rounded-sm border-2 text-white grid-cols-2'>
						<div className='text-center'>Testcase #</div>
						<div className='text-center'>Result(time)</div>
						{
							submissionStatus.map((status, index)=>{
								return <>
								<div className={`text-center ${status==="Correct"?"bg-green-500":"bg-red-500"} border-2`}>{index+1}</div>
								<div className={`text-center ${status==="Correct"?"bg-green-500":"bg-red-500"} border-2`}>{status}</div>
								</>						
							})
						}					
					</div>
					<div className='text-left px-14 py-4 text-3xl text-white'>Result : <span className='text-2xl text-red-600'>InCorrect</span></div>
				</div>
				}
                </div>
            </div>
		</div>
	);
}

export default App;