import { ModalProps } from "@/services/Props"

import RecentItems from "./RecentItems"
import Login from "./Login"
import logo from "../assets/logo.jpg"
import { clearRecentList } from "@/functions/Functions"
import { useDispatch } from "react-redux"
import Filter from "./Filter"

const Topbar: React.FC<{ props: ModalProps }> = ({ props }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex w-full md:w-[20vw] h-[9vh] md:h-[100vh]">
      <div className="wrapper w-[95%] mx-auto p-2 border-b-2 md:border-r md:border-b-0 border-[#fefefe] flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-10">
        <div className="logo flex items-center gap-2">
          <img src={logo} alt="" className="w-[3rem]" />
          <h1 className="font-[600] text-[1.2rem]">Unboxed</h1>
        </div>
        <div className="right flex md:hidden">
          <Login props={props} />
        </div>
        <div className="right hidden md:flex flex-col gap-5 md:w-full">
          <Filter />
          <div className="top flex items-center justify-between md:w-full">
            <h1 className="font-[600] text-[1.1rem]">Recents</h1>
            <div className="icon grid place-items-center cursor-pointer" onClick={(e) => clearRecentList(e, dispatch)}>
              <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="red" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          <RecentItems props={props} />
        </div>
      </div>
    </div>
  )
}

export default Topbar