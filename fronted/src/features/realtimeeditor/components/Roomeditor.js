import React, { useEffect, useRef, useState } from 'react'
import LOGO from '../../../app/LOGO.png'
import { initSocket } from '../../../socket.js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation, Navigate} from 'react-router';
import ACTIONS from '../../../app/ACTIONS.js';
import { useParams } from 'react-router-dom';
import { gettoastOptions } from '../../../app/constant';
import Monaco from './TextEditor.js';
import TextEditor from './TextEditor.js';

const Roomeditor = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  const socketRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(()=>{
    const init = async()=>{
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
          console.log('socket error', e);
          toast.error('Socket connection failed, try again later.', gettoastOptions());
          reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
            if (username !== location.state?.username) {
                toast.success(`${username} joined the room.`, gettoastOptions());
                console.log(`${username} joined`);
            }
            console.log(clients);
            setClients(clients);
            socketRef.current.emit(ACTIONS.SYNC_CODE, {
                code: codeRef.current,
                socketId,
            });
      });

      // Listening for disconnected
      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }) => {
            toast.success(`${username} left the room.`, gettoastOptions());
            setClients((prev) => {
                return prev.filter(
                    (client) => client.socketId !== socketId
                );
            });
        }
    );
    }
    init();
    return () => {
      // socketRef.current.disconnect();
      // unsubscribe the events
      // socketRef.current.off(ACTIONS.JOINED);
      // socketRef.current.off(ACTIONS.DISCONNECTED);
  };
  },[])

  if (!location.state) {
      return <Navigate to="/realtimeIDE" />;
  }


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
            {
              clients && clients.map((index, clientdata)=> 
              <div className='flex flex-col items-center h-16'>
                <div className='bg-blue-500 m-auto p-8 text-3xl rounded-md'>Us</div>
                  <span className='text-black'>{clientdata.username}</span>
                </div>)
            }
          </div>
          <div className='px-4 space-y-3'>
            <div className='bg-gray-200 hover:bg-gray-300 active:bg-gray-100 px-4 py-2 text-center  rounded-md'>Copy Room ID</div>
            <div className='bg-green-500 hover:bg-green-600 active:bg-green-400 px-4 py-2 text-center rounded-md'>Leave</div>
          </div>
        </div>
        <div className="col-span-9">
       <TextEditor  
       socketRef={socketRef} roomId={roomId} onCodeChange={(code) => { codeRef.current = code;}}/>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Roomeditor