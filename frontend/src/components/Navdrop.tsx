import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "@/store/userSlice";
import { ModalProps } from "@/services/Props";
const Navdrop: React.FC<{ props: ModalProps }> = ({ props }) => {
  const { setModal } = props;
  const dispatch = useDispatch();
  const variants = {
    initial: {
      y: "-100%",
      opacity: "0%"
    },
    animate: {
      y: "0%",
      opacity: "100%"
    },
    exit: {
      y: "-100%",
      opacity: "0%"
    },
  };
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="border border-[#fefefe] p-2 rounded-lg absolute top-14 right-3 z-50 w-fit flex bg-[#0a0a0a]">
      <Button className="button-var-1" onClick={(e) => {
        e.preventDefault();
        dispatch(setIsLoggedIn(false));
        setModal(false);
      }}>Logout</Button>
    </motion.div>
  )
}

export default Navdrop