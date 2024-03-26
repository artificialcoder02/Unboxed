import { ModalProps } from "@/services/Props";
import { IRootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { setIsLoggedIn } from "@/store/userSlice";

const Login: React.FC<{ props: ModalProps }> = ({ props }) => {
  const { modal, recent, setModal, setRecent } = props;
  const { isLoggedIn } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="right w-full flex items-center justify-end px-5 gap-2 h-full">
      <div className="recents flex md:hidden">
        <Button className="button-var-2" onClick={(e) => {
          e.preventDefault();
          setRecent(!recent);
        }}>Recent</Button>
      </div>
      {isLoggedIn ? <div className="avatar flex items-center gap-2" >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full w-[2.5rem]" />
          <AvatarFallback className="rounded-full w-[3rem]">CN</AvatarFallback>
        </Avatar>
        <div className="menu cursor-pointer" onClick={(e) => {
          e.preventDefault();
          setModal(!modal);
        }}>
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </div>
      </div> : <div className="login">
        <Button className="button-var-1" onClick={(e) => {
          e.preventDefault();
          dispatch(setIsLoggedIn(true));
        }}>Login</Button>
      </div>}
    </div>
  )
}

export default Login