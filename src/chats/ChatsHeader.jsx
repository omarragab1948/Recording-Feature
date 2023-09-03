import { FaEllipsisV, FaUsers, FaPlusSquare } from "react-icons/fa";

const ChatsHeader = () => {
  return (
    <header className="flex justify-between px-3 items-center bg-[#202c33] py-2">
      <div className="w-14 h-14 rounded-full">
        <img
          src="/portrait-smiling-charming-young-man-grey-t-shirt-standing-against-plain-background.jpg"
          alt="User Image"
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="flex">
        <FaUsers className="text-2xl mx-2 text-[#aebac1]" />
        <FaPlusSquare className="text-2xl mx-4 text-[#aebac1]" />
        <FaEllipsisV className="text-2xl mx-2 text-[#aebac1]" />
      </div>
    </header>
  );
};

export default ChatsHeader;
