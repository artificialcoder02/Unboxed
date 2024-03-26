import { fetchContent } from "@/apis/api";
import { handleClick } from "@/functions/Functions";
import { IRootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const Searchbar = () => {
  const dispatch = useDispatch();
  const { keyword } = useSelector((state: IRootState) => state.user);
  const [temp, setTemp] = useState("");
  useEffect(() => {
    const getContent = async () => {
      console.log("Calling");
      await fetchContent(dispatch, keyword);
    }
    getContent();
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTemp(e.target.value);
  }

  return (
    <div className="w-full  flex items-center justify-center md:justify-start md:px-2">
      <div className="searchbar md:w-[70%]">
        <form action="" className="w-full flex items-center gap-3 justify-between">
          <input type="text" value={temp} onChange={(e) => handleChange(e)} className="focus:ring-0 focus:outline-none p-2 border border-[#393939] placeholder:text-[0.9rem] rounded-xl bg-[#0a0a0a] w-[100%]" placeholder="Search..." />
          <input type="submit" className="button-var-2" onClick={(e) => handleClick(e, dispatch, temp, setTemp)} />
        </form>
      </div>
    </div>
  )
}

export default Searchbar