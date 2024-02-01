import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Monaco from '../features/codeeditor/components/Monaco'
import {  useDispatch, useSelector } from "react-redux";
import { fetchProblemAsync, selectProblemStatement } from '../features/codeeditor/codeSlice';


const ProblemPage = () => {
    const {ProblemId} = useParams();
    console.log(ProblemId);
    const dispatch = useDispatch();

    const ProblemData = useSelector(selectProblemStatement);
    // console.log(ProblemData);
    const {ProblemName, ProblemStatement, InputFormat, OutputFormat, TestCasesInput, TestCasesOutput} = ProblemData;

    
  useEffect(()=>{
    // console.log(ProblemId);
    if(ProblemId!="")
      dispatch(fetchProblemAsync(ProblemId));
  },[ProblemId])

  return (
    <div className="flex flex-wrap  ">
    {
        Object.keys(ProblemData).length &&  
        <div className="w-full bg-slate-200 p-4 md:w-2/5">
          <div className="mb-4">
            <h2 className="text-4xl bg-red-500 rounded-md p-4 text-center font-bold">{ProblemName}</h2>
          </div>
          <div className="mb-4 border-4 border-purple-600 p-2">
            <h2 className="text-2xl font-bold">Problem Statement : </h2>
            <p className='p-2'>{ProblemStatement}</p>
          </div>
          <div className="mb-4 border-4 border-purple-600 p-2">
            <h2 className="text-2xl font-bold">Input Format :</h2>
            <p className='p-2'>{InputFormat}</p>
          </div>
          <div className="mb-4 border-4 border-purple-600 p-2">
            <h2 className="text-2xl font-bold">Output Format :</h2>
            <p className='p-2'>{OutputFormat}</p>
          </div>
          <div className='space-y-2' >
            {
              Array.from({ length: TestCasesInput.length},(_, index) => index + 1 ).map((i, data)=>
              <div className='p-2 border-4 border-yellow-400'>
                <h1>Input :</h1>
                <p>{TestCasesInput[i-1]}</p>
                <h1>Output :</h1>
                <p>{TestCasesOutput[i-1]}</p>
              </div>
            )}
          </div>
        </div>
    }

      {/* Right column for code editor */}
      <div className="w-full md:w-3/5">
        <Monaco ProblemId={ProblemId}/>
      </div>
    </div>   
  )
}

export default ProblemPage;