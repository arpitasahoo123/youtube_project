import React,{useEffect,useState} from 'react';
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import VideoCards,{AdVideoCard} from './VideoCards';
import { Link } from 'react-router-dom';

const Videcontainer = () => {
  const [videos,setVideos] = useState([]);
  useEffect(()=>{
    getVideos();
  },[]);

  const getVideos = async() => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    setVideos(json?.items);
  }
  return(
   <div className="flex flex-wrap">
   {videos[0] && <AdVideoCard info={videos[0]}/>}
      {
        videos.map((item)=>{
          return(
            <Link  key={item.id} to={"/watch?v="+item.id}><VideoCards info={item}/></Link>
          )
        })
      }
   </div>
  )
}

export default Videcontainer;