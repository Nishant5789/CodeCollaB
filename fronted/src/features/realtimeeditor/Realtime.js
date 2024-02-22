import React, { useEffect, useRef, useState } from 'react'
import LOGO from '../../app/LOGO.png'
import { v4 as uuidV4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import { gettoastOptions } from '../../app/constant';
import { useNavigate } from 'react-router-dom';

const RealtimeIDE = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = (e) => {
      e.preventDefault();
      const id = uuidV4();
      setRoomId(id);
      toast.success('Created a new room', gettoastOptions());
  };

  const joinRoom = () => {
    if (!roomId || !username) {
        toast.error('ROOM ID & username is required', gettoastOptions());
        return;
    }
    // Redirect
    navigate(`/realtimeditor/${roomId}`, {
        state: {
            username,
        },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
        joinRoom();
    }
};


return (
    <div className='flex bg-gradient-to-tr from-orange-900 via-yellow-200 to-orange-900 justify-center items-center h-screen'>
      <div className='bg-slate-50 shadow-black shadow-xl w-1/3 h-4/6 rounded-md space-y-2 py-4'>
        <div className='flex justify-center'>
          <img src={LOGO} className='h-28' alt="" />
        </div>
        <div className='font-bold text-center font-sans text-2xl '>Please Intialize Room ID</div>
        <div className='flex flex-col items-center space-y-2'>
          <div>
            <input type="text" placeholder="Room ID" className="input input-bordered w-full input-accent" value={roomId} onChange={(e) => setRoomId(e.target.value)}
/>
          </div>
          <div>
            <input type="text" placeholder="UserName" className="input input-bordered input-accent w-full" value={username} onChange={(e) => setUsername(e.target.value)}
/>
          </div>
        </div>
        <div className='flex px-4 flex-col'>
          <button className='self-end mr-8 px-6 py-2 text-white rounded-md hover:bg-blue-700 bg-blue-600 active:bg-blue-300' onClick={joinRoom}>Join</button>
          <h1 className=' text-center'>IF you don't an intiate create <span className='border-b-2 border-green-600 hover:text-purple-800  text-purple-500 font-bold text-lg ' onClick={createNewRoom}>new room</span></h1>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default RealtimeIDE