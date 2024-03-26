import { handleClick } from "@/functions/Functions";
import { ModalProps } from "@/services/Props";
import { IRootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const RecentItems: React.FC<{ props: ModalProps }> = ({ props }) => {
  const { setRecent } = props;
  const dispatch = useDispatch();
  const { recents } = useSelector((state: IRootState) => state.user);
  return (
    <div className="wrapper flex flex-col w-full gap-1">
      {recents && recents.length > 0 && recents.map((s) => {
        return (
          <div className={`each_recent flex items-center gap-1 py-1 px-2 hover:bg-[#fefefe] font-[600] hover:text-[#0a0a0a] rounded-lg cursor-pointer`} onClick={(e) => handleClick(e, dispatch, s, undefined, setRecent)}>
            <div className="icon hidden md:flex" >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V4H5V1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5V4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H4V10H1.5C1.22386 10 1 10.2239 1 10.5C1 10.7761 1.22386 11 1.5 11H4V13.5C4 13.7761 4.22386 14 4.5 14C4.77614 14 5 13.7761 5 13.5V11H10V13.5C10 13.7761 10.2239 14 10.5 14C10.7761 14 11 13.7761 11 13.5V11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H11V5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H11V1.5ZM10 10V5H5V10H10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </div>
            <h1>{s}</h1>
          </div>
        )
      })}
    </div>
  )
}

export default RecentItems