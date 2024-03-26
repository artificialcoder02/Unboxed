import { ModalProps } from "@/services/Props";
import { motion } from "framer-motion";
// import { useDispatch } from "react-redux";
import RecentItems from "./RecentItems";

const RecentList: React.FC<{ props: ModalProps }> = ({ props }) => {
  // const dispatch = useDispatch();
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
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="border border-[#fefefe] p-2 rounded-lg absolute top-14 right-20 z-50 w-fit flex bg-[#0a0a0a]">
      <RecentItems props={props} />
    </motion.div>
  )
}

export default RecentList