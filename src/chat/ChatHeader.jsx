import { FaEllipsisV, FaSearch } from "react-icons/fa";
import { BsCameraVideoFill } from "react-icons/bs";
const ChatHeader = () => {
  return (
    <header className="flex justify-between px-3 items-center bg-[#202c33] w-full py-2 z-50 relative">
      <div className="flex items-center">
        <img
          src="/portrait-smiling-charming-young-man-grey-t-shirt-standing-against-plain-background.jpg"
          className="w-14 h-14 rounded-full me-3"
        />
        <h4 className="text-[#e9edef] text-lg text-bold">Ahmed</h4>
      </div>
      <div className="flex items-center">
        <BsCameraVideoFill className="text-2xl mx-4 text-[#aebac1]" />
        <FaSearch className="text-2xl mx-4 text-[#aebac1]" />
        <FaEllipsisV className="text-2xl mx-4 text-[#aebac1]" />
      </div>
    </header>
  );
};

export default ChatHeader;
