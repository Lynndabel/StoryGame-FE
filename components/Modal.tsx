import { IoCloseSharp } from "react-icons/io5";
import ReactDOM from "react-dom";
import AnimatedDiv from "./AnimatedDiv";

interface ModalProps {
  children: React.ReactNode;
  closeFn: () => void;
}
const Modal = ({ children, closeFn }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className="h-[100vh] min-w-[100vw] bg-[#F2E8CF0A] bg-opacity-20 backdrop-blur-sm fixed inset-0 z-50 flex justify-center items-center">
      <div>
        <AnimatedDiv
          initialX="100%"
          animateX={0}
          exitX={"-100%"}
          duration={0.8}
          className="relative py-2"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            className="absolute top-2 right-0 hover:cursor-pointer"
            onClick={closeFn}
          >
            <IoCloseSharp size={25} />
          </button>
        </AnimatedDiv>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
