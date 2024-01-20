import { useEffect, useState } from 'react';
import '../Styles/Monaco.css';
import Editor from "@monaco-editor/react";
import Navbar from './Navbar';
import Axios from 'axios';
import spinner from '../../../app/spinner.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ExcuteCodeAsync, selectJobId } from '../codeSlice';
import axios from 'axios';

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
	const [loading, setLoading] = useState(false);
	const [isPolling, setIsPolling] = useState(false);

	const options = {
		fontSize: fontSize
	}

	function compile() {
		setLoading(true);
		if (userCode === ``) {
			return
		}
		dispatch(ExcuteCodeAsync({
			ProblemId,
			Language:userLang,
			codeData:userCode
		}))
		setIsPolling(true);
	}

	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
	}

	useEffect(()=>{
		if(JobId!=="" && isPolling){
		const pollInterval = setInterval(async () => {
			const { data: statusRes } = await axios.get(
				`http://localhost:8080/codeRunner/status?jobId=${JobId}`,
				);
				const { success, job, error } = statusRes;
				console.log(success);
			if (success) {
			  const { Status: jobStatus, Output: jobOutput } = job;
			  console.log(jobStatus);
			  if (jobStatus === "pending") return;
			  console.log("done");
			  setUserOutput(jobOutput);
			  setStatus("executed");
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
			<Navbar
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
						defaultValue="# Enter your code here"
						onChange={(value) => { setUserCode(value) }}
					/>
					<button className="btn btn-primary px-4" onClick={() => compile()}>
						Run
					</button>
				</div>
				<div className="">
					<h4>Input:</h4>
					<div className="input-box">
						<textarea id="code-inp" className='border-2 border-gray-500 p-2 w-11/12' onChange=
							{(e) => setUserInput(e.target.value)}>
						</textarea>
					</div>
					<h4>Output: {status!=="" ? status : null} </h4>
					{loading ? (
						<div className="flex justify-center">
							<img src={spinner}  alt="Loading..." />
						</div>
					) : (
						<div className="">
							<p className='p-2'>{userOutput} </p>
							<button className="px-4 btn btn-warning" onClick={() => { clearOutput() }}>
								Clear
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;