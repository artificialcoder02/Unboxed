import { fetchContent } from "@/apis/api";
import { AppDispatch } from "@/store/store";
import { setKeyword, storeRecents, clearRecents } from "@/store/userSlice";
import React from "react";
import { toast } from "react-toastify";

export const handleClick = async (
  e: React.MouseEvent,
  dispatch: AppDispatch,
  temp: string,
  setTemp?: React.Dispatch<React.SetStateAction<string>>,
  setRecent?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  dispatch(setKeyword(temp));

  const res = await fetchContent(dispatch, temp);
  if (setRecent) setRecent(false);
  if (typeof res === "object") {
    toast.warn(res.data.message);
  } else if (typeof res === "number" && res === 200) {
    dispatch(storeRecents(temp));
    if (setTemp) setTemp("");
  }
};
export const clearRecentList = (e: React.MouseEvent, dispatch: AppDispatch) => {
  e.preventDefault();
  dispatch(clearRecents());
};
