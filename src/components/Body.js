import SideBar from "./Sidebar";
import Maincontainer from "./Maincontainer";
import WatchPage from "./WatchPage";
import { Outlet } from "react-router-dom";
const Body = () => {
  return(
    <div className="grid grid-flow-col">    
      <SideBar/>
      <Outlet/>
    </div>

  )
}

export default Body;