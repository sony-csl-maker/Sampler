import { FC, useEffect, useRef } from "react";
import delay from "../../tools/delay";
import { motion } from "framer-motion";
import "./HelperTextContainer.css";

interface HelperTextContainerProps {
  text: any;
  setIsOpen: any;
}

const HelperTextContainer: FC<HelperTextContainerProps> = ({
  text,
  setIsOpen,
}) => {
  const ref = useRef<any>();
  /* Catch any click outside component */
  useEffect(() => {
    const handleClick = async (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        await delay(100);

        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  });
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="helper-text-container-main-container"
      ref={ref}
    >
      {text}
    </motion.div>
  );
};

export default HelperTextContainer;
