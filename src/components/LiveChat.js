import React,{ useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch,useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomNames , generateRandomMessage} from '../utils/helper';
import { useState } from 'react';

const LiveChat = () => {
  const [liveMessage,setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store)=>store.chat.messages);
  useEffect(()=>{
    const i = setInterval(()=>{
      dispatch(addMessage({
        name:generateRandomNames(),
        message:generateRandomMessage()
      }))
    },2000);
    return () => clearInterval(i);
  },[])

  return (
    <>
    <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
    <div>
      {
        chatMessages.map((chat,i)=>{
          return(
            <ChatMessage name={chat.name} message={chat.message} key={i}/>
          )
        })
      }
      </div>
    </div>

    <form className="w-full p-2 ml-2 border border-black flex" onSubmit={(e)=>
      {
        e.preventDefault();
        dispatch(
          addMessage({
            name:"Arpita Sahoo",
            message:liveMessage
          })
        )
        setLiveMessage("");
    }}>
        <input className="w-80 border border-gray-400 px-2" type="text" value={liveMessage} onChange={(e)=>setLiveMessage(e.target.value)}/>
        <button className="px-2 mx-2 bg-green-100 float-right">Send</button>
    </form>
    </>
  )
}

export default LiveChat;