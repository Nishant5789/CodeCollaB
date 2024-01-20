import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react'
import LOGO from '../../../app/LOGO.png'

const Roomeditor = () => {

  const [codeData, setCodeData] =useState();

  return (
    <div className='h-screen grid grid-cols-12'>
        <div className='col-span-3 border-2 pb-4 flex flex-col border-stone-800'>
          <div className='flex items-center bg-purple-600 text-white justify-center gap-x-4'>
            <img src={LOGO} className="h-28" alt="" srcset="" />
            <p className='font-bold text-2xl'>CodeCollaB</p>
          </div>
          <div>
            <h1 className='text-center text-3xl py-4 font-extrabold bg-yellow-300 text-white'>status : connected </h1>
          </div>
          <div className='grid p-2 grid-cols-3 justify-center gap-2 flex-grow text-white'>
            <div className='flex flex-col items-center h-16'>
              <div className='bg-blue-500 m-auto p-8 text-3xl rounded-md'>NK</div>
              <span className='text-black'>Nishant</span>
            </div>
            <div className='flex flex-col items-center h-16'>
              <div className='bg-blue-500 m-auto p-8 text-3xl rounded-md'>NK</div>
              <span className='text-black'>Nishant</span>
            </div>
          </div>
          <div className='px-4 space-y-3'>
            <div className='bg-gray-200 hover:bg-gray-300 active:bg-gray-100 px-4 py-2 text-center  rounded-md'>Copy Room ID</div>
            <div className='bg-green-500 hover:bg-green-600 active:bg-green-400 px-4 py-2 text-center rounded-md'>Leave</div>
          </div>
        </div>
        <div className="col-span-9">
        <Editor
						options={{fontSize: 20}}
						height="100vh"
						width="100%"
						theme={"vs-dark"}
						value="Enter Here......"
						onChange={(value) => { setCodeData(value) }}
					/>
        </div>
    </div>
  )
}

export default Roomeditor