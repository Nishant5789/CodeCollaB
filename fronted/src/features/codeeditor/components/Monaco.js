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
    <div className="">
    <div className="flex flex-wrap">
      {/* Left column for problem details */}
      <div className="w-full p-4 md:w-2/5">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Problem Name</h2>
          <p className='p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut consequuntur id neque aperiam illum itaque odio. Deleniti, possimus iste? Totam minima, dignissimos voluptas, exercitationem qui molestias impedit, quam delectus sequi iusto doloremque autem nostrum..</p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Problem Statement</h2>
          <p className='p-2'>Your problem statement goes here.</p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Input Format</h2>
          <p className='p-2'>Your input format goes here.</p>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Output Format</h2>
          <p className='p-2'>Your output format goes here.</p>
        </div>
      </div>

      {/* Right column for code editor */}
      <div className="w-full md:w-3/5">
        <Monaco />
      </div>
    </div>
  </div>
  )
}

export default Editor

    // <div>
    //   {
    //    Object.keys(ProblemData).length &&  <div className='w-full m-8'>
    //     <h1 className='text-center font-sans'>ProblemStatement</h1>
    //     <ul className='space-y-4  '>
    //       <li>
    //         <h1 className='font-bold'>ProblemStatement</h1>
    //         <p className='px-4'>{ProblemStatement}</p>
    //       </li>
    //       <li>
    //         <h1 className='font-bold'>InputFormat</h1>
    //         <p className='px-4'>{InputFormat[0]}</p>
    //       </li>
    //       <li>
    //         <h1 className='font-bold'>OutputFormat</h1>
    //         <p className='px-4'>{OutputFormat}</p>
    //       </li>
    //     </ul>
    //     <ul className='border-2 border-gray-600 p-4 space-y-4 mb-8'>
    //       <li>
    //         <h1 className='font-bold'>input</h1>
    //         <p>{TestCasesInput[0]}</p>
    //       </li>
    //       <li>
    //         <h1 className='font-bold'>output</h1>
    //         <p>{TestCasesOutput[0]}</p>
    //       </li>
    //     </ul>
    //   </div>
    //   }
    //   <div>
    //     <Monaco ProblemId={ProblemId}/>
    //   </div>
    // </div>