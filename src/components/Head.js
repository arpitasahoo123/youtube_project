import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useState ,useEffect} from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { useSelector } from "react-redux";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery,setSearchQuery] = useState("");
  const [suggestions,setSuggestions] = useState([]);
  const [showSuggestions,setShowSuggestions] = useState(false);

  const searchCache = useSelector((store)=>store.search);

  //debouncing - No matter how many times you type within short intervals,only the last API call happens, after you stop typing for 200 ms.
  
  useEffect(()=>{
    const timer = setTimeout(()=>{
      if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery]);
        console.log(suggestions);
      }else{
        getSearchSuggestions();
      } 
    },200);
    return () => {
      clearTimeout(timer);
    }
  },[searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(cacheResults({
      [searchQuery] : json[1]
    }));
  }

  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  }
  return(
    <div className="grid grid-flow-col p-5 m-2 shadow-md">
    <div className="flex col-span-1">
      <img onClick={()=>toggleMenuHandler()} 
      className="h-8"
      alt="menu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAAAYFBMVEX///8AAAD7+/vr6+vJycmXl5dKSkp7e3u4uLg0NDR4eHipqamampo7OztZWVnW1tbj4+Pz8/Pc3NyysrIiIiLQ0NCEhIRiYmK+vr6RkZEVFRUdHR1AQEANDQ2Li4snJye4zJd3AAAB4ElEQVR4nO3bW3aCMBSFYQIUAUGuCkiR+c+yB7TLlxNoX9yx3d8I/pWFJCTR84iIiIiIiIj+tarJPl4va6qdrnNuUPLzVlgK61qk1i7/BA0z5uRbyi7gMGMueliB7hKFWtahs0SnhZUJOkskpVLWo6tWvVJ2REetjm9VFqOjVrFSVs/oKjHX2o/zE50lPrUwJ36c2k9ToKdNmTj1MK+MwGGR9p51Ic0eJuugrIV1tZltDXRXNcMBYdhdbi8Dh7CfRURERET0U1WAsL/WDocuQuiGcLOrRn4Mn9Q9jceAXYFhxlytwxaO0DBjRkuajzs/+ZbrX3cubDpqW44O758VuC2Np1Y7qmjQVavG0cdMf9DcHbNwQleJSXujVfjXmbzQ1JkdeyB8px8LB+gsEahlDvw69SlA3MBhN1uYjBpytTFaR2x91m4z5uUxzTfLM/ZUhwgb61kiIiIioj/CD4o+fr2+CHYukxQp6utpTPVbvo8BG5C7LtNgHTb/AOxaHGxpGTjMmEwPq9FdQv/s5I3yLYm2hdA7sRvKG+W/9143yt093fHQN5AXkRbmxCGKdoQi0yZ+0CLLxFmi/7vQ2m+Ug0/4N26UV8AF2jRs3yYp4y5PXi/v4o0BIyIiIiIiIiKgL+C2PB1TyHs1AAAAAElFTkSuQmCC"/>
      <a href="/">
      <img className="h-8 mx-2" alt="youtube" src="data:image/png;base64,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"/>
      </a>
    </div>
    <div className="col-span-10 px-5">
      <div>
      <input className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full" type="text" value={searchQuery} 
      onChange={(e)=>setSearchQuery(e.target.value)} 
      onFocus={()=>setShowSuggestions(true)} onBlur={()=>setShowSuggestions(false)}/>
      <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">🔍</button>
      </div>
      {showSuggestions && (<div className="absolute bg-white py-2 px-5 w-[33rem] shadow-lg rounded-lg border border-gray-100">
          <ul>
            {
              suggestions.map((sug,i)=>{
                return(
                  <li className="py-2 px-3 shadow-sm hover:bg-gray-100" key={i}>🔍 {sug}</li> 
                )
              })
            }
          </ul>
      </div>)}
    </div>
    <div className="col-span-1">
      <img className="h-8 float-right" alt="user" src="data:image/png;base64,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"/>
    </div>
   </div>
  )
}

export default Head;