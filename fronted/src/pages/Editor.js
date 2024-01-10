import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Monaco from '../features/codeeditor/components/Monaco'
import {  useDispatch, useSelector } from "react-redux";
import { fetchProblemAsync, selectProblemStatement } from '../features/codeeditor/codeSlice';


const Editor = () => {
    const {ProblemId} = useParams();
    console.log(ProblemId);
    const dispatch = useDispatch();

    const ProblemData = useSelector(selectProblemStatement);
    console.log(ProblemData);
    const {ProblemStatement, InputFormat, OutputFormat, TestCasesInput, TestCasesOutput} = ProblemData;

    
  useEffect(()=>{
    // console.log(ProblemId);
    if(ProblemId)
      dispatch(fetchProblemAsync("657eb723346bbf7e6d727d81"));
  },[ProblemId])

  return (
    <div>
      {
       Object.keys(ProblemData).length &&  <div className='w-full m-8'>
        <h1 className='text-center font-sans'>ProblemStatement</h1>
        <ul className='space-y-4  '>
          <li>
            <h1 className='font-bold'>ProblemStatement</h1>
            <p className='px-4'>{ProblemStatement}</p>
          </li>
          <li>
            <h1 className='font-bold'>InputFormat</h1>
            <p className='px-4'>{InputFormat[0]}</p>
          </li>
          <li>
            <h1 className='font-bold'>OutputFormat</h1>
            <p className='px-4'>{OutputFormat}</p>
          </li>
        </ul>
        <ul className='border-2 border-gray-600 p-4 space-y-4 mb-8'>
          <li>
            <h1 className='font-bold'>input</h1>
            <p>{TestCasesInput[0]}</p>
          </li>
          <li>
            <h1 className='font-bold'>output</h1>
            <p>{TestCasesOutput[0]}</p>
          </li>
        </ul>
      </div>
      }
      <div>
        <Monaco ProblemId={ProblemId}/>
      </div>
      <div></div>
    </div>
  )
}

export default Editor