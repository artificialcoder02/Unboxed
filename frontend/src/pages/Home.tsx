import Content from "@/components/Content";
import Login from "@/components/Login";
import Navdrop from "@/components/Navdrop"
import RecentList from "@/components/RecentList";
import Searchbar from "@/components/Searchbar";
import Topbar from "@/components/Topbar"
import { ModalProps } from "@/services/Props";
import { AnimatePresence } from "framer-motion"
import { useState } from "react";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [recent, setRecent] = useState(false);
  const modalprop: ModalProps = {
    modal,
    setModal,
    setRecent,
    recent
  }
  return (
    <div className="w-[100vw] h-[100vh] relative flex flex-col md:flex-row bg-[#0a0a0a] text-[#fefefe]">
      <AnimatePresence>
        {modal && <Navdrop props={modalprop} />}
        {recent && <RecentList props={modalprop} />}
      </AnimatePresence>
      <Topbar props={modalprop} />
      <div className="content h-fit flex flex-col gap-3 md:w-[78vw] mx-auto">
        <div className="top flex items-center w-full justify-between h-[7vh] mt-[2vh]">
          <div className="search w-full">
            <Searchbar/>
          </div>
          <div className="login hidden md:flex w-[30%]">
            <Login props={modalprop} />
          </div>
        </div>
        <hr className="hidden md:flex" />
        <Content />
      </div>
    </div>
  )
}

export default Home