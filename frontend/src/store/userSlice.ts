import { ContentProps } from "@/services/Props";
import { createSlice } from "@reduxjs/toolkit";

interface initialProp {
  isLoggedIn: boolean;
  content: Array<ContentProps>;
  recents: Array<string>;
  keyword: string;
  filter:string;
}

const initialState: initialProp = {
  isLoggedIn: false,
  content: [],
  recents: ["Trending"],
  keyword: "Trending",
  filter:"All",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    storeContent: (state, action) => {
      state.content = action.payload;
    },
    storeRecents: (state, action) => {
      const { payload } = action;
      const payloadLowercase = payload.toLowerCase();
      const existingIndex = state.recents.findIndex(
        (item) => item.toLowerCase() === payloadLowercase
      );
      if (existingIndex !== -1) {
        state.recents.splice(existingIndex, 1);
      }
      state.recents.unshift(payload);
      if (state.recents.length > 10) {
        state.recents.pop();
      }
    },
    clearRecents: (state) => {
      state.recents = ["Trending"];
    },
  },
});

export const { setIsLoggedIn, storeContent, setKeyword, storeRecents,clearRecents,setFilter } =
  userSlice.actions;

export default userSlice.reducer;
