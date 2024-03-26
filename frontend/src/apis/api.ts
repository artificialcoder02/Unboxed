import axios from "axios";
import { api_url } from "./helper";
import { storeContent } from "@/store/userSlice";
// import { SampleContent } from "@/services/Items";
import { AppDispatch } from "@/store/store";
// import { SampleContent } from "@/services/Items";

export const fetchContent = async (dispatch: AppDispatch, keyword: string) => {
  try {
    const res = await axios.get(`${api_url}/api/search/?keyword=${keyword}`);
    // const res = await axios.get(
    //   `https://d1a3-103-171-247-240.ngrok-free.app/api/search/?keyword=${keyword}`
    // );
    if (res.status === 200 && res.data && typeof res.data !== "string") 
      dispatch(storeContent(res.data));
    return res.status;
    // const res = SampleContent;
    // dispatch(storeContent(res));
    // return 200;
  } catch (error: any) {
    return error.response;
  }
};
