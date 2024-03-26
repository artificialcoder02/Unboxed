import { FilterItems } from "@/services/Items"
import { IRootState } from "@/store/store"
import { setFilter } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux"

const Filter = () => {
  const { filter } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="font-[600] text-[1.1rem]">Filter</h1>
      <div className="filteritems flex flex-col w-full gap-1">
        {FilterItems.map((f) => {
          return (
            <div key={f.id} onClick={(e) => {
              e.preventDefault();
              dispatch(setFilter(f.name));
            }} className={`each_recent border ${filter === f.name ? "border-[#fefefe]" : "border-[#0a0a0a]"}  flex items-center gap-2 py-1 px-2 font-[600] rounded-lg cursor-pointer`}
            //  onClick={(e) => handleClick(e, dispatch, s, undefined, setRecent)}

            >
              <img src={f.icon} alt="" className="w-[1.5rem]" />
              <h1>{f.name}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Filter